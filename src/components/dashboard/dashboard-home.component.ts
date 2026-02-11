
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-fade-in pb-12">
      
      <!-- ANALYTICS SECTION -->
      <div>
         <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-slate-800">Profile Analytics</h2>
            @if (store.profileStats().followers > 0) {
                <div class="flex items-center gap-2">
                   <span class="flex h-2.5 w-2.5 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                   </span>
                   <span class="text-xs font-semibold text-slate-500">Live Syncing</span>
                </div>
            }
         </div>
         
         @if (store.profileStats().followers === 0) {
            <!-- EMPTY STATE -->
            <div class="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Connect Extension to see Analytics</h3>
                <p class="text-slate-500 max-w-md mx-auto mb-6">We need to sync with your LinkedIn profile to show your followers, views, and engagement metrics.</p>
                <button (click)="store.currentView.set('EXTENSION')" class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                    Go to Extension Setup
                </button>
            </div>
         } @else {
             <!-- DATA STATE -->
             <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <!-- Followers -->
                 <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div class="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Total Followers</div>
                    <div class="text-3xl font-extrabold text-slate-900 flex items-end gap-2">
                       {{ store.profileStats().followers | number }}
                    </div>
                 </div>

                 <!-- Impressions -->
                 <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div class="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Post Impressions</div>
                    <div class="text-3xl font-extrabold text-slate-900 flex items-end gap-2">
                       {{ store.profileStats().postImpressions | number }}
                    </div>
                 </div>

                 <!-- Profile Views -->
                 <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div class="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Profile Views</div>
                    <div class="text-3xl font-extrabold text-slate-900 flex items-end gap-2">
                       {{ store.profileStats().profileViews | number }}
                    </div>
                 </div>

                 <!-- Engagement Rate -->
                 <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div class="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Avg. Engagement</div>
                    <div class="text-3xl font-extrabold text-slate-900 flex items-end gap-2">
                       {{ store.profileStats().engagementRate }}%
                    </div>
                 </div>
             </div>
         }
      </div>

      <!-- Post Performance Table -->
      @if (store.analyzedPosts().length > 0) {
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 class="font-bold text-slate-900 text-lg">Post Performance</h3>
                 <button class="text-blue-600 text-sm font-semibold hover:text-blue-700">View All Posts</button>
             </div>
             <div class="overflow-x-auto">
                 <table class="w-full text-left">
                     <thead>
                         <tr class="bg-slate-50 border-b border-slate-100">
                             <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Post Content</th>
                             <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Views</th>
                             <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Likes</th>
                             <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Comments</th>
                             <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Eng. Rate</th>
                         </tr>
                     </thead>
                     <tbody class="divide-y divide-slate-50">
                         @for (post of store.analyzedPosts(); track post.id) {
                             <tr class="hover:bg-blue-50/30 transition-colors">
                                 <td class="px-6 py-4">
                                     <div class="font-medium text-slate-900 line-clamp-1 mb-1">{{ post.content }}</div>
                                     <div class="text-xs text-slate-400">Posted {{ post.date }}</div>
                                 </td>
                                 <td class="px-6 py-4 text-right font-mono text-slate-600">{{ post.views | number }}</td>
                                 <td class="px-6 py-4 text-right font-mono text-blue-600 font-bold">{{ post.likes | number }}</td>
                                 <td class="px-6 py-4 text-right font-mono text-slate-600">{{ post.comments | number }}</td>
                                 <td class="px-6 py-4 text-right">
                                     <span class="font-bold text-xs bg-slate-100 px-2 py-1 rounded">{{ post.engagement }}%</span>
                                 </td>
                             </tr>
                         }
                     </tbody>
                 </table>
             </div>
          </div>
      }

      <!-- Queue & Drafts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Queue Section -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 class="font-bold text-slate-900 text-lg">Upcoming Queue</h3>
          </div>
          
          @if (store.scheduledPosts().length > 0) {
              <div class="divide-y divide-slate-100">
                @for (post of store.scheduledPosts(); track post.id) {
                    <div class="p-6 hover:bg-slate-50 transition-colors flex gap-6 items-start group">
                      <div class="shrink-0 w-16 text-center bg-slate-100 rounded-lg p-2">
                          <div class="text-xs font-bold text-slate-500 uppercase">{{ post.scheduledDate | date:'MMM' }}</div>
                          <div class="text-xl font-bold text-slate-900">{{ post.scheduledDate | date:'dd' }}</div>
                      </div>
                      <div class="flex-1">
                          <div class="flex items-center gap-2 mb-2">
                            <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wide">
                                {{ post.type }}
                            </span>
                            <span class="text-xs text-slate-400 font-medium">
                                {{ post.scheduledDate | date:'shortTime' }}
                            </span>
                          </div>
                          <p class="text-slate-700 text-sm line-clamp-2 leading-relaxed">
                            {{ post.content || (post.slides ? post.slides[0].title : 'No content') }}
                          </p>
                      </div>
                      <button (click)="store.deletePost(post.id)" class="text-slate-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                }
              </div>
          } @else {
              <div class="p-12 text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h4 class="text-slate-900 font-bold mb-1">Your queue is empty</h4>
                <p class="text-slate-500 text-sm mb-4">Schedule your first post to see it here.</p>
                <button (click)="store.currentView.set('WRITE')" class="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                    Create Post
                </button>
              </div>
          }
        </div>

        <!-- Right Side: Drafts Mini -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
           <h3 class="font-bold text-slate-900 text-lg mb-4">Recent Drafts</h3>
           @if (store.drafts().length > 0) {
              <div class="space-y-3">
                 @for (draft of store.drafts(); track draft.id) {
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-pointer">
                       <div class="flex justify-between items-start mb-1">
                          <span class="text-[10px] font-bold uppercase text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">{{ draft.type }}</span>
                          <span class="text-[10px] text-slate-400">Just now</span>
                       </div>
                       <div class="text-sm font-medium text-slate-700 line-clamp-2">
                          {{ draft.content || draft.slides?.[0]?.title || 'Untitled Draft' }}
                       </div>
                    </div>
                 }
              </div>
           } @else {
              <div class="text-center py-8 text-slate-400 text-sm">
                 No drafts yet.
              </div>
           }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class DashboardHomeComponent {
  store = inject(StoreService);
}
