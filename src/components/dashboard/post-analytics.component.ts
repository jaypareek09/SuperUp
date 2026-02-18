
import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, Post } from '../../services/store.service';

@Component({
  selector: 'app-post-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full bg-[#F8FAFC] flex flex-col p-8 custom-scrollbar overflow-y-auto animate-fade-in">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button (click)="goBack()" class="bg-white p-2 rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div>
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Post Performance</h1>
          <p class="text-sm text-slate-500">Published on {{ post().lastModified | date:'longDate' }}</p>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1">
        
        <!-- Left Column: Post Preview -->
        <div class="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h2 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Post Content</h2>
          <div class="bg-slate-50 rounded-xl p-6 border border-slate-100 flex-1 overflow-y-auto custom-scrollbar">
             <div class="whitespace-pre-wrap text-slate-800 leading-relaxed font-medium">
               {{ post().content }}
             </div>
          </div>
        </div>

        <!-- Right Column: Stats & Insights -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Stat Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p class="text-sm font-bold text-slate-500 mb-1">Views</p>
              <p class="text-3xl font-extrabold text-slate-800">{{ formatNumber(post().stats?.views || 0) }}</p>
            </div>
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p class="text-sm font-bold text-slate-500 mb-1">Likes</p>
              <p class="text-3xl font-extrabold text-slate-800">{{ formatNumber(post().stats?.likes || 0) }}</p>
            </div>
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p class="text-sm font-bold text-slate-500 mb-1">Comments</p>
              <p class="text-3xl font-extrabold text-slate-800">{{ formatNumber(post().stats?.comments || 0) }}</p>
            </div>
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p class="text-sm font-bold text-slate-500 mb-1">Engagement</p>
              <p class="text-3xl font-extrabold text-slate-800">{{ engagementRate() }}%</p>
            </div>
          </div>

          <!-- AI Analysis Card -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 class="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  AI Analysis
              </h2>
              <ul class="space-y-3 text-sm">
                  <li class="flex items-start gap-3">
                     <span class="font-bold text-green-500 mt-0.5">✓</span>
                     <p class="text-slate-700">The post has a strong, curiosity-driven hook which likely captured attention early.</p>
                  </li>
                  <li class="flex items-start gap-3">
                     <span class="font-bold text-green-500 mt-0.5">✓</span>
                     <p class="text-slate-700">Excellent use of short paragraphs makes the content highly readable on mobile devices.</p>
                  </li>
                  <li class="flex items-start gap-3">
                     <span class="font-bold text-yellow-500 mt-0.5">💡</span>
                     <p class="text-slate-700">For future posts, consider adding an engagement question at the end to boost comments further.</p>
                  </li>
              </ul>
          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class PostAnalyticsComponent {
  store = inject(StoreService);
  post = input.required<Post>();

  engagementRate = computed(() => {
    const p = this.post();
    if (!p.stats || !p.stats.views || p.stats.views === 0) {
      return '0.0';
    }
    const rate = ((p.stats.likes + p.stats.comments) / p.stats.views) * 100;
    return rate.toFixed(1);
  });
      
  formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  }

  goBack() {
    this.store.activeAnalyticsPost.set(null);
  }
}
