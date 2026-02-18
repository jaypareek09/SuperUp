
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-[#F8FAFC] overflow-y-auto custom-scrollbar">
       
       <!-- Header Section with Greeting and Date -->
       <div class="px-8 pt-8 pb-6">
          <div class="flex justify-between items-end mb-8">
              <div>
                  <h1 class="text-2xl font-bold text-slate-900">Good {{ timeOfDay }}, {{ firstName }}</h1>
                  <p class="text-slate-500 text-sm mt-1">Here's what's happening with your content today.</p>
              </div>
              <div class="text-right hidden sm:block">
                  <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ currentDate | date:'EEEE, MMMM d' }}</p>
              </div>
          </div>

          <!-- Quick Actions -->
          <h2 class="text-base font-bold text-slate-800 mb-4">Create Content</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
             <!-- Modified Button to Open Modal -->
             <button (click)="store.openNewPostModal()" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group text-left">
                <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
                <div class="font-bold text-slate-900 text-sm">Write Post</div>
                <div class="text-xs text-slate-500 mt-1">Draft & Schedule</div>
             </button>

             <button (click)="store.navigateTo('CAROUSEL')" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all group text-left">
                <div class="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="font-bold text-slate-900 text-sm">Carousel Maker</div>
                <div class="text-xs text-slate-500 mt-1">PDF Slides</div>
             </button>

             <button (click)="store.navigateTo('VIRAL')" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-md transition-all group text-left">
                <div class="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div class="font-bold text-slate-900 text-sm">Viral Ideas</div>
                <div class="text-xs text-slate-500 mt-1">Get Inspired</div>
             </button>

             <button (click)="store.navigateTo('ANALYTICS')" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all group text-left">
                <div class="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <div class="font-bold text-slate-900 text-sm">Analytics</div>
                <div class="text-xs text-slate-500 mt-1">Track Growth</div>
             </button>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h2 class="text-base font-bold text-slate-800">Recent Content</h2>
                  <button (click)="store.navigateTo('MY_POSTS')" class="text-xs font-bold text-blue-600 hover:text-blue-700">View All</button>
              </div>
              
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-100">
                            <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Post Name</th>
                            <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Modified</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        @if (store.filteredPosts().length === 0) {
                            <tr>
                                <td colspan="3" class="px-6 py-8 text-center text-sm text-slate-400 italic">
                                    No posts yet. Start writing!
                                </td>
                            </tr>
                        }
                        @for (post of store.filteredPosts().slice(0, 5); track post.id) {
                            <tr (click)="editPost(post)" class="hover:bg-blue-50/30 cursor-pointer transition-colors group">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" 
                                             [class.bg-blue-100]="post.type === 'text'"
                                             [class.text-blue-600]="post.type === 'text'"
                                             [class.bg-purple-100]="post.type === 'carousel'"
                                             [class.text-purple-600]="post.type === 'carousel'">
                                            @if (post.type === 'text') {
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                            } @else {
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                            }
                                        </div>
                                        <div class="min-w-0">
                                            <div class="font-medium text-slate-900 truncate max-w-xs group-hover:text-blue-600 transition-colors">
                                                {{ post.title || post.content || 'Untitled Draft' }}
                                            </div>
                                            <div class="text-xs text-slate-500 capitalize">{{ post.type }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                          [class.bg-slate-100]="post.status === 'draft'"
                                          [class.text-slate-800]="post.status === 'draft'"
                                          [class.bg-blue-100]="post.status === 'scheduled'"
                                          [class.text-blue-800]="post.status === 'scheduled'"
                                          [class.bg-green-100]="post.status === 'published'"
                                          [class.text-green-800]="post.status === 'published'">
                                        {{ post.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-right text-sm text-slate-500 font-mono">
                                    {{ post.lastModified | date:'MMM d' }}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
              </div>
          </div>
       </div>
    </div>
  `,
  styles: [`
     .custom-scrollbar::-webkit-scrollbar { width: 6px; }
     .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
     .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  `]
})
export class DashboardHomeComponent {
  store = inject(StoreService);
  authService = inject(AuthService);
  currentDate = new Date();

  get timeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  }

  get firstName(): string {
      return this.store.activeProfile().name.split(' ')[0];
  }

  editPost(post: any) {
      this.store.activeDraft.set(post);
      if (post.type === 'carousel') {
          this.store.navigateTo('CAROUSEL');
      } else {
          this.store.navigateTo('WRITE');
      }
  }
}
