
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, Post } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-white">
      
      <!-- Top Search Bar -->
      <div class="px-6 py-4 flex items-center justify-between">
          <div class="relative w-full max-w-[720px]">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
             <input 
                type="text" 
                placeholder="Search posts..." 
                class="block w-full pl-10 pr-3 py-3 border-none rounded-full bg-[#E9EEF6] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:shadow-sm sm:text-sm transition-shadow"
             >
             <button class="absolute inset-y-0 right-0 pr-3 flex items-center">
                 <svg class="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-full p-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                 </svg>
             </button>
          </div>
      </div>

      <!-- Toolbar -->
      <div class="px-6 py-2 flex items-center gap-2 border-b border-transparent">
         <button class="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white flex items-center gap-2 shadow-sm">
            Date
            <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
         </button>
         <button class="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white flex items-center gap-2 shadow-sm">
            Title only
            <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
         </button>
      </div>
      
      <!-- File List Header -->
      <div class="px-4 py-2 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 border-b border-gray-200">
         <div class="col-span-6 pl-2">Name</div>
         <div class="col-span-3">Owner</div>
         <div class="col-span-3 text-right pr-4">Last modified</div>
      </div>

      <!-- Empty State -->
      @if (store.filteredPosts().length === 0) {
        <div class="flex-1 flex flex-col items-center justify-center text-center p-12">
             <div class="w-48 h-48 mb-6 opacity-50 bg-[url('https://cdn-icons-png.flaticon.com/512/748/748679.png')] bg-contain bg-no-repeat bg-center grayscale"></div>
             <h3 class="text-lg font-bold text-[#1C1C1C] mb-2">No posts yet</h3>
             <p class="text-gray-500 mb-6 text-sm">Create a new post for <strong>{{ store.activeProfile().name }}</strong>.</p>
             <button (click)="createNew()" class="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
                New Post
             </button>
         </div>
      }

      <!-- List Content -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
         @for (post of store.filteredPosts(); track post.id) {
            <div (click)="openPost(post)" class="group grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-[#F0F4F9] cursor-pointer border-b border-gray-100 transition-colors">
               
               <!-- Name Column -->
               <div class="col-span-6 flex items-center gap-3 pl-2 overflow-hidden">
                   <!-- Icon based on type -->
                   @if (post.type === 'text') {
                      <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                   } @else {
                      <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                   }
                   
                   <span class="text-sm font-medium text-gray-700 truncate">
                      {{ post.content || post.slides?.[0]?.title || 'Untitled Draft' }}
                   </span>
               </div>

               <!-- Owner Column -->
               <div class="col-span-3 text-sm text-gray-500 flex items-center gap-2">
                   <img [src]="store.activeProfile().avatar" class="w-5 h-5 rounded-full object-cover">
                   <span class="truncate">me</span>
               </div>

               <!-- Modified Column -->
               <div class="col-span-3 text-sm text-gray-500 text-right pr-4">
                   {{ post.lastModified | date:'MMM d' }}
               </div>
            </div>
         }
      </div>

    </div>
  `
})
export class MyPostsComponent {
  store = inject(StoreService);
  authService = inject(AuthService);

  createNew() {
    this.store.currentView.set('WRITE');
  }

  openPost(post: Post) {
      this.store.activeDraft.set(post);
      if (post.type === 'carousel') {
          this.store.currentView.set('CAROUSEL');
      } else {
          this.store.currentView.set('WRITE');
      }
  }
}
