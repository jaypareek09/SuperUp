
import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="features" class="bg-white py-24 sm:py-32 px-6 scroll-mt-24">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left reveal">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The easiest way to grow on LinkedIn.</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">PostRocket is an intelligent workspace that goes beyond basic tools. We help you write better, publish smarter, and understand what actually works.</p>
        </div>
        <!-- Grid -->
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          <!-- Card 1: AI Writing -->
          <div class="bg-blue-600 text-white p-8 rounded-3xl reveal stagger-1 flex flex-col">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-blue-200">AI-POWERED WRITING</h3>
            <p class="mt-4 text-2xl font-bold">Write like a thought leader.</p>
            <div class="mt-8 bg-white/10 p-4 rounded-xl ring-1 ring-inset ring-white/20 flex-1 flex flex-col">
              <!-- Dynamic Content Area -->
              <div class="bg-blue-700/50 rounded-lg p-3 text-sm flex-1 text-blue-100/90 whitespace-pre-wrap font-mono text-xs leading-relaxed min-h-[140px] transition-all duration-300" 
                   [innerHTML]="currentText()">
              </div>
              
              <div class="mt-2 pt-2 border-t border-white/10 space-y-2">
                <p class="text-xs font-bold text-blue-200/80">AI Suggestions:</p>
                <div class="flex gap-2">
                   <button (click)="setMode('punchier')" 
                           class="text-[11px] font-semibold px-2 py-1 rounded-md transition-all duration-200"
                           [class]="activeMode() === 'punchier' ? 'bg-white text-blue-600 shadow-sm transform scale-105' : 'bg-white/10 text-white hover:bg-white/20'">
                      Make it punchier
                   </button>
                   <button (click)="setMode('story')" 
                           class="text-[11px] font-semibold px-2 py-1 rounded-md transition-all duration-200"
                           [class]="activeMode() === 'story' ? 'bg-white text-blue-600 shadow-sm transform scale-105' : 'bg-white/10 text-white hover:bg-white/20'">
                      Add a story
                   </button>
                   <button (click)="setMode('hooks')" 
                           class="text-[11px] font-semibold px-2 py-1 rounded-md transition-all duration-200"
                           [class]="activeMode() === 'hooks' ? 'bg-white text-blue-600 shadow-sm transform scale-105' : 'bg-white/10 text-white hover:bg-white/20'">
                      Generate 3 hooks
                   </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Smart Scheduling (iOS Style) -->
          <div class="bg-yellow-300 text-gray-900 p-8 rounded-3xl reveal stagger-2 flex flex-col relative overflow-hidden group">
            <!-- Background Decoration -->
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
            
            <h3 class="text-sm font-semibold uppercase tracking-wide text-yellow-800/80 relative z-10">SMART SCHEDULING</h3>
            <p class="mt-4 text-2xl font-bold relative z-10">Find your viral windows.</p>
            
            <!-- iOS Calendar / Scheduler UI -->
            <div class="mt-8 mx-auto w-full max-w-[280px] bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-5 ring-1 ring-black/5 flex flex-col items-center relative z-10 font-sans transition-transform hover:scale-[1.02] duration-300">
               
               <!-- Month Nav -->
               <div class="w-full flex justify-between items-center mb-4 px-1">
                  <span class="text-lg font-bold text-slate-900 tracking-tight">May 2026</span>
                  <div class="flex gap-4 text-blue-600">
                     <svg class="w-5 h-5 cursor-pointer hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                     <svg class="w-5 h-5 cursor-pointer hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </div>
               </div>

               <!-- Calendar Grid -->
               <div class="w-full grid grid-cols-7 gap-y-3 mb-6 text-center text-[11px] font-semibold text-slate-400">
                  <span class="uppercase tracking-widest">S</span><span class="uppercase tracking-widest">M</span><span class="uppercase tracking-widest">T</span><span class="uppercase tracking-widest">W</span><span class="uppercase tracking-widest">T</span><span class="uppercase tracking-widest">F</span><span class="uppercase tracking-widest">S</span>
                  
                  <!-- Dates -->
                  <!-- Row 1 -->
                  <span class="text-slate-300 font-medium">28</span><span class="text-slate-300 font-medium">29</span><span class="text-slate-300 font-medium">30</span>
                  <span class="text-slate-800 font-medium">1</span><span class="text-slate-800 font-medium">2</span><span class="text-slate-800 font-medium">3</span><span class="text-slate-800 font-medium">4</span>
                  
                  <!-- Row 2 -->
                  <span class="text-slate-800 font-medium">5</span><span class="text-slate-800 font-medium">6</span>
                  <span class="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded-full mx-auto shadow-md shadow-blue-500/30 font-bold">7</span>
                  <span class="text-slate-800 font-medium">8</span><span class="text-slate-800 font-medium">9</span><span class="text-slate-800 font-medium">10</span><span class="text-slate-800 font-medium">11</span>
                  
                  <!-- Row 3 -->
                  <span class="text-slate-800 font-medium">12</span><span class="text-slate-800 font-medium">13</span><span class="text-slate-800 font-medium">14</span><span class="text-slate-800 font-medium">15</span><span class="text-slate-800 font-medium">16</span><span class="text-slate-800 font-medium">17</span><span class="text-slate-800 font-medium">18</span>
               </div>

               <!-- Divider -->
               <div class="w-full h-px bg-slate-100 mb-4"></div>

               <!-- Time Picker Scroll (Simulated iOS Wheel) -->
               <div class="w-full h-24 bg-slate-50 rounded-2xl relative overflow-hidden flex items-center justify-center mb-0 shadow-inner">
                  <!-- Selection Highlight -->
                  <div class="absolute w-[85%] h-8 bg-white rounded-lg shadow-sm border border-slate-200 z-10 pointer-events-none"></div>
                  
                  <div class="flex w-full px-4 gap-0 z-20 relative">
                     <!-- Hours -->
                     <div class="flex-1 flex flex-col items-center gap-1.5 text-lg font-medium text-slate-300">
                        <span class="scale-90 opacity-40">08</span>
                        <span class="text-slate-900 font-bold text-xl scale-110 my-0.5">09</span>
                        <span class="scale-90 opacity-40">10</span>
                     </div>
                     <!-- Separator -->
                     <div class="text-slate-400 font-bold text-xl pt-2 pb-2 flex items-center">:</div>
                     <!-- Minutes -->
                     <div class="flex-1 flex flex-col items-center gap-1.5 text-lg font-medium text-slate-300">
                        <span class="scale-90 opacity-40">15</span>
                        <span class="text-slate-900 font-bold text-xl scale-110 my-0.5">30</span>
                        <span class="scale-90 opacity-40">45</span>
                     </div>
                     <!-- AM/PM -->
                     <div class="flex-1 flex flex-col items-center gap-1.5 text-sm font-bold text-slate-300">
                        <span class="text-slate-900 text-base scale-110 my-0.5">AM</span>
                        <span class="scale-90 opacity-40">PM</span>
                     </div>
                  </div>
                  
                  <!-- Gradients for depth -->
                  <div class="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-slate-50 to-transparent z-20 pointer-events-none"></div>
                  <div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none"></div>
               </div>
               
               <!-- AI Badge Overlay -->
               <div class="absolute -right-6 top-[45%] bg-white/95 backdrop-blur shadow-xl border border-yellow-100 rounded-xl p-2.5 flex items-center gap-2 animate-bounce-slow max-w-[140px] z-30 ring-1 ring-black/5">
                  <div class="bg-yellow-100 p-1.5 rounded-lg text-yellow-600 shrink-0">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>
                  </div>
                  <div class="text-[10px] font-bold text-slate-700 leading-tight">
                    Predicted Viral<br>Window detected
                  </div>
               </div>

            </div>
          </div>

          <!-- Card 3: Actionable Analytics (NEW CLEAN THEME) -->
          <div class="bg-slate-50 text-slate-900 p-8 rounded-3xl reveal stagger-3 flex flex-col relative overflow-hidden border border-slate-100">
            <div class="flex justify-between items-start z-10">
              <div>
                <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">ACTIONABLE ANALYTICS</h3>
                <p class="mt-4 text-2xl font-bold text-slate-900">Get insights, not just data.</p>
              </div>
               <div class="bg-white text-xs font-semibold text-slate-600 px-3 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1 cursor-pointer">
                  Last 30 days
                  <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
            </div>
            
            <div class="mt-8 bg-white p-4 rounded-xl border border-slate-200 flex-1 flex flex-col justify-between z-10">
              
              <!-- Top Metrics -->
              <div class="flex gap-4 mb-4">
                <div class="flex-1 bg-slate-100/70 p-3 rounded-lg">
                  <div class="text-xs text-slate-500">Impressions</div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-lg font-bold text-slate-800">15.2k</span>
                    <span class="text-xs font-bold text-green-600">+12%</span>
                  </div>
                </div>
                <div class="flex-1 bg-slate-100/70 p-3 rounded-lg">
                  <div class="text-xs text-slate-500">Profile Views</div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-lg font-bold text-slate-800">1.1k</span>
                    <span class="text-xs font-bold text-green-600">+8%</span>
                  </div>
                </div>
              </div>

              <!-- Line Chart SVG -->
              <div class="relative h-24 w-full">
                <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <defs>
                    <linearGradient id="chartGradientPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.3"/>
                      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,40 C10,10 20,35 30,20 C40,5 50,30 60,15 C70,0 80,25 90,10 C100, -5 100,50 100,50 L0,50 Z" fill="url(#chartGradientPurple)"/>
                  <path d="M0,40 C10,10 20,35 30,20 C40,5 50,30 60,15 C70,0 80,25 90,10" fill="none" stroke="#8B5CF6" stroke-width="1.5"/>
                </svg>
              </div>

              <!-- Insight Card -->
              <div class="mt-4 bg-purple-50 p-3 rounded-lg border border-purple-200">
                 <p class="text-xs font-bold text-purple-800 mb-1 flex items-center gap-1.5">
                    <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    AI Insight
                 </p>
                 <p class="text-sm font-medium text-purple-900 leading-snug">
                   Posts between <span class="font-bold">8-10 AM</span> on Tuesdays get <span class="font-bold text-purple-700">30% higher reach.</span>
                 </p>
              </div>
            </div>
          </div>

          <!-- Card 4: Carousel Maker (IMPROVED - GREY THEME WITH ACTUAL CAROUSEL) -->
          <div class="bg-slate-700 text-white p-8 rounded-3xl reveal stagger-3 flex flex-col overflow-hidden relative min-h-[400px]">
             <!-- Abstract Shapes -->
             <div class="absolute top-0 right-0 p-32 bg-slate-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
             <div class="absolute bottom-0 left-0 p-24 bg-slate-900 rounded-full blur-2xl opacity-20 -ml-12 -mb-12 pointer-events-none"></div>
             
             <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-200 relative z-10">CAROUSEL MAKER</h3>
             <p class="mt-4 text-2xl font-bold relative z-10 mb-8">Turn text into slides instantly.</p>
             
             <!-- The Carousel Visual -->
             <div class="relative z-10 w-full flex-1 flex items-center justify-center perspective-1000">
                <!-- Container for slides -->
                <div class="relative w-[220px] h-[280px]">
                   
                    @for (slide of demoSlides; track $index) {
                       <div class="absolute inset-0 bg-white text-slate-900 rounded-xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border border-slate-200 flex flex-col overflow-hidden origin-bottom cursor-pointer"
                            [style.transform]="getSlideTransform($index)"
                            [style.opacity]="getSlideOpacity($index)"
                            [style.zIndex]="getSlideZIndex($index)"
                            (click)="activeSlide.set($index)">
                            
                            <!-- Slide Header -->
                            <div class="p-4 flex items-center gap-2">
                               <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shrink-0"></div>
                               <div class="flex-1 min-w-0">
                                  <div class="h-1.5 w-12 bg-slate-800 rounded mb-1"></div>
                                  <div class="h-1 w-8 bg-slate-300 rounded"></div>
                               </div>
                            </div>

                            <!-- Slide Body -->
                            <div class="flex-1 px-4 flex flex-col justify-center">
                                @if ($index === 0) {
                                   <h4 class="text-xl font-extrabold leading-tight text-slate-900">
                                      The <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Golden Rule</span> of Marketing.
                                   </h4>
                                   <div class="mt-3 h-1 w-12 bg-slate-900"></div>
                                } @else if ($index === 1) {
                                   <div class="space-y-3">
                                      <div class="flex gap-2 items-center">
                                         <div class="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
                                         <div class="h-2 w-24 bg-slate-200 rounded"></div>
                                      </div>
                                      <div class="flex gap-2 items-center">
                                         <div class="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
                                         <div class="h-2 w-20 bg-slate-200 rounded"></div>
                                      </div>
                                      <div class="flex gap-2 items-center">
                                         <div class="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
                                         <div class="h-2 w-28 bg-slate-200 rounded"></div>
                                      </div>
                                   </div>
                                } @else if ($index === 2) {
                                   <div class="text-center">
                                      <div class="text-5xl font-black text-slate-900 mb-2">3X</div>
                                      <div class="text-xs font-bold uppercase tracking-widest text-slate-500">Engagement</div>
                                   </div>
                                }
                            </div>
                            
                            <!-- Slide Footer -->
                            <div class="p-3 border-t border-slate-100 flex justify-between items-center bg-slate-50">
                               <div class="text-[8px] font-bold text-slate-400">@postrocket</div>
                               <div class="text-[8px] font-bold text-slate-400">{{ $index + 1 }}/3</div>
                            </div>
                       </div>
                    }
                </div>
             </div>
             
             <!-- Navigation Dots -->
             <div class="flex justify-center gap-2 mt-6 relative z-10">
                @for (slide of demoSlides; track $index) {
                   <button (click)="activeSlide.set($index)" 
                           class="w-2 h-2 rounded-full transition-all duration-300 hover:bg-white"
                           [class.bg-white]="activeSlide() === $index"
                           [class.w-6]="activeSlide() === $index"
                           [class.bg-slate-500]="activeSlide() !== $index">
                   </button>
                }
             </div>
             
             <!-- Auto-gen Badge -->
             <div class="mt-4 flex justify-center relative z-10">
                 <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-slate-200 border border-white/20 shadow-sm">
                    <svg class="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Autogenerated Layouts
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-bounce-slow {
       animation: bounce-slow 3s infinite ease-in-out;
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  `]
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  activeMode = signal<'original' | 'punchier' | 'story' | 'hooks'>('original');

  // Carousel Logic
  demoSlides = [0, 1, 2];
  activeSlide = signal(0);
  intervalId: any;

  ngOnInit() {
    // Auto-rotate the carousel
    this.intervalId = setInterval(() => {
      this.activeSlide.update(current => (current + 1) % this.demoSlides.length);
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  getSlideTransform(index: number): string {
    const active = this.activeSlide();
    const len = this.demoSlides.length;
    
    // Calculate relative position (0 = active, 1 = next, etc.)
    let offset = (index - active + len) % len;
    
    // Active slide
    if (offset === 0) {
       return 'translateX(0) scale(1) rotate(0deg)';
    }
    
    // Next slides stack behind with offset
    return `translateX(${offset * 12}px) translateY(${offset * -4}px) scale(${1 - (offset * 0.05)}) rotate(${offset * 2}deg)`;
  }
  
  getSlideZIndex(index: number): number {
     const active = this.activeSlide();
     const len = this.demoSlides.length;
     let offset = (index - active + len) % len;
     return 10 - offset;
  }
  
  getSlideOpacity(index: number): number {
      const active = this.activeSlide();
      const len = this.demoSlides.length;
      let offset = (index - active + len) % len;
      return offset === 0 ? 1 : Math.max(0.5, 1 - (offset * 0.2));
  }

  texts = {
    original: `I failed my first startup.

It's not easy to admit. But the lessons wereworth more than any success. <span class="bg-blue-400/50 rounded p-1 text-white">Mistakes are just data.</span>

What's a failure that taught you something valuable?`,
    
    punchier: `I lost $50k in 3 months.

My first startup failed fast. It hurt.

But here is the truth:
<span class="bg-blue-400/50 rounded p-1 text-white">Failure is the tuition you pay for success.</span>

Who else learned the hard way?`,
    
    story: `I remember sitting in my empty office on a rainy Tuesday.

The bank account read $0.00. I had failed.

My mentor told me: "You didn't lose money. You bought an education."

That perspective shifted everything. <span class="bg-blue-400/50 rounded p-1 text-white">Your mindset determines your outcome.</span>`,
    
    hooks: `1. Stop fearing failure. Start fearing regret.

2. How I lost everything and gained myself back.

3. <span class="bg-blue-400/50 rounded p-1 text-white">Why your first business should fail.</span>`
  };

  currentText = computed(() => this.texts[this.activeMode()]);

  setMode(mode: 'original' | 'punchier' | 'story' | 'hooks') {
    if (this.activeMode() === mode) {
       this.activeMode.set('original');
    } else {
       this.activeMode.set(mode);
    }
  }
}