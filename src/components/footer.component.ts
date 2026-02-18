import { Component } from '@angular/core';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent],
  template: `
    <footer id="footer" class="bg-[#0F172A] text-white pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- New Top Section -->
        <div class="text-center border-b border-slate-800 pb-16 mb-16">
           <h2 class="text-4xl font-bold tracking-tight mb-6">Ready to grow your brand?</h2>
           <p class="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
             Start your free 7-day trial and see why top creators choose PostRocket to build their audience on LinkedIn.
           </p>
           <button (click)="scrollTo('pricing')" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/50">
             Get Started for Free
           </button>
        </div>

        <!-- Big Brand Name -->
        <div class="text-center mb-16">
            <h1 class="text-8xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-500 to-slate-800">
                PostRocket
            </h1>
        </div>

        <div class="flex justify-center text-center mb-16">
          <div>
            <div class="flex items-center justify-center gap-3 mb-6 cursor-pointer" (click)="scrollToTop()">
               <app-logo />
               <span class="font-bold text-xl tracking-tight text-white">PostRocket</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
              The AI operating system for LinkedIn. We help you write, schedule, and analyze your content 10x faster.
            </p>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-start items-start gap-4">
           <div class="flex flex-col gap-3">
             <p class="text-xs text-slate-500">Copyright © 2026 PostRocket. All rights reserved.</p>
             <p class="text-[10px] text-slate-600 max-w-lg leading-relaxed">
               Disclaimer: PostRocket is not endorsed by or affiliated with the LinkedIn Corporation, registered in the U.S. and other countries. LinkedIn is a trademark of the LinkedIn Corporation.
             </p>
           </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
