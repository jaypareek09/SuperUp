
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-white font-sans animate-fade-in">
      
      <!-- Header -->
      <div class="px-8 py-6 flex items-center justify-between border-b border-slate-100">
         <div>
            <h2 class="text-2xl font-extrabold text-[#0F172A] tracking-tight">Schedule</h2>
            <p class="text-slate-500 text-sm mt-1">Manage your upcoming content queue.</p>
         </div>
         <div class="flex gap-3">
             <button class="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                Month View
             </button>
             <button (click)="createPost()" class="px-4 py-2 bg-[#0065FF] hover:bg-[#0052CC] text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-blue-500/10 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                Schedule Post
             </button>
         </div>
      </div>

      <!-- Calendar Strip (Next 7 Days) -->
      <div class="px-8 py-6">
         <div class="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            @for (day of nextDays; track day.date) {
               <div class="flex-1 min-w-[100px] h-24 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group"
                    [class.bg-blue-600]="day.isToday"
                    [class.border-transparent]="day.isToday"
                    [class.text-white]="day.isToday"
                    [class.bg-white]="!day.isToday"
                    [class.border-slate-200]="!day.isToday"
                    [class.hover:border-blue-300]="!day.isToday"
               >
                   <span class="text-xs font-bold uppercase tracking-wider opacity-70">{{ day.label }}</span>
                   <span class="text-2xl font-extrabold">{{ day.dateNumber }}</span>
                   
                   @if (getDayPostCount(day.fullDate) > 0) {
                      <div class="flex gap-1 mt-1">
                         <span class="w-1.5 h-1.5 rounded-full" [class.bg-white]="day.isToday" [class.bg-blue-500]="!day.isToday"></span>
                      </div>
                   }
               </div>
            }
         </div>
      </div>

      <!-- Timeline / List of Scheduled Posts -->
      <div class="flex-1 px-8 pb-8 overflow-y-auto custom-scrollbar">
         <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Upcoming Queue</h3>

         @if (store.scheduledPosts().length === 0) {
            <!-- Empty State -->
            <div class="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
               <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-slate-300">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               </div>
               <h4 class="text-lg font-bold text-slate-800 mb-2">Queue is empty</h4>
               <p class="text-slate-500 text-sm mb-6">You haven't scheduled any posts for {{ store.activeProfile().name }} yet.</p>
               <button (click)="createPost()" class="text-blue-600 font-bold text-sm hover:underline">Draft your first post &rarr;</button>
            </div>
         } @else {
            <div class="space-y-4">
               @for (post of store.scheduledPosts(); track post.id) {
                  <div class="group flex gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                     <!-- Time Column -->
                     <div class="w-20 flex flex-col items-center justify-center border-r border-slate-100 pr-4">
                        <span class="text-xl font-bold text-slate-800">{{ post.scheduledDate | date:'d' }}</span>
                        <span class="text-xs font-bold text-slate-400 uppercase">{{ post.scheduledDate | date:'MMM' }}</span>
                        <span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded mt-2">{{ post.scheduledDate | date:'shortTime' }}</span>
                     </div>
                     
                     <!-- Content Preview -->
                     <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                           <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border"
                                 [class.bg-blue-50]="post.type === 'text'"
                                 [class.text-blue-600]="post.type === 'text'"
                                 [class.border-blue-100]="post.type === 'text'"
                                 [class.bg-purple-50]="post.type === 'carousel'"
                                 [class.text-purple-600]="post.type === 'carousel'"
                                 [class.border-purple-100]="post.type === 'carousel'"
                           >
                              {{ post.type }}
                           </span>
                           <span class="text-xs text-slate-400 font-medium">Scheduled for {{ store.activeProfile().name }}</span>
                        </div>
                        <h4 class="font-bold text-slate-800 text-base truncate mb-1">
                           {{ post.content || post.slides?.[0]?.title || 'Untitled Post' }}
                        </h4>
                        <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                           {{ post.content || post.slides?.[0]?.body }}
                        </p>
                     </div>

                     <!-- Actions -->
                     <div class="flex flex-col items-end justify-center pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                     </div>
                  </div>
               }
            </div>
         }
      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 3px; }
  `]
})
export class ScheduleComponent {
  store = inject(StoreService);

  get nextDays() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        dateNumber: date.getDate(),
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toDateString(),
        isToday: i === 0,
        dateObj: date
      });
    }
    return days;
  }

  getDayPostCount(dateString: string): number {
    // In a real app, match date strings. For demo, we just check mocked scheduled dates if they existed
    // Since our mock data usually doesn't have dates, this will return 0 unless user adds one
    return this.store.scheduledPosts().filter(p => p.scheduledDate?.toDateString() === dateString).length;
  }

  createPost() {
     this.store.navigateTo('WRITE');
  }
}
