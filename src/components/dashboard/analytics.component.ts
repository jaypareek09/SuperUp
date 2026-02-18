
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, Post } from '../../services/store.service';
import { PostAnalyticsComponent } from './post-analytics.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, PostAnalyticsComponent],
  template: `
    @if (store.activeAnalyticsPost(); as post) {
      <app-post-analytics [post]="post" />
    } @else {
      <div class="h-full bg-[#F8FAFC] overflow-y-auto custom-scrollbar p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
              <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Analytics</h1>
              <p class="text-slate-500 mt-1">Performance for {{ store.activeProfile().name }}</p>
          </div>
          <div class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200 shadow-sm">
              Demo Data
          </div>
        </div>

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Left Column (Main Content) -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-slate-500 mb-1">Total Followers</p>
                        <div class="flex items-baseline gap-2">
                          <p class="text-2xl font-extrabold text-slate-800">{{ formatNumber(store.profileStats().followers) }}</p>
                          <div class="text-xs font-bold text-green-700">+{{ getStatChange(store.profileStats().followers).value }}</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-slate-500 mb-1">Profile Views</p>
                        <div class="flex items-baseline gap-2">
                          <p class="text-2xl font-extrabold text-slate-800">{{ formatNumber(store.profileStats().profileViews) }}</p>
                          <div class="text-xs font-bold text-green-700">+{{ getStatChange(store.profileStats().profileViews).value }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Chart -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 class="text-lg font-bold text-slate-800 mb-1">Post Impressions</h2>
              <p class="text-sm text-slate-400 mb-6">Last 30 days</p>
              <div class="h-64 w-full relative">
                  <!-- Grid lines -->
                  <div class="absolute inset-0 flex flex-col justify-between">
                      <div class="h-px bg-slate-100"></div><div class="h-px bg-slate-100"></div>
                      <div class="h-px bg-slate-100"></div><div class="h-px bg-slate-100"></div>
                      <div class="h-px bg-slate-200"></div>
                  </div>
                  <div class="absolute -left-10 top-0 bottom-0 text-right text-[10px] font-bold text-slate-400 flex flex-col justify-between py-1">
                      <span>10k</span><span>5k</span><span>0</span>
                  </div>
                  <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:rgba(59,130,246,0.2)" />
                        <stop offset="100%" style="stop-color:rgba(59,130,246,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0,100 C50,80 100,120 150,90 C200,60 250,110 300,70 C350,30 400,90 400,90 V150 H0 Z" fill="url(#chartGradient)" />
                    <path d="M0,100 C50,80 100,120 150,90 C200,60 250,110 300,70 C350,30 400,90 400,90" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="350" cy="30" r="4" fill="#3B82F6" stroke="white" stroke-width="2"></circle>
                  </svg>
              </div>
            </div>
          </div>

          <!-- Right Column (Sidebar) -->
          <div class="space-y-8">
              <!-- Key Insights -->
              <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 class="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                      AI-Powered Insights
                  </h2>
                  <ul class="space-y-3 text-sm">
                      <li class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span class="font-bold text-slate-500">✓</span>
                        <p class="text-slate-700">Posts with questions receive <b class="text-slate-900">45% more comments</b> on average.</p>
                      </li>
                      <li class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span class="font-bold text-slate-500">✓</span>
                        <p class="text-slate-700">Your audience is most active around <b class="text-slate-900">9 AM on weekdays.</b></p>
                      </li>
                  </ul>
              </div>

              <!-- ALL PUBLISHED POSTS -->
              <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 class="text-base font-bold text-slate-800 mb-4">All Published Posts</h2>
                <div class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                    @for (post of publishedPosts(); track post.id) {
                        <button (click)="selectPost(post)" class="w-full text-left bg-white p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm transition-all cursor-pointer group">
                            <p class="text-sm font-medium text-slate-800 truncate group-hover:text-blue-800">{{ post.content }}</p>
                            <div class="flex justify-between items-center text-xs text-slate-500 font-bold mt-3">
                              <span>{{ post.lastModified | date:'mediumDate' }}</span>
                              <div class="flex gap-4 items-center">
                                  <span>👁️ {{ formatNumber(post.stats?.views || 0) }}</span>
                                  <span class="flex items-center gap-1">
                                    ⚡ 
                                    @if(post.stats && post.stats.views > 0) {
                                      {{ (((post.stats.likes || 0) + (post.stats.comments || 0)) / post.stats.views * 100).toFixed(1) }}%
                                    } @else {
                                      0.0%
                                    }
                                  </span>
                                  <span class="opacity-0 group-hover:opacity-100 text-blue-600 font-bold transition-opacity">View Stats →</span>
                              </div>
                            </div>
                        </button>
                    } @empty {
                      <div class="text-center py-8 text-slate-400">
                        <p>No published posts to analyze yet.</p>
                      </div>
                    }
                </div>
              </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
  `]
})
export class AnalyticsComponent {
  store = inject(StoreService);

  publishedPosts = computed(() => 
      this.store.posts()
          .filter(p => p.status === 'published')
          .sort((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0))
  );

  formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  }

  getStatChange(stat: number): { value: string, isPositive: boolean } {
      const randomFactor = (Math.random() - 0.4) * 0.2;
      const change = stat * randomFactor;
      const percentage = (change / (stat - change)) * 100;
      return {
          value: `${Math.abs(percentage).toFixed(1)}%`,
          isPositive: percentage >= 0
      };
  }

  selectPost(post: Post) {
    this.store.activeAnalyticsPost.set(post);
  }
}
