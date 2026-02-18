import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="how-it-works" class="py-40 px-6 bg-slate-50/50 border-y border-slate-100 scroll-mt-24 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-4xl mx-auto mb-32 reveal">
          <h2 class="text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-tight">
            A Smarter Workflow, Built for Growth
          </h2>
          <p class="text-xl text-slate-500 leading-relaxed">From a rough idea to a viral post, PostRocket streamlines your entire content creation process.</p>
        </div>

        <div class="space-y-32 md:space-y-40">

          <!-- Step 1: Create -->
          <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal relative">
            <div class="text-center md:text-left">
               <div class="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-8">
                  <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-extrabold text-sm flex items-center justify-center">1</span>
                  <span class="font-bold text-blue-700 tracking-wide">Create with AI</span>
               </div>
               <h3 class="text-4xl font-bold text-[#0F172A] mb-6">Craft the Perfect Post, 10x Faster</h3>
               <p class="text-slate-500 leading-relaxed text-xl">
                  Start with a simple idea and let our AI co-pilot do the heavy lifting. Generate drafts, find viral hooks, humanize text, and fix grammar instantly.
               </p>
            </div>
            <div class="relative flex items-center justify-center">
                <div class="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-6 relative">
                    <p class="text-base font-medium text-slate-600 whitespace-pre-wrap leading-relaxed">My first startup failed. It's not easy to admit, but the lessons were worth more than any success. Mistakes are just data...</p>
                    
                    <!-- AI Tool Buttons -->
                    <button class="absolute -top-4 left-10 bg-white shadow-lg border border-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 animate-float">
                       <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                       Write with AI
                    </button>
                     <button class="absolute top-1/3 -right-6 bg-white shadow-lg border border-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 animate-float" style="animation-delay: 200ms;">
                       <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       Generate Hooks
                    </button>
                    <button class="absolute bottom-1/4 -left-8 bg-white shadow-lg border border-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 animate-float" style="animation-delay: 400ms;">
                       <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                       Humanize
                    </button>
                     <button class="absolute -bottom-4 right-16 bg-white shadow-lg border border-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-1.5 animate-float" style="animation-delay: 600ms;">
                       <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       Fix Grammar
                    </button>
                </div>
            </div>
          </div>

          <!-- Step 2: Schedule -->
          <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal relative">
            <div class="relative flex items-center justify-center md:order-2">
               <div class="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-6">
                  <div class="flex justify-between items-center mb-4">
                     <span class="font-bold text-slate-800">May 2026</span>
                     <!-- Month navigation arrows -->
                  </div>
                  <div class="grid grid-cols-7 text-center text-xs font-medium text-slate-400">
                     <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                  </div>
                  <div class="grid grid-cols-7 text-center mt-2">
                     @for (day of [27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]; track day) {
                       <div class="p-1">
                          <span class="w-8 h-8 flex items-center justify-center rounded-full font-semibold relative" 
                                [class.text-slate-800]="day < 27"
                                [class.text-slate-300]="day >= 27"
                                [class.bg-blue-600]="day === 14"
                                [class.text-white]="day === 14"
                                [class.shadow-lg]="day === 14"
                                [class.shadow-blue-500/50]="day === 14">
                            {{ day }}
                            @if (day === 8 || day === 12) {
                               <span class="absolute bottom-0 w-1 h-1 bg-blue-300 rounded-full"></span>
                            }
                          </span>
                       </div>
                     }
                  </div>
                  <div class="mt-4 pt-4 border-t border-slate-100">
                      <div class="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                         <div class="flex items-center gap-3">
                             <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm"><img src="https://picsum.photos/seed/post1/40" class="rounded-md"></div>
                             <div>
                                <p class="text-sm font-bold text-slate-800">Post scheduled</p>
                                <p class="text-xs text-slate-500">for May 14 at 9:30 AM</p>
                             </div>
                         </div>
                         <span class="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Auto-posted</span>
                      </div>
                  </div>
               </div>
            </div>
            <div class="text-center md:text-left md:order-1">
               <div class="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-8">
                  <span class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-sm flex items-center justify-center">2</span>
                  <span class="font-bold text-yellow-800 tracking-wide">Schedule with Confidence</span>
               </div>
               <h3 class="text-4xl font-bold text-[#0F172A] mb-6">Post at the Perfect Moment</h3>
               <p class="text-slate-500 leading-relaxed text-xl">
                  Our AI analyzes your audience's activity to find the optimal posting times. Schedule your content for its peak viral window and maximize your reach automatically.
               </p>
            </div>
          </div>

          <!-- Step 3: Analyze -->
          <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal relative">
            <div class="text-center md:text-left">
               <div class="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-8">
                  <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-extrabold text-sm flex items-center justify-center">3</span>
                  <span class="font-bold text-purple-800 tracking-wide">Track Your Growth</span>
               </div>
               <h3 class="text-4xl font-bold text-[#0F172A] mb-6">Understand What Works</h3>
               <p class="text-slate-500 leading-relaxed text-xl">
                  Go beyond simple likes and comments. Get actionable insights on follower growth, post impressions, and engagement rates to create a feedback loop for continuous improvement.
               </p>
            </div>
            <div class="relative flex items-center justify-center">
               <div class="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-6">
                  <h4 class="font-bold text-slate-800 mb-1">Performance: Last 30 Days</h4>
                  <p class="text-xs text-slate-400 mb-6">Profile: Sarah J.</p>
                  <div class="grid grid-cols-3 gap-4 text-center">
                     <div>
                        <p class="text-xs text-slate-500 font-medium">Followers Gained</p>
                        <p class="text-3xl font-extrabold text-green-600">+128</p>
                     </div>
                     <div>
                        <p class="text-xs text-slate-500 font-medium">Post Impressions</p>
                        <p class="text-3xl font-extrabold text-slate-800">32.4k</p>
                     </div>
                     <div>
                        <p class="text-xs text-slate-500 font-medium">Engagement Rate</p>
                        <p class="text-3xl font-extrabold text-slate-800">4.1%</p>
                     </div>
                  </div>
                  <div class="mt-6 h-40 w-full">
                     <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                        <path d="M0,50 C10,40 20,20 30,15 C40,5 50,20 60,10 C70,0 80,15 90,5" fill="none" stroke="#8B5CF6" stroke-width="2.5" />
                        <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgba(139,92,246,0.2)" /><stop offset="100%" style="stop-color:rgba(139,92,246,0)" /></linearGradient></defs>
                        <path d="M0,50 C10,40 20,20 30,15 C40,5 50,20 60,10 C70,0 80,15 90,5 V50 H0 Z" fill="url(#grad1)" />
                     </svg>
                  </div>
               </div>
            </div>
          </div>
          
          <!-- Step 4: Inspire -->
          <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal relative">
            <div class="relative flex items-center justify-center md:order-2">
               <!-- Browser Frame -->
               <div class="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-3">
                  <div class="flex items-center gap-1.5 mb-3 px-1">
                     <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                     <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                     <div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <!-- Viewport for scrolling content -->
                  <div class="h-[350px] overflow-hidden relative rounded-lg bg-slate-50">
                     <div class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-50 to-transparent z-10"></div>
                     <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
                     <!-- Scrolling Content -->
                     <div class="space-y-4 animate-scroll-feed p-4">
                        @for (i of [1,2]; track i) {
                           <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0 text-xs font-bold">T</div>
                              <div>
                                 <h5 class="font-bold text-sm text-slate-800">Thought Leadership Idea</h5>
                                 <p class="text-xs text-slate-500 mt-1">"The biggest mistake in my industry is..."</p>
                              </div>
                           </div>
                           <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                              <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center shrink-0">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                              </div>
                              <div>
                                 <h5 class="font-bold text-sm text-slate-800">Carousel Concept</h5>
                                 <p class="text-xs text-slate-500 mt-1">"3 Tools I can't live without"</p>
                              </div>
                           </div>
                           <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                              <div class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              </div>
                              <div>
                                 <h5 class="font-bold text-sm text-slate-800">Controversial Question</h5>
                                 <p class="text-xs text-slate-500 mt-1">"Is the 9-to-5 officially dead?"</p>
                              </div>
                           </div>
                           <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                              <div class="w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0 text-xs font-bold">S</div>
                              <div>
                                 <h5 class="font-bold text-sm text-slate-800">Personal Story</h5>
                                 <p class="text-xs text-slate-500 mt-1">"My biggest failure and what it taught me about success."</p>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
               </div>
            </div>
            <div class="text-center md:text-left md:order-1">
               <div class="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-8">
                  <span class="w-8 h-8 rounded-full bg-green-100 text-green-700 font-extrabold text-sm flex items-center justify-center">4</span>
                  <span class="font-bold text-green-800 tracking-wide">Find Inspiration</span>
               </div>
               <h3 class="text-4xl font-bold text-[#0F172A] mb-6">Never Run Out of Ideas</h3>
               <p class="text-slate-500 leading-relaxed text-xl">
                  Explore a curated feed of top-performing content in your niche. Analyze what makes a post go viral and get inspired for your next big hit.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    @keyframes scroll-feed {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
    .animate-scroll-feed {
      animation: scroll-feed 30s linear infinite;
    }
  `]
})
export class HowItWorksComponent {
}
