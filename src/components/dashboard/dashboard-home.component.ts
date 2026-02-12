
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-white">
       
       <!-- Top Bar (Search) - Consistent with MyPosts -->
      <div class="px-6 py-4 flex items-center justify-between">
          <div class="relative w-full max-w-[720px]">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
             <input 
                type="text" 
                placeholder="Search everything..." 
                class="block w-full pl-10 pr-3 py-3 border-none rounded-full bg-[#E9EEF6] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:shadow-sm sm:text-sm transition-shadow"
             >
          </div>
      </div>

      <!-- Quick Suggested -->
      <div class="px-8 pt-4 pb-2">
         <h2 class="text-base font-bold text-gray-800 mb-4">Suggested</h2>
         
         <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Create Post Card -->
            <button (click)="store.navigateTo('WRITE')" class="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 text-left hover:bg-gray-50 transition-colors flex flex-col gap-2 group h-32 justify-between">
                <div class="p-2 bg-blue-100 text-blue-600 w-fit rounded-lg group-hover:bg-blue-200 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <span class="font-medium text-gray-700 text-sm">New Text Post</span>
            </button>

            <!-- Create Carousel Card -->
            <button (click)="store.navigateTo('CAROUSEL')" class="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 text-left hover:bg-gray-50 transition-colors flex flex-col gap-2 group h-32 justify-between">
                <div class="p-2 bg-purple-100 text-purple-600 w-fit rounded-lg group-hover:bg-purple-200 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <span class="font-medium text-gray-700 text-sm">New Carousel</span>
            </button>
            
            <!-- Ideas -->
            <button (click)="store.navigateTo('VIRAL')" class="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 text-left hover:bg-gray-50 transition-colors flex flex-col gap-2 group h-32 justify-between">
                <div class="p-2 bg-green-100 text-green-600 w-fit rounded-lg group-hover:bg-green-200 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <span class="font-medium text-gray-700 text-sm">Get Ideas</span>
            </button>
         </div>
      </div>

      <!-- Recent Files Table Structure -->
      <div class="px-8 mt-8 flex-1 flex flex-col overflow-hidden">
         <h2 class="text-base font-bold text-gray-800 mb-4">Recent for {{ store.activeProfile().name }}</h2>

         <!-- File List Header -->
         <div class="px-4 py-2 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 border-b border-gray-200">
             <div class="col-span-6 pl-2">Name</div>
             <div class="col-span-3">Owner</div>
             <div class="col-span-3 text-right pr-4">Last modified</div>
         </div>
         
         <div class="flex-1 overflow-y-auto custom-scrollbar">
            @if (store.filteredPosts().length === 0) {
               <div class="py-12 text-center">
                   <p class="text-sm text-gray-400 italic">No recent activity for this profile.</p>
               </div>
            }

            @for (post of store.filteredPosts().slice(0, 5); track post.id) {
               <div (click)="editPost(post)" class="group grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-[#F0F4F9] cursor-pointer border-b border-gray-100 transition-colors">
                 
                 <!-- Name -->
                 <div class="col-span-6 flex items-center gap-3 pl-2 overflow-hidden">
                    @if (post.type === 'text') {
                      <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                   } @else {
                      <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                   }
                   <span class="text-sm font-medium text-gray-700 truncate">
                      {{ post.content || post.slides?.[0]?.title || 'Untitled Draft' }}
                   </span>
                 </div>

                 <!-- Owner -->
                 <div class="col-span-3 text-sm text-gray-500 flex items-center gap-2">
                   <img [src]="store.activeProfile().avatar" class="w-5 h-5 rounded-full object-cover">
                   <span class="truncate">me</span>
                 </div>

                 <!-- Modified -->
                 <div class="col-span-3 text-sm text-gray-500 text-right pr-4">
                   {{ post.lastModified | date:'MMM d' }}
                 </div>

               </div>
            }
         </div>
      </div>
    </div>
  `,
  styles: [`
     .custom-scrollbar::-webkit-scrollbar { width: 6px; }
     .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 3px; }
  `]
})
export class DashboardHomeComponent {
  store = inject(StoreService);
  authService = inject(AuthService);

  editPost(post: any) {
      this.store.activeDraft.set(post);
      if (post.type === 'carousel') {
          this.store.navigateTo('CAROUSEL');
      } else {
          this.store.navigateTo('WRITE');
      }
  }
}
