
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-[#F8FAFC] overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 mb-16 text-center reveal">
        <h2 class="text-3xl font-bold tracking-tight text-[#0F172A]">Trusted by 10,000+ creators</h2>
        <p class="text-slate-500 mt-4">Join the top 1% of LinkedIn voices.</p>
      </div>

      <div class="marquee-container w-full relative">
        <div class="marquee-content flex gap-8 w-max px-6">
          <!-- Loop twice for smooth marquee -->
          @for (i of [1,2]; track i) {
            
            <!-- Testimonial 1 -->
            <div class="w-[400px] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
               <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <img src="https://picsum.photos/100/100?random=1" class="w-12 h-12 rounded-full object-cover border border-slate-100" alt="User">
                  <div>
                    <div class="font-bold text-[#0F172A] text-sm">Sarah Jenkins</div>
                    <div class="text-xs text-slate-500">Marketing Director @ TechFlow</div>
                  </div>
                  <div class="ml-auto text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
               </div>
               <p class="text-slate-600 text-[15px] leading-relaxed">
                 "I used to spend 5 hours a week writing LinkedIn posts. With SuperUp, I spend 30 minutes. The ROI has been insane. 🚀"
               </p>
               <div class="text-xs text-slate-400 font-medium pt-2">Posted 2 days ago</div>
            </div>

            <!-- Testimonial 2 -->
             <div class="w-[400px] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
               <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <img src="https://picsum.photos/100/100?random=2" class="w-12 h-12 rounded-full object-cover border border-slate-100" alt="User">
                  <div>
                    <div class="font-bold text-[#0F172A] text-sm">Marcus Chen</div>
                    <div class="text-xs text-slate-500">Founder @ GrowthStudio</div>
                  </div>
                  <div class="ml-auto text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
               </div>
               <p class="text-slate-600 text-[15px] leading-relaxed">
                 "Better than Taplio hands down. The UI is cleaner, and the AI suggestions actually feel like something I would write."
               </p>
               <div class="text-xs text-slate-400 font-medium pt-2">Posted 1 week ago</div>
            </div>

            <!-- Testimonial 3 -->
             <div class="w-[400px] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
               <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <img src="https://picsum.photos/100/100?random=3" class="w-12 h-12 rounded-full object-cover border border-slate-100" alt="User">
                  <div>
                    <div class="font-bold text-[#0F172A] text-sm">Emily R.</div>
                    <div class="text-xs text-slate-500">SaaS Consultant</div>
                  </div>
                  <div class="ml-auto text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
               </div>
               <p class="text-slate-600 text-[15px] leading-relaxed">
                 "The analytics are beautiful. I finally understand what my audience wants. Impressions up 300% in month one. 📈"
               </p>
               <div class="text-xs text-slate-400 font-medium pt-2">Posted 5 days ago</div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {}
