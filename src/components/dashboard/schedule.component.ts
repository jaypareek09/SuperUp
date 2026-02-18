
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Post } from '../../services/store.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex bg-white font-sans overflow-hidden">
      
      <!-- LEFT: Large Monthly Calendar -->
      <div class="flex-1 flex flex-col border-r border-slate-200 bg-[#F5F5F7]">
         
         <!-- Calendar Header -->
         <div class="px-8 py-6 flex items-center justify-between shrink-0">
             <div>
                <h2 class="text-3xl font-bold text-[#1C1C1E]">{{ viewDate() | date:'MMMM yyyy' }}</h2>
                <p class="text-slate-500 font-medium text-sm mt-1">Select a future date to schedule</p>
             </div>
             <div class="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                <button (click)="changeMonth(-1)" class="p-2 hover:bg-slate-50 rounded-md text-slate-600 transition-colors">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button (click)="resetToToday()" class="px-4 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-md transition-colors">Today</button>
                <button (click)="changeMonth(1)" class="p-2 hover:bg-slate-50 rounded-md text-slate-600 transition-colors">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
             </div>
         </div>

         <!-- Calendar Grid -->
         <div class="flex-1 px-8 pb-8 overflow-y-auto">
             <!-- Weekday Headers -->
             <div class="grid grid-cols-7 mb-4">
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Sun</div>
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Mon</div>
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Tue</div>
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Wed</div>
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Thu</div>
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Fri</div>
                 <div class="text-slate-400 text-xs font-bold uppercase tracking-wider pl-2">Sat</div>
             </div>

             <!-- Days -->
             <div class="grid grid-cols-7 grid-rows-5 gap-4 h-[calc(100%-2rem)]">
                 @for (day of calendarDays(); track $index) {
                     <div 
                        (click)="!isPast(day.date) && selectDate(day.date)"
                        class="relative bg-white rounded-2xl border transition-all duration-200 flex flex-col p-3 group min-h-[100px]"
                        [class.border-transparent]="!isSelected(day.date)"
                        [class.shadow-sm]="!isPast(day.date) && day.isCurrentMonth"
                        [class.border-blue-500]="isSelected(day.date)"
                        [class.ring-2]="isSelected(day.date)"
                        [class.ring-blue-100]="isSelected(day.date)"
                        [class.opacity-40]="!day.isCurrentMonth || isPast(day.date)"
                        [class.bg-slate-50]="!day.isCurrentMonth || isPast(day.date)"
                        [class.cursor-not-allowed]="isPast(day.date)"
                        [class.cursor-pointer]="!isPast(day.date)"
                        [class.hover:shadow-md]="!isPast(day.date) && !isSelected(day.date)"
                        [class.hover:-translate-y-1]="!isPast(day.date) && !isSelected(day.date)"
                     >
                        <div class="flex justify-between items-start">
                           <span class="text-sm font-bold" 
                                 [class.text-blue-600]="isToday(day.date)"
                                 [class.text-slate-700]="!isToday(day.date)">
                              {{ day.day }}
                           </span>
                           @if (isToday(day.date)) {
                               <span class="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Today</span>
                           }
                        </div>

                        <!-- Dots for posts -->
                        <div class="mt-auto space-y-1.5">
                            @for (post of getPostsForDay(day.date); track post.id) {
                                <div class="text-[10px] truncate px-2 py-1 rounded-md font-medium"
                                     [class.bg-blue-50]="post.type === 'text'"
                                     [class.text-blue-700]="post.type === 'text'"
                                     [class.bg-purple-50]="post.type === 'carousel'"
                                     [class.text-purple-700]="post.type === 'carousel'"
                                >
                                    {{ post.scheduledDate | date:'shortTime' }}
                                </div>
                            }
                        </div>
                     </div>
                 }
             </div>
         </div>
      </div>

      <!-- RIGHT: Scheduler Panel -->
      <div class="w-[400px] bg-white flex flex-col shadow-xl z-20 border-l border-slate-200">
          
          <!-- Selected Date Header -->
          <div class="p-6 border-b border-slate-100 bg-white z-10">
             <div class="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">{{ selectedDate() | date:'EEEE' }}</div>
             <h2 class="text-3xl font-bold text-slate-900">{{ selectedDate() | date:'MMMM d' }}</h2>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 p-6 space-y-6">
             
             <!-- 1. ALREADY SCHEDULED TODAY -->
             @if (dayPosts().length > 0) {
                <div>
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Scheduled for today</h3>
                    <div class="space-y-3">
                       @for (post of dayPosts(); track post.id) {
                          <div class="flex gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm items-center">
                             <div class="flex flex-col items-center px-2 border-r border-slate-100">
                                <span class="text-xs font-bold text-slate-900">{{ post.scheduledDate | date:'h:mm' }}</span>
                                <span class="text-[10px] text-slate-500 uppercase">{{ post.scheduledDate | date:'a' }}</span>
                             </div>
                             <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="w-2 h-2 rounded-full" [class.bg-blue-500]="post.type === 'text'" [class.bg-purple-500]="post.type === 'carousel'"></span>
                                    <span class="text-xs text-slate-400 font-medium capitalize">{{ post.type }}</span>
                                </div>
                                <p class="text-sm font-medium text-slate-700 truncate">{{ post.content || post.slides?.[0]?.title }}</p>
                             </div>
                          </div>
                       }
                    </div>
                </div>
             }

             <!-- 2. ADD NEW SCHEDULE -->
             <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                 <div class="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 class="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Schedule a Post
                    </h3>
                 </div>
                 
                 <div class="p-5 space-y-6">
                    
                    <!-- Post Selector -->
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Content</label>
                        
                        @if (!selectedPost()) {
                            <button (click)="togglePicker()" class="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-500 hover:text-blue-600 font-bold text-sm flex items-center justify-center gap-2 group">
                                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                Choose from Library
                            </button>
                        } @else {
                            <div class="relative bg-blue-50 border border-blue-200 rounded-xl p-3 pr-10">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="px-1.5 py-0.5 bg-white rounded text-[10px] font-bold text-blue-700 border border-blue-100 uppercase tracking-wide">{{ selectedPost()?.type }}</span>
                                    <span class="text-[10px] text-slate-400">Modified: {{ selectedPost()?.lastModified | date:'shortDate' }}</span>
                                </div>
                                <p class="text-sm font-medium text-slate-800 line-clamp-2">{{ selectedPost()?.content || selectedPost()?.slides?.[0]?.title }}</p>
                                
                                <button (click)="selectedPost.set(null)" class="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-white rounded-full transition-all">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        }

                        <!-- DROPDOWN LIST -->
                        @if (showPicker()) {
                            <div class="mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar animate-fade-in absolute w-[350px] z-50">
                                <div class="p-2 sticky top-0 bg-white border-b border-slate-100">
                                    <div class="text-[10px] font-bold text-slate-400 uppercase px-2">Library ({{ availablePosts().length }})</div>
                                </div>
                                @for (post of availablePosts(); track post.id) {
                                    <button (click)="selectPostFromLibrary(post)" class="w-full text-left p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex gap-3">
                                        <div class="shrink-0 pt-0.5">
                                           @if (post.type === 'text') {
                                               <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                           } @else {
                                               <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                           }
                                        </div>
                                        <div>
                                            <p class="text-sm text-slate-800 font-medium line-clamp-1">{{ post.content || post.slides?.[0]?.title }}</p>
                                            <div class="flex gap-2 text-[10px] text-slate-400 mt-0.5">
                                                <span class="capitalize">{{ post.status }}</span> • <span>{{ post.lastModified | date:'MMM d' }}</span>
                                            </div>
                                        </div>
                                    </button>
                                }
                                @if (availablePosts().length === 0) {
                                    <div class="p-4 text-center text-xs text-slate-400">No available posts found.</div>
                                }
                            </div>
                            <!-- Backdrop to close -->
                            <div class="fixed inset-0 z-40" (click)="showPicker.set(false)"></div>
                        }
                    </div>

                    <!-- Time Picker -->
                    <div>
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Time</label>
                        <div class="flex items-center justify-between bg-slate-50 rounded-xl p-2 border border-slate-200">
                            <select [(ngModel)]="newHour" class="bg-transparent text-xl font-bold text-slate-900 text-center w-14 outline-none appearance-none cursor-pointer hover:text-blue-600">
                                @for (h of hours12; track h) { <option [value]="h">{{ h }}</option> }
                            </select>
                            <span class="text-slate-300 font-bold">:</span>
                            <select [(ngModel)]="newMinute" class="bg-transparent text-xl font-bold text-slate-900 text-center w-14 outline-none appearance-none cursor-pointer hover:text-blue-600">
                                <option value="00">00</option><option value="15">15</option><option value="30">30</option><option value="45">45</option>
                            </select>
                            <div class="h-6 w-px bg-slate-200"></div>
                            <select [(ngModel)]="newPeriod" class="bg-transparent text-sm font-bold text-slate-600 text-center w-14 outline-none appearance-none cursor-pointer hover:text-blue-600">
                                <option value="AM">AM</option><option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        (click)="confirmSchedule()" 
                        [disabled]="!selectedPost()"
                        class="w-full py-3 bg-[#1C1C1E] text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Confirm Schedule
                    </button>

                 </div>
             </div>

          </div>
      </div>

    </div>
  `,
   styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 3px; }
    .overflow-y-auto { scrollbar-width: thin; }
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ScheduleComponent {
   store = inject(StoreService);
   
   now = new Date();
   selectedDate = signal(new Date());
   viewDate = signal(new Date()); 
   
   // Selection State
   showPicker = signal(false);
   selectedPost = signal<Post | null>(null);

   // Time Picker State
   hours12 = ['01','02','03','04','05','06','07','08','09','10','11','12'];
   newHour = '09';
   newMinute = '00';
   newPeriod = 'AM';

   constructor() {
       const h = this.now.getHours();
       this.newPeriod = h >= 12 ? 'PM' : 'AM';
       let hour12 = h % 12;
       hour12 = hour12 ? hour12 : 12;
       this.newHour = hour12 < 10 ? '0' + hour12 : '' + hour12;
   }

   // --- Post Selection Logic ---

   // Get all posts that are NOT scheduled for the FUTURE (Drafts or Past Published)
   // Use filteredPosts to ensure we only see current profile's posts
   availablePosts = computed(() => {
       return this.store.filteredPosts()
           .filter(p => p.status !== 'scheduled') 
           .sort((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0));
   });

   togglePicker() {
       this.showPicker.update(v => !v);
   }

   selectPostFromLibrary(post: Post) {
       this.selectedPost.set(post);
       this.showPicker.set(false);
   }

   // --- Calendar Helpers ---
   
   calendarDays = computed(() => {
       const year = this.viewDate().getFullYear();
       const month = this.viewDate().getMonth();
       
       const firstDayOfMonth = new Date(year, month, 1);
       const lastDayOfMonth = new Date(year, month + 1, 0);
       
       const days = [];
       
       const startDay = firstDayOfMonth.getDay(); 
       for (let i = startDay - 1; i >= 0; i--) {
           const d = new Date(year, month, -i);
           days.push({ date: d, day: d.getDate(), isCurrentMonth: false });
       }
       
       for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
           const d = new Date(year, month, i);
           days.push({ date: d, day: i, isCurrentMonth: true });
       }
       
       const remaining = 35 - days.length; 
       for (let i = 1; i <= remaining; i++) {
            const d = new Date(year, month + 1, i);
            days.push({ date: d, day: i, isCurrentMonth: false });
       }
       
       return days;
   });

   changeMonth(delta: number) {
       const current = this.viewDate();
       this.viewDate.set(new Date(current.getFullYear(), current.getMonth() + delta, 1));
   }

   resetToToday() {
       const today = new Date();
       this.viewDate.set(today);
       this.selectedDate.set(today);
   }

   selectDate(date: Date) {
       this.selectedDate.set(date);
   }

   // --- Validation Logic ---

   isPast(date: Date): boolean {
       const today = new Date();
       today.setHours(0,0,0,0);
       const check = new Date(date);
       check.setHours(0,0,0,0);
       return check < today;
   }

   isToday(date: Date): boolean {
       const today = new Date();
       return date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();
   }

   isSelected(date: Date): boolean {
       const sel = this.selectedDate();
       return date.getDate() === sel.getDate() &&
              date.getMonth() === sel.getMonth() &&
              date.getFullYear() === sel.getFullYear();
   }

   // --- Data Logic ---

   dayPosts = computed(() => {
       return this.getPostsForDay(this.selectedDate());
   });

   getPostsForDay(date: Date) {
       return this.store.scheduledPosts().filter(p => {
           if (!p.scheduledDate) return false;
           return p.scheduledDate.getDate() === date.getDate() &&
                  p.scheduledDate.getMonth() === date.getMonth() &&
                  p.scheduledDate.getFullYear() === date.getFullYear();
       }).sort((a,b) => (a.scheduledDate?.getTime() || 0) - (b.scheduledDate?.getTime() || 0));
   }

   // --- Action Logic ---

   confirmSchedule() {
       const post = this.selectedPost();
       if (!post) return;

       // Calculate full date object
       const date = new Date(this.selectedDate());
       let hour = parseInt(this.newHour);
       if (this.newPeriod === 'PM' && hour !== 12) hour += 12;
       if (this.newPeriod === 'AM' && hour === 12) hour = 0;
       
       date.setHours(hour, parseInt(this.newMinute), 0);

       // Update the EXISTING post in the store
       this.store.posts.update(posts => posts.map(p => {
           if (p.id === post.id) {
               return {
                   ...p,
                   status: 'scheduled',
                   scheduledDate: date,
                   lastModified: new Date()
               };
           }
           return p;
       }));

       this.store.triggerNotification('Success', `Scheduled for ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
       
       // Reset selection
       this.selectedPost.set(null);
   }
}
