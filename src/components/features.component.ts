
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="features" class="py-32 px-6 bg-white scroll-mt-24">
      <div class="max-w-7xl mx-auto">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(340px,auto)]">
          
          <!-- Card 1: AI Writing (Wide) -->
          <div class="md:col-span-2 bg-[#F8FAFC] rounded-[32px] p-10 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative reveal">
            <div class="relative z-10 max-w-md">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0065FF] mb-6 shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-[#0F172A] mb-3">Contextual AI Writing</h3>
              <p class="text-slate-500 leading-relaxed">Our AI doesn't just guess. It analyzes your previous top-performing posts to match your tone, formatting, and unique voice instantly.</p>
            </div>
            
            <!-- Abstract UI decoration -->
            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full border-l border-slate-200 bg-white/50 p-6 flex flex-col justify-center gap-4 group-hover:translate-x-2 transition-transform">
               <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm opacity-60">
                  <div class="h-2 w-12 bg-blue-100 rounded mb-2"></div>
                  <div class="h-2 w-full bg-slate-100 rounded"></div>
               </div>
               <div class="bg-white p-4 rounded-xl border border-blue-200 shadow-lg scale-105">
                  <div class="h-2 w-16 bg-[#0065FF] rounded mb-2"></div>
                  <div class="h-2 w-3/4 bg-slate-200 rounded"></div>
                  <div class="h-2 w-1/2 bg-slate-200 rounded mt-1"></div>
               </div>
               <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm opacity-60">
                  <div class="h-2 w-10 bg-slate-200 rounded mb-2"></div>
                  <div class="h-2 w-5/6 bg-slate-100 rounded"></div>
               </div>
            </div>
          </div>

          <!-- Card 2: Analytics (Tall) -->
          <div class="md:row-span-2 bg-black rounded-[32px] p-10 text-white relative overflow-hidden group reveal stagger-1 flex flex-col justify-between">
             <div class="relative z-10">
                <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 backdrop-blur-sm border border-white/10">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold mb-3">Deep Analytics</h3>
                <p class="text-slate-400 leading-relaxed">Visualize your growth with granular data on impressions, profile views, and engagement rates over time.</p>
             </div>
             
             <!-- Chart graphic -->
             <div class="mt-8 relative h-40 w-full">
                <div class="absolute inset-x-0 bottom-0 h-full flex items-end gap-2 px-2">
                   <div class="w-full bg-blue-500/20 rounded-t-lg h-[30%]"></div>
                   <div class="w-full bg-blue-500/30 rounded-t-lg h-[50%]"></div>
                   <div class="w-full bg-blue-500/40 rounded-t-lg h-[40%]"></div>
                   <div class="w-full bg-blue-500/60 rounded-t-lg h-[70%]"></div>
                   <div class="w-full bg-[#0065FF] rounded-t-lg h-[60%] shadow-[0_0_30px_rgba(0,101,255,0.6)]"></div>
                   <div class="w-full bg-blue-500/50 rounded-t-lg h-[80%]"></div>
                </div>
             </div>
          </div>

          <!-- Card 3: Scheduling -->
          <div class="bg-[#F8FAFC] rounded-[32px] p-10 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 reveal stagger-2">
             <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0065FF] mb-6 shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Smart Scheduling</h3>
             <p class="text-slate-500 leading-relaxed">Auto-schedule your posts for when your specific audience is most active to maximize reach.</p>
          </div>

          <!-- Card 4: CRM -->
          <div class="bg-[#F8FAFC] rounded-[32px] p-10 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 reveal stagger-3">
             <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0065FF] mb-6 shadow-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Lead CRM</h3>
             <p class="text-slate-500 leading-relaxed">Turn comments into leads. Tag prospects, add notes, and export data directly to your CRM.</p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {}
