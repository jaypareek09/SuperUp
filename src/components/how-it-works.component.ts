
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 px-6 bg-white border-y border-slate-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-20 reveal">
          <h2 class="text-4xl font-bold text-[#0F172A] tracking-tight mb-4">From idea to viral post in minutes.</h2>
          <p class="text-lg text-slate-500">Our workflow is designed for speed without sacrificing quality.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Step 1 -->
          <div class="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors reveal stagger-1">
             <div class="flex items-center justify-between mb-8">
                <span class="text-5xl font-bold text-slate-200">01</span>
                <div class="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Generate Ideas</h3>
             <p class="text-slate-500 leading-relaxed">
                Staring at a blank page? SuperUp scrapes top news and trends in your niche to give you infinite content ideas.
             </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors reveal stagger-2">
             <div class="flex items-center justify-between mb-8">
                <span class="text-5xl font-bold text-slate-200">02</span>
                <div class="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Draft with AI</h3>
             <p class="text-slate-500 leading-relaxed">
                Select a topic and a vibe. Our model writes the post, adds hooks, formats lines, and suggests carousels.
             </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors reveal stagger-3">
             <div class="flex items-center justify-between mb-8">
                <span class="text-5xl font-bold text-slate-200">03</span>
                <div class="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
             </div>
             <h3 class="text-xl font-bold text-[#0F172A] mb-3">Schedule & Scale</h3>
             <p class="text-slate-500 leading-relaxed">
                Add to your queue. We auto-publish at peak times. Sit back and watch the comments roll in.
             </p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent {}
