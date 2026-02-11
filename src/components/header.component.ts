
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50">
      <div class="glass-nav transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <!-- Logo (Text Only) -->
          <div class="flex items-center gap-2 cursor-pointer group">
            <span class="text-2xl font-extrabold tracking-tight text-[#0F172A]">SuperUp.</span>
          </div>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-10 text-[15px] font-medium text-slate-500">
            <a href="#" class="hover:text-[#1E3A8A] transition-colors">Features</a>
            <a href="#" class="hover:text-[#1E3A8A] transition-colors">How it works</a>
            <a href="#" class="hover:text-[#1E3A8A] transition-colors">Pricing</a>
            <a href="#" class="hover:text-[#1E3A8A] transition-colors">Resources</a>
          </nav>

          <!-- Buttons -->
          <div class="flex items-center gap-4">
             <button (click)="modalService.open()" class="hidden md:block text-[14px] font-semibold text-slate-600 hover:text-[#0F172A] transition-colors">
               Log in
             </button>
             <button (click)="modalService.open()" class="bg-[#0F172A] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:bg-[#1E3A8A] transition-all hover:translate-y-px shadow-lg shadow-blue-900/10">
               Start for free
             </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  modalService = inject(ModalService);
}
