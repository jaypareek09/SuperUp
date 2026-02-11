
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 px-6 bg-[#F8FAFC]">
      <div class="max-w-7xl mx-auto">
        
        <div class="max-w-3xl mb-20 reveal">
          <h2 class="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Everything you need to <br>dominate LinkedIn.</h2>
          <p class="text-xl text-slate-500">Stop stitching together 5 different tools. SuperUp gives you a complete suite for content, engagement, and analytics.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">
          
          <!-- Card 1: AI Writing (Large) -->
          <div class="md:col-span-2 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden relative reveal">
            <div class="relative z-10 max-w-lg">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-[#0F172A] mb-4">AI that sounds like you, not a robot.</h3>
              <p class="text-slate-500 text-lg">Train our AI on your best posts. It learns your unique voice, sentence structure, and formatting preferences in seconds.</p>
            </div>
            
            <!-- Visual -->
            <div class="absolute right-0 bottom-0 w-1/2 h-3/4 bg-slate-50 border-t border-l border-slate-200 rounded-tl-3xl p-6 transition-transform group-hover:translate-y-4 group-hover:translate-x-4">
               <div class="space-y-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div class="h-2 bg-slate-200 rounded w-3/4"></div>
                  <div class="h-2 bg-slate-200 rounded w-full"></div>
                  <div class="h-2 bg-slate-200 rounded w-5/6"></div>
                  <div class="mt-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                     <div class="h-2 bg-blue-100 rounded w-1/2 mb-2"></div>
                     <div class="h-16 bg-slate-50 rounded border border-slate-100"></div>
                  </div>
               </div>
            </div>
          </div>

          <!-- Card 2: Analytics (Tall) -->
          <div class="md:row-span-2 bg-[#0F172A] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden group reveal stagger-1">
             <div class="relative z-10">
                <h3 class="text-2xl font-bold mb-4">Deep Analytics</h3>
                <p class="text-slate-400 mb-8">Track what actually drives revenue, not just vanity metrics.</p>
                
                <div class="space-y-6">
                   <div>
                      <div class="flex justify-between text-sm text-slate-400 mb-2">
                         <span>Profile Views</span>
                         <span class="text-green-400">+24%</span>
                      </div>
                      <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div class="h-full bg-blue-500 w-3/4"></div>
                      </div>
                   </div>
                   <div>
                      <div class="flex justify-between text-sm text-slate-400 mb-2">
                         <span>Post Impressions</span>
                         <span class="text-green-400">+112%</span>
                      </div>
                      <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div class="h-full bg-blue-400 w-full"></div>
                      </div>
                   </div>
                   <div>
                      <div class="flex justify-between text-sm text-slate-400 mb-2">
                         <span>Engagement Rate</span>
                         <span class="text-green-400">+5%</span>
                      </div>
                      <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div class="h-full bg-blue-500 w-1/2"></div>
                      </div>
                   </div>
                </div>
             </div>
             <!-- Glow -->
             <div class="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 blur-[100px] opacity-20 pointer-events-none"></div>
          </div>

          <!-- Card 3: Scheduling -->
          <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 reveal stagger-2">
             <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-2">Smart Scheduling</h3>
             <p class="text-slate-500">Auto-schedule for when your audience is most active.</p>
          </div>

          <!-- Card 4: CRM -->
          <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 reveal stagger-3">
             <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-2">Lead CRM</h3>
             <p class="text-slate-500">Turn comments into leads. Tag, note, and export.</p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {}
