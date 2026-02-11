
import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { GeminiService } from '../../services/gemini.service';
import { AuthService } from '../../services/auth.service';

// Declare html2canvas for TypeScript since we loaded it via CDN
declare var html2canvas: any;

@Component({
  selector: 'app-carousel-maker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col h-[calc(100vh-4rem)] bg-[#F8FAFC]">
       
       <!-- Toolbar / Top Actions -->
       <div class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 h-16 shadow-sm z-20 relative">
          <div class="flex items-center gap-6">
             <h2 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                Carousel Maker
             </h2>
             <div class="h-6 w-px bg-slate-200"></div>
             <!-- Templates -->
             <div class="flex items-center gap-3">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Templates:</span>
                <button (click)="applyTemplate('minimal')" class="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">Minimal</button>
                <button (click)="applyTemplate('bold')" class="px-3 py-1.5 text-xs font-medium rounded-md border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30">Bold</button>
                <button (click)="applyTemplate('dark')" class="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-800 bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm">Dark</button>
             </div>
          </div>
          
          <div class="flex gap-3 relative">
             <button (click)="saveDraft()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">Save Draft</button>
             
             <!-- Schedule Button & Popover -->
             <div class="relative">
                <button (click)="openSchedule()" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                    Schedule
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </button>

                @if (showSchedulePopover()) {
                    <!-- IOS Style Scheduler Popover -->
                    <div class="absolute top-full right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-200 w-[340px] overflow-hidden animate-scale-in z-50 origin-top-right">
                      
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

       <div class="flex flex-1 overflow-hidden">
          
          <!-- LEFT SIDEBAR: Controls -->
          <div class="w-96 bg-white border-r border-slate-200 flex flex-col overflow-hidden shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
             
             <!-- Tabs for Sidebar -->
             <div class="flex border-b border-slate-100">
                <button (click)="activeTab.set('content')" [class.border-blue-600]="activeTab() === 'content'" [class.text-blue-600]="activeTab() === 'content'" class="flex-1 py-4 text-sm font-semibold text-slate-500 border-b-2 border-transparent hover:text-slate-800 transition-colors bg-slate-50/50">Content</button>
                <button (click)="activeTab.set('design')" [class.border-blue-600]="activeTab() === 'design'" [class.text-blue-600]="activeTab() === 'design'" class="flex-1 py-4 text-sm font-semibold text-slate-500 border-b-2 border-transparent hover:text-slate-800 transition-colors bg-slate-50/50">Design & Profile</button>
             </div>

             <div class="flex-1 overflow-y-auto custom-scrollbar p-6">
                
                @if (activeTab() === 'content') {
                   <!-- AI Generator -->
                   <div class="mb-8 bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-blue-100">
                      <div class="flex items-center gap-2 mb-3 text-xs font-bold text-blue-600 uppercase tracking-wider">
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                         AI Magic Generator
                      </div>
                      <textarea [(ngModel)]="topic" (keyup.enter)="generateSlides()" rows="2" class="w-full bg-white border border-blue-200 rounded-xl p-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-blue-300 transition-all resize-none" placeholder="What should this carousel be about?"></textarea>
                      <button (click)="generateSlides()" [disabled]="isLoading()" class="w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70 shadow-sm hover:shadow-md active:scale-95">
                         {{ isLoading() ? 'Generating Magic...' : 'Generate Slides' }}
                      </button>
                   </div>

                   <!-- Slides List -->
                   <div class="space-y-4 pb-10">
                      <div class="flex justify-between items-center px-1">
                          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Slides ({{ slides().length }})</span>
                      </div>

                      @for (slide of slides(); track $index) {
                         <div class="p-4 rounded-xl border transition-all relative group cursor-pointer" 
                              [class.border-blue-500]="activeSlideIndex() === $index"
                              [class.bg-blue-50]="activeSlideIndex() === $index"
                              [class.ring-1]="activeSlideIndex() === $index"
                              [class.ring-blue-500]="activeSlideIndex() === $index"
                              [class.border-slate-200]="activeSlideIndex() !== $index"
                              [class.bg-white]="activeSlideIndex() !== $index"
                              [class.hover:border-blue-300]="activeSlideIndex() !== $index"
                              (click)="activeSlideIndex.set($index)"
                         >
                            <div class="flex justify-between items-center mb-2">
                               <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full" 
                                     [class.bg-blue-200]="activeSlideIndex() === $index" 
                                     [class.text-blue-700]="activeSlideIndex() === $index"
                                     [class.bg-slate-100]="activeSlideIndex() !== $index"
                                     [class.text-slate-500]="activeSlideIndex() !== $index"
                               >
                                  #{{ $index + 1 }}
                               </span>
                               <button (click)="removeSlide($index); $event.stopPropagation()" class="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded">
                                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                               </button>
                            </div>
                            <input [(ngModel)]="slide.title" class="w-full bg-transparent font-bold text-slate-800 text-sm mb-2 outline-none placeholder:text-slate-300 border-b border-transparent focus:border-blue-300 transition-colors pb-1" placeholder="Headline">
                            <textarea [(ngModel)]="slide.body" rows="3" class="w-full bg-transparent text-xs text-slate-600 outline-none resize-none placeholder:text-slate-300 leading-relaxed" placeholder="Body text..."></textarea>
                         </div>
                      }
                      <button (click)="addSlide()" class="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
                         <div class="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">+</div>
                         Add Slide
                      </button>
                   </div>
                } 
                
                @else {
                   <!-- Design & Profile Settings -->
                   <div class="space-y-8 animate-fade-in">
                      
                      <!-- Profile Section -->
                      <div>
                         <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            Profile Info
                         </h3>
                         <div class="space-y-5">
                            <div>
                               <label class="block text-xs font-semibold text-slate-700 mb-1.5">Name</label>
                               <input [(ngModel)]="authorName" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                            </div>
                            <div>
                               <label class="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
                               <input [(ngModel)]="authorHandle" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                            </div>
                            <div>
                               <label class="block text-xs font-semibold text-slate-700 mb-1.5">Profile Picture</label>
                               <div class="flex gap-3 items-center">
                                  <img [src]="authorAvatar()" class="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm">
                                  <div class="relative">
                                      <input type="file" (change)="onAvatarUpload($event)" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                                      <button class="bg-white border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                                         Upload Photo
                                      </button>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div class="h-px bg-slate-100 w-full"></div>

                      <!-- Appearance Section -->
                      <div>
                         <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                            Design
                         </h3>
                         <div class="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div class="flex items-center justify-between">
                               <label class="text-sm font-medium text-slate-700">Background</label>
                               <div class="flex items-center gap-3">
                                  <span class="text-xs text-slate-400 font-mono bg-white px-2 py-1 rounded border border-slate-200">{{ backgroundColor() }}</span>
                                  <div class="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200 hover:scale-110 transition-transform">
                                      <input type="color" [ngModel]="backgroundColor()" (ngModelChange)="backgroundColor.set($event)" class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 cursor-pointer border-0">
                                  </div>
                               </div>
                            </div>
                            <div class="flex items-center justify-between">
                               <label class="text-sm font-medium text-slate-700">Text Color</label>
                               <div class="flex items-center gap-3">
                                  <span class="text-xs text-slate-400 font-mono bg-white px-2 py-1 rounded border border-slate-200">{{ textColor() }}</span>
                                  <div class="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200 hover:scale-110 transition-transform">
                                      <input type="color" [ngModel]="textColor()" (ngModelChange)="textColor.set($event)" class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 cursor-pointer border-0">
                                  </div>
                               </div>
                            </div>
                            <div class="flex items-center justify-between">
                               <label class="text-sm font-medium text-slate-700">Accent Color</label>
                               <div class="flex items-center gap-3">
                                  <span class="text-xs text-slate-400 font-mono bg-white px-2 py-1 rounded border border-slate-200">{{ accentColor() }}</span>
                                  <div class="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200 hover:scale-110 transition-transform">
                                      <input type="color" [ngModel]="accentColor()" (ngModelChange)="accentColor.set($event)" class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 cursor-pointer border-0">
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                   </div>
                }

             </div>
          </div>

          <!-- MAIN PREVIEW AREA -->
          <div class="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
             <!-- Background Pattern -->
             <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(#64748b 1px, transparent 1px); background-size: 24px 24px;"></div>
             
             <!-- Instructions / Top Label -->
             <div class="absolute top-6 left-0 right-0 text-center pointer-events-none z-10">
                 <span class="bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 shadow-sm border border-slate-200/50">
                    Showing all {{ slides().length }} slides • Click to edit
                 </span>
             </div>

             <!-- Scrollable Preview Area -->
             <div class="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar flex items-center px-12 gap-8 snap-x snap-mandatory">
                
                @for (slide of slides(); track $index) {
                   <!-- Single Slide Preview Card -->
                   <div [id]="'slide-' + $index"
                        class="w-[360px] aspect-[4/5] shadow-2xl rounded-none shrink-0 flex flex-col relative transition-all duration-300 snap-center cursor-pointer group"
                        [style.background-color]="backgroundColor()"
                        [style.color]="textColor()"
                        [class.ring-4]="activeSlideIndex() === $index"
                        [class.ring-blue-500]="activeSlideIndex() === $index"
                        [class.scale-105]="activeSlideIndex() === $index"
                        [class.hover:translate-y-[-4px]]="activeSlideIndex() !== $index"
                        [class.opacity-50]="activeSlideIndex() !== $index && hoverIndex !== -1 && hoverIndex !== $index"
                        (mouseenter)="hoverIndex = $index"
                        (mouseleave)="hoverIndex = -1"
                        (click)="activeSlideIndex.set($index); activeTab.set('content')"
                   >
                      <!-- Download Button Overlay (Visible on Hover/Active) -->
                       <div class="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button (click)="downloadSlide($index); $event.stopPropagation()" class="bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-lg border border-slate-200/50 backdrop-blur-sm transition-all hover:scale-110" title="Download Image">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                         </button>
                       </div>

                      <!-- Slide Header -->
                      <div class="p-8 pb-4 flex items-center gap-4">
                         <img [src]="authorAvatar()" class="w-12 h-12 rounded-full border-2 border-white/20 shadow-sm object-cover">
                         <div>
                            <div class="font-bold text-base leading-tight">{{ authorName() }}</div>
                            <div class="text-xs opacity-70">{{ authorHandle() }}</div>
                         </div>
                      </div>

                      <!-- Slide Body -->
                      <div class="flex-1 px-8 flex flex-col justify-center">
                         <h2 class="text-3xl font-extrabold mb-6 leading-tight" [style.color]="activeSlideIndex() === $index || hoverIndex === $index ? accentColor() : 'inherit'">{{ slide.title }}</h2>
                         <p class="text-xl opacity-90 leading-relaxed whitespace-pre-wrap font-medium">{{ slide.body }}</p>
                      </div>

                      <!-- Slide Footer -->
                      <div class="p-8 pt-0 flex justify-between items-center opacity-60">
                         <div class="font-bold text-sm">superup.ai</div>
                         <div class="text-sm font-medium">{{ $index + 1 }} / {{ slides().length }}</div>
                      </div>
                   </div>
                }
                
                <!-- Add Slide Button at end of scroll -->
                <button (click)="addSlide()" class="w-24 h-24 rounded-full bg-white shadow-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shrink-0 ml-4 group">
                   <div class="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-1 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                   </div>
                   <span class="text-xs font-bold">Add Page</span>
                </button>
                
                <div class="w-12 shrink-0"></div> <!-- Spacer -->

             </div>
          </div>

       </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-scale-in { animation: scaleIn 0.2s ease-out; }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .custom-scrollbar::-webkit-scrollbar { height: 12px; width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 6px; border: 3px solid transparent; background-clip: content-box; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; }
  `]
})
export class CarouselMakerComponent {
  // Content Signals
  topic = '';
  slides = signal<{title: string, body: string}[]>([
    { title: 'The Perfect Hook', body: 'Start your carousel with a statement that makes scrolling irresistible.' },
    { title: 'Provide Value', body: 'Share actionable insights that solve a specific problem for your audience.' },
    { title: 'The Conclusion', body: 'Summarize the key takeaways and ask a question to drive engagement.' }
  ]);
  
  // State Signals
  activeTab = signal<'content' | 'design'>('content');
  activeSlideIndex = signal(0);
  isLoading = signal(false);
  hoverIndex = -1; // Local state for hover effect

  // Scheduler State
  showSchedulePopover = signal(false);
  currentDate = new Date();
  displayMonth = signal(this.currentDate.getMonth());
  displayYear = signal(this.currentDate.getFullYear());
  selectedDay = signal(this.currentDate.getDate());

  hours = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  selectedHour = '09';
  selectedMinute = '00';
  selectedAmPm = 'AM';

  // Design & Profile Signals
  authorName = signal('');
  authorHandle = signal('');
  authorAvatar = signal('');
  
  backgroundColor = signal('#ffffff');
  textColor = signal('#0F172A');
  accentColor = signal('#2563EB');

  store = inject(StoreService);
  gemini = inject(GeminiService);
  authService = inject(AuthService);

  // Computed Calendar Logic
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

  constructor() {
    // Initialize profile defaults
    const user = this.authService.currentUser();
    if (user) {
       this.authorName.set(user.name);
       this.authorHandle.set('@' + user.name.replace(/\s/g, '').toLowerCase());
       // Use picsum with seed to get consistent image for user
       const seed = user.name.replace(/\s/g, '');
       this.authorAvatar.set(`https://picsum.photos/seed/${seed}/100/100`);
    }

    // Initialize from draft if exists
    effect(() => {
      const draft = this.store.activeDraft();
      if (draft && draft.type === 'carousel' && draft.slides) {
        this.slides.set(draft.slides);
        // Note: In a real app we would save/load styles in the draft object too
      }
    });
  }

  // --- Actions ---

  onAvatarUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.authorAvatar.set(e.target?.result as string);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async downloadSlide(index: number) {
    const element = document.getElementById(`slide-${index}`);
    if (!element) return;
    
    this.store.triggerNotification('Processing', 'Generating high-quality image...');

    try {
        const canvas = await html2canvas(element, { 
            scale: 2,
            useCORS: true, 
            allowTaint: true 
        });
        
        const link = document.createElement('a');
        link.download = `slide-${index + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        this.store.triggerNotification('Success', 'Slide downloaded successfully!');
    } catch (e) {
        console.error(e);
        this.store.triggerNotification('Error', 'Failed to generate image.');
    }
  }

  applyTemplate(type: 'minimal' | 'bold' | 'dark') {
      switch(type) {
          case 'minimal':
              this.backgroundColor.set('#ffffff');
              this.textColor.set('#0F172A');
              this.accentColor.set('#2563EB');
              break;
          case 'bold':
              this.backgroundColor.set('#2563EB');
              this.textColor.set('#ffffff');
              this.accentColor.set('#FCD34D'); // Yellow accent
              break;
          case 'dark':
              this.backgroundColor.set('#0F172A');
              this.textColor.set('#ffffff');
              this.accentColor.set('#38BDF8'); // Sky blue accent
              break;
      }
  }

  async generateSlides() {
    if (!this.topic) return;
    this.isLoading.set(true);
    const result = await this.gemini.generateCarousel(this.topic);
    if (result && result.length > 0) {
       this.slides.set(result);
       this.activeSlideIndex.set(0);
       this.activeTab.set('content');
    }
    this.isLoading.set(false);
  }

  addSlide() {
    this.slides.update(s => [...s, { title: 'New Slide', body: '' }]);
    // Scroll to new slide (simulated by setting index)
    setTimeout(() => this.activeSlideIndex.set(this.slides().length - 1), 100);
  }

  removeSlide(index: number) {
    if (this.slides().length <= 1) return;
    this.slides.update(s => s.filter((_, i) => i !== index));
    if (this.activeSlideIndex() >= this.slides().length) {
        this.activeSlideIndex.set(this.slides().length - 1);
    }
  }

  saveDraft() {
    this.store.saveDraft({
       type: 'carousel',
       content: this.slides()[0].title + "...", 
       slides: this.slides(),
       // We should save styles here too in future
    });
    this.store.triggerNotification('Success', 'Carousel saved to drafts!');
  }

  // --- Scheduler Logic ---
  openSchedule() {
    this.showSchedulePopover.set(true);
  }

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

  getFormattedSchedule() {
    return `${this.currentMonthName()} ${this.selectedDay()} at ${this.selectedHour}:${this.selectedMinute} ${this.selectedAmPm}`;
  }

  confirmSchedule() {
    let hour = parseInt(this.selectedHour);
    if (this.selectedAmPm === 'PM' && hour !== 12) hour += 12;
    if (this.selectedAmPm === 'AM' && hour === 12) hour = 0;

    const scheduledDate = new Date(this.displayYear(), this.displayMonth(), this.selectedDay(), hour, parseInt(this.selectedMinute));

    this.store.addPost({
       type: 'carousel',
       content: this.slides()[0].title + "...",
       slides: this.slides(),
       scheduledDate: scheduledDate,
       status: 'scheduled'
    });
    
    this.showSchedulePopover.set(false);
    this.store.triggerNotification('Scheduled', `Carousel scheduled for ${scheduledDate.toLocaleString()}`);
    
    // Reset defaults
    this.topic = '';
    this.store.activeDraft.set(null);
  }
}
