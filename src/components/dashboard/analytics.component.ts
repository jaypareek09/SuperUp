
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in select-none">
       <div class="w-28 h-28 bg-blue-50/50 rounded-full flex items-center justify-center text-blue-500 mb-8 relative overflow-hidden group">
          <div class="absolute inset-0 bg-blue-200/20 animate-pulse rounded-full"></div>
          <svg class="w-14 h-14 relative z-10 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
       </div>
       
       <h2 class="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Analytics Coming Soon</h2>
       <p class="text-slate-500 max-w-md text-lg leading-relaxed mb-10">
         We are building a powerful analytics engine to track your impressions, engagement, and audience growth.
       </p>
       
       <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-sm w-full mx-auto relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-[shimmer_2s_infinite]"></div>
          
          <div class="flex justify-between items-center mb-4">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Development Status</span>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">In Progress</span>
          </div>
          
          <div class="space-y-3">
             <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
             </div>
             <div class="flex justify-between text-xs font-medium text-slate-500">
                <span>Core Engine</span>
                <span>65%</span>
             </div>
          </div>
       </div>

    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.6s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class AnalyticsComponent {}
