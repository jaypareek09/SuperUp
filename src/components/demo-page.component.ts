import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';
import { LogoComponent } from './logo.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [CommonModule, LogoComponent, FooterComponent],
  template: `
    <div class="bg-white min-h-screen font-sans">
      <header class="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div class="flex items-center gap-3 cursor-pointer" (click)="navigationService.navigateTo('landing')">
            <app-logo />
            <span class="font-bold text-xl tracking-tight text-slate-900">PostRocket</span>
          </div>
          <button (click)="navigationService.navigateTo('landing')" class="bg-[#0065FF] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:bg-[#0052CC] transition-all shadow-sm flex items-center gap-2">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
             Back to Home
          </button>
        </nav>
      </header>

      <main class="py-24 sm:py-32 px-6">
        <div class="max-w-5xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter leading-tight">
            See PostRocket in Action
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
            Watch this 2-minute demo to see how our AI-powered tools can help you create, schedule, and analyze your LinkedIn content 10x faster.
          </p>
        </div>

        <div class="max-w-5xl mx-auto mt-16">
          <div class="aspect-video bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden border-4 border-slate-200 ring-4 ring-slate-100">
            <iframe 
              class="w-full h-full" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0&controls=1" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class DemoPageComponent {
  navigationService = inject(NavigationService);
}
