
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-white py-24 sm:py-32 px-6">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left reveal">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A smarter way to LinkedIn.</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">PostRocket is an intelligent workspace that goes beyond basic tools. We help you write better, publish smarter, and understand what actually works.</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          
          <!-- Card 1: AI Writing -->
          <div class="bg-blue-600 text-white p-8 rounded-3xl reveal stagger-1 flex flex-col">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-blue-200">AI-POWERED WRITING</h3>
            <p class="mt-4 text-2xl font-bold">Write like a thought leader.</p>
            <div class="mt-8 bg-white/10 p-4 rounded-xl ring-1 ring-inset ring-white/20 flex-1 flex flex-col">
              <div class="bg-blue-700/50 rounded-lg p-3 text-sm flex-1 text-blue-100/90 whitespace-pre-wrap font-mono text-xs leading-relaxed">
I failed my first startup.

It's not easy to admit. But the lessons were worth more than any success. <span class="bg-blue-400/50 rounded p-1">Mistakes are just data.</span>

What's a failure that taught you something valuable?
              </div>
              <div class="mt-2 pt-2 border-t border-white/10 space-y-2">
                <p class="text-xs font-bold text-blue-200/80">AI Suggestions:</p>
                <div class="flex gap-2">
                   <button class="text-[11px] font-semibold bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md">Make it punchier</button>
                   <button class="text-[11px] font-semibold bg-white/20 ring-1 ring-white/50 px-2 py-1 rounded-md">Add a story</button>
                   <button class="text-[11px] font-semibold bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md">Generate 3 hooks</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Smart Scheduling -->
          <div class="bg-yellow-300 text-gray-900 p-8 rounded-3xl reveal stagger-2 flex flex-col">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-yellow-800/80">SMART SCHEDULING</h3>
            <p class="mt-4 text-2xl font-bold">Find your best post times, automatically.</p>
             <div class="mt-8 bg-white/40 p-4 rounded-xl ring-1 ring-inset ring-black/10 flex-1 flex flex-col font-sans">
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-slate-800">Your Optimal Times</p>
                <div class="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-slate-500 text-xs font-bold">?</div>
              </div>
              <div class="space-y-4">
                <!-- Tuesday -->
                <div>
                  <p class="text-xs font-bold text-slate-500 mb-1.5">Tue, May 7</p>
                  <div class="flex gap-2">
                    <div class="bg-white/60 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">09:15 AM</div>
                    <div class="bg-white/60 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">12:30 PM</div>
                  </div>
                </div>
                <!-- Wednesday -->
                <div>
                  <p class="text-xs font-bold text-slate-500 mb-1.5">Wed, May 8</p>
                  <div class="flex gap-2">
                    <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-200">08:45 AM</div>
                    <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-200">04:00 PM</div>
                  </div>
                </div>
                <!-- Thursday -->
                <div>
                  <p class="text-xs font-bold text-slate-500 mb-1.5">Thu, May 9</p>
                  <div class="flex gap-2">
                     <div class="flex-1 bg-blue-600 text-white rounded-lg p-2.5 shadow-lg shadow-blue-900/20 text-xs font-bold leading-tight">
                       <span class="opacity-80">09:00 AM</span><br>Post: AI trends for 2026...
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: Analytics -->
          <div class="bg-pink-100 text-gray-900 p-8 rounded-3xl reveal stagger-3 flex flex-col">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-pink-900/60">ACTIONABLE ANALYTICS</h3>
            <p class="mt-4 text-2xl font-bold">Get insights, not just data.</p>
             <div class="mt-8 bg-white/40 p-4 rounded-xl ring-1 ring-inset ring-black/10 flex-1 flex flex-col justify-end">
                <!-- Mini Graph -->
                <div class="h-16 w-full flex items-end gap-1 mb-4">
                   <div class="w-full bg-blue-200/50 rounded-t h-[30%]"></div>
                   <div class="w-full bg-blue-200/50 rounded-t h-[50%]"></div>
                   <div class="w-full bg-blue-600 rounded-t h-[80%] shadow-lg shadow-blue-300"></div>
                   <div class="w-full bg-blue-200/50 rounded-t h-[70%]"></div>
                </div>

                <!-- Insight Card -->
                <div class="bg-white p-3 rounded-lg border border-pink-200/50 shadow-sm">
                   <p class="text-xs font-bold text-pink-800/80 mb-1 flex items-center gap-1.5">
                      This Month's Insight
                   </p>
                   <p class="text-sm font-medium text-gray-800 leading-snug">
                     Carousels are your top-performing format, driving <span class="font-bold text-green-600">45% more profile views.</span>
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ShowcaseComponent {}
