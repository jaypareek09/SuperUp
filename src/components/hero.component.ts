
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-white">
      
      <!-- Premium Background Effects -->
      <div class="absolute top-0 left-0 right-0 h-[800px] overflow-hidden pointer-events-none select-none">
        <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-100/40 blur-[100px]"></div>
        <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-blue-50/40 blur-[100px]"></div>
        <!-- Dot Pattern -->
        <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <!-- LEFT COLUMN: Text Content -->
          <div class="flex flex-col items-start text-left max-w-2xl mx-auto lg:mx-0">
            
            <div class="badge-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-slate-600 text-sm font-semibold mb-8 reveal cursor-default hover:border-blue-200 transition-colors">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span class="tracking-wide text-[13px]">The #1 AI Operating System for LinkedIn</span>
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#0F172A] leading-[1.1] mb-6 reveal stagger-1">
              Grow your LinkedIn <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 animate-gradient-x bg-[length:200%_auto] pb-2">
                on Autopilot.
              </span>
            </h1>
            
            <p class="text-lg md:text-xl text-slate-500 mb-8 max-w-lg leading-relaxed reveal stagger-2 font-light">
              Create months of content in minutes. Schedule, engage, and analyze with the only AI that sounds <span class="text-slate-900 font-medium">exactly like you</span>.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto reveal stagger-3 mb-12">
              <button (click)="modalService.open()" class="w-full sm:w-auto px-8 py-4 bg-[#0F172A] text-white rounded-2xl font-bold text-lg hover:bg-[#1E293B] hover:scale-105 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group">
                Start Free Trial
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </button>
              
              <button class="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
                <div class="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg class="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                See demo
              </button>
            </div>
            
            <!-- Social Proof Logos (Left aligned now) -->
            <div class="reveal stagger-3 w-full border-t border-slate-100 pt-8">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Trusted by 10,000+ creators</p>
              <div class="flex flex-wrap gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                 <!-- Simple SVG Placeholders for Brands -->
                 <div class="text-sm font-bold text-slate-800 flex items-center gap-2 select-none"><div class="w-5 h-5 bg-slate-800 rounded"></div> Stripe</div>
                 <div class="text-sm font-bold text-slate-800 flex items-center gap-2 select-none"><div class="w-5 h-5 bg-slate-800 rounded-full"></div> Spotify</div>
                 <div class="text-sm font-bold text-slate-800 flex items-center gap-2 select-none"><div class="w-5 h-5 bg-slate-800 transform rotate-45"></div> Linear</div>
                 <div class="text-sm font-bold text-slate-800 flex items-center gap-2 select-none"><div class="w-5 h-5 border-2 border-slate-800 rounded-lg"></div> OpenAI</div>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: 3D Dashboard Mockup -->
          <div class="relative reveal stagger-2 perspective-1000 lg:h-[600px] flex items-center justify-center lg:justify-end">
             
             <!-- Abstract background blob behind mockup -->
             <div class="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-blue-200/50 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>

             <!-- Main Dashboard Container -->
             <div class="relative w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-blue-900/20 overflow-hidden transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out origin-center-left">
                
                <!-- Browser Chrome -->
                <div class="h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2 sticky top-0 z-10 backdrop-blur-sm">
                   <div class="flex gap-1.5">
                      <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/30"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/30"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/30"></div>
                   </div>
                   <div class="flex-1 flex justify-center px-4">
                      <div class="bg-white border border-slate-200 text-slate-400 text-[10px] py-1 px-3 rounded flex items-center gap-2 w-full max-w-[200px] justify-center shadow-sm">
                         <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                         superup.ai
                      </div>
                   </div>
                </div>

                <!-- App Interface (Simplified for Mockup) -->
                <div class="flex h-[450px] bg-[#F8FAFC] relative overflow-hidden">
                   
                   <!-- Sidebar -->
                   <div class="w-16 md:w-24 border-r border-slate-200 bg-white flex flex-col p-3 z-10">
                      <div class="w-8 h-8 bg-blue-600 rounded-lg mb-6 flex items-center justify-center text-white font-bold shrink-0">S.</div>
                      <div class="space-y-1">
                         <div class="h-8 bg-blue-50 rounded-lg w-full mb-2 border border-blue-100"></div>
                         <div class="h-8 bg-white hover:bg-slate-50 rounded-lg w-full"></div>
                         <div class="h-8 bg-white hover:bg-slate-50 rounded-lg w-full"></div>
                         <div class="h-8 bg-white hover:bg-slate-50 rounded-lg w-full"></div>
                      </div>
                      <div class="mt-auto p-2 bg-slate-50 rounded-xl border border-slate-100">
                         <div class="h-1.5 bg-slate-200 rounded-full w-full mb-2 overflow-hidden"><div class="h-full w-3/4 bg-blue-500"></div></div>
                      </div>
                   </div>

                   <!-- Main Content -->
                   <div class="flex-1 p-6 relative">
                      <!-- Mockup Header -->
                      <div class="flex justify-between items-center mb-6">
                         <div class="space-y-2">
                            <div class="h-4 w-32 bg-slate-800/10 rounded-md"></div>
                            <div class="h-3 w-20 bg-slate-200 rounded-md"></div>
                         </div>
                         <div class="h-8 w-8 bg-slate-800 rounded-full shadow-lg shadow-slate-900/10"></div>
                      </div>

                      <!-- Mockup Stats -->
                      <div class="grid grid-cols-2 gap-4 mb-6">
                         <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                            <div class="h-2 w-12 bg-slate-200 rounded"></div>
                            <div class="h-5 w-16 bg-slate-800/80 rounded"></div>
                         </div>
                         <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                            <div class="h-2 w-12 bg-slate-200 rounded"></div>
                            <div class="h-5 w-16 bg-slate-800/80 rounded"></div>
                         </div>
                      </div>

                      <!-- Mockup Graph -->
                      <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-32 w-full mb-6 relative overflow-hidden">
                          <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50 to-transparent opacity-50"></div>
                          <svg class="absolute bottom-0 left-0 right-0 h-24 w-full text-blue-500" preserveAspectRatio="none" viewBox="0 0 100 50">
                             <path d="M0 50 L0 30 Q 10 20 20 35 T 40 10 T 60 25 T 80 5 T 100 20 V 50 Z" fill="currentColor" opacity="0.1"/>
                             <path d="M0 30 Q 10 20 20 35 T 40 10 T 60 25 T 80 5 T 100 20" stroke="currentColor" stroke-width="2" fill="none"/>
                          </svg>
                      </div>
                      
                      <!-- Floating Card Overlay -->
                      <div class="absolute bottom-8 right-8 bg-white p-3 rounded-xl border border-slate-100 shadow-xl shadow-blue-900/10 w-48 animate-float-delayed">
                         <div class="flex items-center gap-2 mb-2">
                            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            <div>
                               <div class="text-[10px] font-bold text-slate-800">Viral Post!</div>
                               <div class="text-[8px] text-slate-500">Just now</div>
                            </div>
                         </div>
                         <div class="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div class="h-full w-[90%] bg-green-500"></div>
                         </div>
                      </div>

                   </div>
                </div>
             </div>

             <!-- Floating Elements Outside Browser -->
             <div class="absolute -right-4 top-1/4 bg-white p-3 rounded-lg border border-slate-100 shadow-lg animate-float-slow z-20">
                <div class="flex items-center gap-2">
                   <div class="w-2 h-2 rounded-full bg-green-500"></div>
                   <span class="text-xs font-bold text-slate-600">AI Active</span>
                </div>
             </div>
             
             <div class="absolute -left-4 bottom-1/4 bg-[#0F172A] p-3 rounded-lg shadow-lg animate-float z-20">
                <div class="flex items-center gap-2">
                   <span class="text-xs font-bold text-white">45.2k Views</span>
                   <svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .perspective-1000 {
      perspective: 1000px;
    }
    .rotate-y-12 {
       transform: rotateY(-12deg) rotateX(5deg);
    }
    .hover-rotate-0:hover {
       transform: rotateY(0) rotateX(0);
    }
    .animate-float-slow {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: float 6s ease-in-out infinite;
      animation-delay: 3s;
    }
    .animate-float {
       animation: float 5s ease-in-out infinite;
       animation-delay: 1s;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .badge-shimmer {
      position: relative;
      overflow: hidden;
    }
    .badge-shimmer::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
      transform: translateX(-100%);
      animation: shimmer 2s infinite;
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    .animate-gradient-x {
       animation: gradient-x 4s ease infinite;
    }
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `]
})
export class HeroComponent {
  modalService = inject(ModalService);
}
