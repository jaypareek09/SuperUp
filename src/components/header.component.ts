
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50">
      <div class="glass-nav transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 h-16 relative flex items-center justify-between">
          
          <!-- Logo (Left) -->
          <div class="flex items-center gap-3 cursor-pointer group z-20" (click)="scrollToTop()">
            <app-logo />
            <span class="font-bold text-xl tracking-tight text-slate-900">PostRocket</span>
          </div>

          <!-- Desktop Nav (Absolute Center) -->
          <div class="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            <nav class="pointer-events-auto flex items-center gap-8 text-[15px] font-medium text-slate-600 bg-white/50 px-6 py-2 rounded-full border border-slate-200/50 backdrop-blur-sm shadow-sm">
              <a (click)="scrollTo('features')" class="cursor-pointer hover:text-[#0065FF] transition-colors">Features</a>
              <a (click)="scrollTo('how-it-works')" class="cursor-pointer hover:text-[#0065FF] transition-colors">How it works</a>
              <a (click)="scrollTo('pricing')" class="cursor-pointer hover:text-[#0065FF] transition-colors">Pricing</a>
              <a (click)="scrollTo('footer')" class="cursor-pointer hover:text-[#0065FF] transition-colors">Resources</a>
            </nav>
          </div>

          <!-- Buttons (Right) -->
          <div class="flex items-center gap-3 z-20">
             <button (click)="modalService.open()" class="hidden md:block text-[14px] font-medium text-slate-600 hover:text-[#0F172A] transition-colors">
               Log in
             </button>
             <button (click)="modalService.open()" class="bg-[#0065FF] text-white px-4 py-2 rounded-lg text-[14px] font-semibold hover:bg-[#0052CC] transition-all shadow-sm">
               Get Started
             </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  modalService = inject(ModalService);

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