
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="how-it-works" class="py-32 px-6 bg-white border-y border-slate-100 scroll-mt-24">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <h2 class="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
            From idea to 
            <span class="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">viral post</span><br>
            in three simple steps.
          </h2>
          <p class="text-lg text-slate-500">A streamlined workflow designed for high-performance creators.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          <!-- Connecting Line (Desktop) -->
          <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

          <!-- Step 1 -->
          <div class="flex flex-col items-center text-center reveal stagger-1">
             <div class="w-24 h-24 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 mb-8 relative z-10">
                <span class="text-2xl font-bold">1</span>
                <div class="absolute -bottom-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Ideate</div>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Generate Concepts</h3>
             <p class="text-slate-500 leading-relaxed max-w-xs">
                PostRocket scrapes trending topics in your niche to give you infinite, high-relevance content ideas instantly.
             </p>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center text-center reveal stagger-2">
             <div class="w-24 h-24 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 mb-8 relative z-10">
                <span class="text-2xl font-bold">2</span>
                <div class="absolute -bottom-2 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">Create</div>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Draft & Refine</h3>
             <p class="text-slate-500 leading-relaxed max-w-xs">
                Select a topic and let our AI draft the post. Use our smart editor to format hooks, check tone, and optimize for readability.
             </p>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center text-center reveal stagger-3">
             <div class="w-24 h-24 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 mb-8 relative z-10">
                <span class="text-2xl font-bold">3</span>
                <div class="absolute -bottom-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Growth</div>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Schedule & Scale</h3>
             <p class="text-slate-500 leading-relaxed max-w-xs">
                Add to your queue. We auto-publish at peak times while you sit back and watch the engagement roll in.
             </p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent {}
