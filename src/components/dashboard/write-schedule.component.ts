
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Post } from '../../services/store.service';
import { GeminiService } from '../../services/gemini.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-write-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in font-sans relative pb-20">
      
      <div class="flex gap-6 h-[calc(100vh-12rem)]">
        <!-- MAIN EDITOR COLUMN -->
        <div class="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
          
          <!-- Header / AI Input -->
          <div class="border-b border-slate-100 p-4 bg-white shrink-0">
              <div class="flex items-center justify-between mb-4">
                 <h2 class="font-bold text-lg text-slate-800">Write Post</h2>
                 <div class="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">Text Mode</div>
              </div>

              <!-- AI Auto-Writer Input -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-1 rounded-xl">
                <div class="bg-white rounded-lg p-1 flex items-center shadow-sm">
                    <div class="pl-3 pr-2 text-blue-600">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <input 
                      [(ngModel)]="aiTopic" 
                      (keyup.enter)="magicWrite()"
                      [disabled]="isAiLoading()"
                      placeholder="Topic (e.g. 'Why multitasking fails')" 
                      class="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm py-2.5 font-medium"
                    >
                    <button 
                      (click)="magicWrite()" 
                      [disabled]="isAiLoading() || !aiTopic"
                      class="bg-black text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed mx-1 shadow-md shadow-slate-900/10"
                    >
                      {{ isAiLoading() ? 'Writing...' : 'Humanize & Write' }}
                    </button>
                </div>
              </div>
          </div>

          <!-- Editor Area -->
          <div class="flex-1 flex flex-col relative bg-white overflow-hidden">
                <textarea 
                    [(ngModel)]="content"
                    class="flex-1 w-full p-8 outline-none resize-none text-slate-900 text-lg leading-relaxed placeholder:text-slate-300 font-medium custom-scrollbar bg-white"
                    placeholder="Your post content goes here..."
                ></textarea>

                <!-- Bottom Toolbar -->
                <div class="px-6 pb-4 flex items-center justify-between bg-white">
                    <div class="flex items-center gap-1">
                        <button (click)="generateHooks()" class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors" title="Generate Viral Hooks">
                          Generate Hooks
                        </button>
                        <button (click)="fixGrammar()" class="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors ml-2" title="Fix Grammar">
                          Make Human
                        </button>
                        <button (click)="copyToClipboard()" class="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors ml-2 flex items-center gap-1" title="Copy to Clipboard">
                           <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                           Copy
                        </button>
                    </div>
                    <div class="text-xs font-semibold text-slate-300">
                      {{ content.length }} chars
                    </div>
                </div>

                <!-- Hook Suggestions Overlay -->
                @if (hooks().length > 0) {
                    <div class="absolute bottom-16 left-6 right-6 z-20">
                      <div class="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-slide-up">
                          <div class="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                            <span class="text-xs font-bold text-slate-700 uppercase">Select a Hook</span>
                            <button (click)="hooks.set([])" class="text-slate-400 hover:text-slate-600">&times;</button>
                          </div>
                          <div class="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                            @for (hook of hooks(); track $index) {
                                <button (click)="applyHook(hook)" class="w-full text-left p-4 hover:bg-blue-50 text-slate-700 text-sm transition-colors block font-medium">
                                  {{ hook }}
                                </button>
                            }
                          </div>
                      </div>
                    </div>
                }
          </div>

          <!-- Footer: Scheduling & Saving -->
          <div class="h-16 border-t border-slate-100 flex items-center justify-between px-6 bg-white z-10 shrink-0">
              <!-- Save Draft Button -->
              <button (click)="saveDraft()" class="text-slate-500 hover:text-slate-800 font-semibold text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                Save Draft
              </button>

              <div class="relative">
                @if (!showSchedulePopover()) {
                    <button (click)="openSchedule()" class="px-6 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
                      Schedule
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                } @else {
                    <!-- IOS Style Scheduler Popover -->
                    <div class="absolute bottom-full right-0 mb-4 bg-white rounded-3xl shadow-2xl border border-slate-200 w-[340px] overflow-hidden animate-scale-in z-50 origin-bottom-right">
                      
                      <!-- Header -->
                      <div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <span class="font-bold text-slate-900">Schedule Post</span>
                          <button (click)="showSchedulePopover.set(false)" class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                      </div>

                      <div class="p-5 space-y-6">
                          <!-- IOS Calendar View -->
                          <div>
                            <div class="flex justify-between items-center mb-4 px-2">
                                <button (click)="changeMonth(-1)" class="text-blue-600 hover:bg-blue-50 rounded-full p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                                <span class="font-bold text-slate-800 text-sm">{{ currentMonthName() }} {{ currentYear() }}</span>
                                <button (click)="changeMonth(1)" class="text-blue-600 hover:bg-blue-50 rounded-full p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                            </div>
                            <div class="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
                                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                            </div>
                            <div class="grid grid-cols-7 gap-1 text-center">
                                @for (day of calendarDays(); track $index) {
                                  @if (day === 0) {
                                      <div></div>
                                  } @else {
                                      <button 
                                        (click)="selectDate(day)"
                                        [class.bg-blue-600]="isSelectedDate(day)"
                                        [class.text-white]="isSelectedDate(day)"
                                        [class.text-slate-700]="!isSelectedDate(day)"
                                        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium hover:bg-slate-100 transition-colors mx-auto"
                                      >
                                        {{ day }}
                                      </button>
                                  }
                                }
                            </div>
                          </div>
                          <!-- IOS Time Picker -->
                          <div class="bg-slate-50 rounded-xl p-3 flex justify-center gap-2 items-center">
                            <div class="h-24 w-12 overflow-y-auto snap-y snap-mandatory custom-scrollbar text-center">
                                @for (h of hours; track h) {
                                  <div (click)="selectedHour = h" [class.text-blue-600]="selectedHour === h" [class.font-bold]="selectedHour === h" class="h-8 flex items-center justify-center snap-center cursor-pointer text-sm text-slate-400 hover:text-slate-800 transition-colors">{{ h }}</div>
                                }
                            </div>
                            <span class="font-bold text-slate-300">:</span>
                            <div class="h-24 w-12 overflow-y-auto snap-y snap-mandatory custom-scrollbar text-center">
                                @for (m of minutes; track m) {
                                  <div (click)="selectedMinute = m" [class.text-blue-600]="selectedMinute === m" [class.font-bold]="selectedMinute === m" class="h-8 flex items-center justify-center snap-center cursor-pointer text-sm text-slate-400 hover:text-slate-800 transition-colors">{{ m }}</div>
                                }
                            </div>
                            <div class="h-24 w-12 overflow-y-auto snap-y snap-mandatory custom-scrollbar text-center border-l border-slate-200 ml-2 pl-2">
                                <div (click)="selectedAmPm = 'AM'" [class.text-blue-600]="selectedAmPm === 'AM'" [class.font-bold]="selectedAmPm === 'AM'" class="h-8 flex items-center justify-center snap-center cursor-pointer text-xs text-slate-400">AM</div>
                                <div (click)="selectedAmPm = 'PM'" [class.text-blue-600]="selectedAmPm === 'PM'" [class.font-bold]="selectedAmPm === 'PM'" class="h-8 flex items-center justify-center snap-center cursor-pointer text-xs text-slate-400">PM</div>
                            </div>
                          </div>
                          <button (click)="confirmSchedule()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                            Schedule for {{ getFormattedSchedule() }}
                          </button>
                      </div>
                    </div>
                    <!-- Backdrop -->
                    <div class="fixed inset-0 z-40 bg-transparent" (click)="showSchedulePopover.set(false)"></div>
                }
              </div>
          </div>
        </div>

        <!-- PREVIEW COLUMN -->
        <div class="w-[380px] hidden xl:flex flex-col animate-fade-in stagger-1">
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
              <div class="h-12 border-b border-slate-100 flex items-center justify-between px-4 bg-white shrink-0">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview</span>
                <div class="flex gap-1">
                    <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                    <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                    <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
              </div>

              <div class="flex-1 bg-slate-50 p-4 overflow-y-auto custom-scrollbar">
                <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <!-- User Header -->
                    <div class="flex gap-3 mb-3">
                      <img [src]="'https://picsum.photos/seed/' + (authService.currentUser()?.name?.replace(' ', '') || 'user') + '/100/100'" class="w-10 h-10 rounded-full">
                      <div>
                          <div class="font-bold text-slate-900 text-sm">{{ authService.currentUser()?.name }}</div>
                          <div class="text-xs text-slate-500">Just now • <svg class="w-3 h-3 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></div>
                      </div>
                    </div>
                    
                    <!-- Post Content -->
                    <div class="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                          {{ content || 'Start typing to see preview...' }}
                    </div>

                    <!-- Actions -->
                    <div class="mt-4 pt-2 border-t border-slate-100 flex justify-between text-slate-500">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <!-- MY POSTS LIBRARY SECTION -->
      <div class="mt-8 border-t border-slate-200 pt-8">
        <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            My Posts Library
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (post of store.drafts(); track post.id) {
                <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group" (click)="loadPost(post)">
                    <div class="flex justify-between items-start mb-3">
                        <span class="text-xs font-bold px-2 py-0.5 rounded uppercase" 
                             [class.bg-blue-100]="post.type === 'text'"
                             [class.text-blue-700]="post.type === 'text'"
                             [class.bg-purple-100]="post.type === 'carousel'"
                             [class.text-purple-700]="post.type === 'carousel'"
                        >
                           {{ post.type }}
                        </span>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button (click)="$event.stopPropagation(); deletePost(post.id)" class="text-red-400 hover:text-red-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="text-sm text-slate-700 line-clamp-3 mb-2 font-medium">
                        {{ post.content || post.slides?.[0]?.title || 'Untitled Post' }}
                    </div>
                    <div class="text-xs text-slate-400 flex justify-between items-center">
                        <span>Saved Draft</span>
                        @if (post.type === 'carousel') {
                            <span class="text-blue-600 font-semibold">Open Maker &rarr;</span>
                        }
                    </div>
                </div>
            }
            @if (store.drafts().length === 0) {
                <div class="col-span-full py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    No drafts saved yet.
                </div>
            }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    .animate-slide-up { animation: slideUp 0.3s ease-out; }
    .animate-slide-down { animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scaleIn 0.2s ease-out; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideDown { from { transform: translate(-50%, -100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
  `]
})
export class WriteScheduleComponent {
  showSchedulePopover = signal(false);

  // --- CALENDAR LOGIC ---
  currentDate = new Date();
  displayMonth = signal(this.currentDate.getMonth());
  displayYear = signal(this.currentDate.getFullYear());
  selectedDay = signal(this.currentDate.getDate());

  // --- TIME PICKER LOGIC ---
  hours = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  selectedHour = '09';
  selectedMinute = '00';
  selectedAmPm = 'AM';

  // Content State
  aiTopic = '';
  content = '';
  hooks = signal<string[]>([]);
  isAiLoading = signal(false);
  
  store = inject(StoreService);
  gemini = inject(GeminiService);
  authService = inject(AuthService);

  // Computed Calendar Days
  calendarDays = computed(() => {
    const year = this.displayYear();
    const month = this.displayMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: number[] = [];
    for (let i = 0; i < firstDay; i++) days.push(0); // padding
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  });

  currentMonthName = computed(() => {
    return new Date(this.displayYear(), this.displayMonth()).toLocaleString('default', { month: 'long' });
  });

  currentYear = computed(() => this.displayYear());

  // Actions
  changeMonth(delta: number) {
    let newMonth = this.displayMonth() + delta;
    let newYear = this.displayYear();

    if (newMonth > 11) { newMonth = 0; newYear++; }
    else if (newMonth < 0) { newMonth = 11; newYear--; }

    this.displayMonth.set(newMonth);
    this.displayYear.set(newYear);
  }

  selectDate(day: number) {
    this.selectedDay.set(day);
  }

  isSelectedDate(day: number) {
    return this.selectedDay() === day;
  }

  openSchedule() {
    this.showSchedulePopover.set(true);
  }

  getFormattedSchedule() {
    return `${this.currentMonthName()} ${this.selectedDay()} at ${this.selectedHour}:${this.selectedMinute} ${this.selectedAmPm}`;
  }

  // --- AI LOGIC ---
  async magicWrite() {
    if (!this.aiTopic) return;
    this.isAiLoading.set(true);
    const result = await this.gemini.generatePost(this.aiTopic, 'Conversational & Authentic');
    this.content = result;
    this.isAiLoading.set(false);
  }

  async generateHooks() {
    if (!this.content) return;
    this.isAiLoading.set(true);
    const result = await this.gemini.generateHooks(this.content);
    this.hooks.set(result);
    this.isAiLoading.set(false);
  }

  async fixGrammar() {
    if (!this.content) return;
    this.isAiLoading.set(true);
    const result = await this.gemini.improveContent(this.content, "Make it sound human, remove corporate jargon.");
    this.content = result;
    this.isAiLoading.set(false);
  }

  applyHook(hook: string) {
    this.content = hook + "\n\n" + this.content;
    this.hooks.set([]);
  }

  // --- SAVING & SCHEDULING ---

  copyToClipboard() {
    if (!this.content) return;
    navigator.clipboard.writeText(this.content).then(() => {
      this.store.triggerNotification('Copied', 'Post content copied to clipboard.');
    });
  }

  saveDraft() {
    if (!this.content) return;

    this.store.saveDraft({
        type: 'text',
        content: this.content
    });

    this.store.triggerNotification('Success', 'Saved to Library');
    this.resetForm();
  }

  loadPost(post: Post) {
      if (post.type === 'carousel') {
         // Switch view to Carousel Maker
         this.store.activeDraft.set(post);
         this.store.currentView.set('CAROUSEL');
      } else {
         this.content = post.content;
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }

  deletePost(id: string) {
      this.store.deletePost(id);
  }

  confirmSchedule() {
    if (!this.content) return;

    let hour = parseInt(this.selectedHour);
    if (this.selectedAmPm === 'PM' && hour !== 12) hour += 12;
    if (this.selectedAmPm === 'AM' && hour === 12) hour = 0;

    const scheduledDate = new Date(this.displayYear(), this.displayMonth(), this.selectedDay(), hour, parseInt(this.selectedMinute));

    this.store.addPost({
      type: 'text',
      content: this.content,
      scheduledDate: scheduledDate,
      status: 'scheduled'
    });

    this.showSchedulePopover.set(false);
    this.store.triggerNotification('Success', `Scheduled for ${scheduledDate.toLocaleString()}`);
    this.resetForm();
  }

  private resetForm() {
    this.content = '';
    this.aiTopic = '';
  }
}
