
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  template: `
    <section class="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-white selection:bg-[#0065FF] selection:text-white">
      
      <!-- Clean White Background -->
      <div class="absolute inset-0 bg-white pointer-events-none"></div>

      <!-- Very Subtle Ambient Glow (Blue) -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 opacity-60"></div>

      <div class="max-w-[90rem] mx-auto relative z-10 flex flex-col items-center text-center">
            
        <!-- Content -->
        <div class="max-w-6xl flex flex-col items-center relative z-20">
            
            <!-- Headline -->
            <h1 class="font-extrabold tracking-tighter text-[#1f2937] leading-tight mb-8 animate-fade-in stagger-1">
                <span class="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-8">5x your</span>
                <div class="flex justify-center items-center gap-x-2 md:gap-x-4">
                  <span class="inline-flex items-center bg-[#E8F0FE] text-[#1967D2] px-3 py-1 md:px-6 md:py-2 rounded-full whitespace-nowrap align-middle">
                      <span class="text-2xl sm:text-3xl md:text-6xl lg:text-7xl tracking-tighter">Linkedin Growth</span>
                  </span>
                  
                  <!-- Typing Animation Container -->
                  <span class="relative inline-flex text-2xl sm:text-3xl md:text-6xl lg:text-7xl tracking-tighter text-slate-400">
                    {{ displayedText() }}<span class="animate-blink ml-1 font-light text-slate-300">|</span>
                  </span>
                </div>
            </h1>
            
            <!-- Subheadline -->
            <p class="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed animate-fade-in stagger-2 font-medium max-w-2xl mx-auto">
              PostRocket is the all-in-one workspace for top creators. Draft viral content, engage with leads, and automate growth.
            </p>

            <!-- CTA Buttons -->
            <div class="animate-fade-in stagger-3 flex flex-col sm:flex-row items-center gap-4">
              <button (click)="modalService.open()" class="h-14 px-8 md:h-16 md:px-10 rounded-2xl bg-[#0065FF] text-white font-bold text-base md:text-lg hover:bg-[#0052CC] hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center gap-3 group">
                Start for free
                <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    .stagger-1 { animation-delay: 0.1s; }
    .stagger-2 { animation-delay: 0.2s; }
    .stagger-3 { animation-delay: 0.3s; }
    
    @keyframes fadeIn {
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-blink {
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  modalService = inject(ModalService);
  
  // Typing Animation State
  words = ['effortlessly.', 'easily.', 'smarter.', 'faster.', 'automatically.'];
  displayedText = signal('');
  currentWordIndex = 0;
  isDeleting = false;
  
  // Timing configuration
  private readonly TYPING_SPEED = 100;
  private readonly DELETING_SPEED = 50;
  private readonly PAUSE_END = 2000;
  private readonly PAUSE_START = 500;
  
  private timeoutId: any;

  ngOnInit() {
    this.typeLoop();
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

  typeLoop() {
    const currentWord = this.words[this.currentWordIndex];
    const currentLength = this.displayedText().length;
    let nextSpeed = this.TYPING_SPEED;

    if (this.isDeleting) {
      this.displayedText.set(currentWord.substring(0, currentLength - 1));
      nextSpeed = this.DELETING_SPEED;
    } else {
      this.displayedText.set(currentWord.substring(0, currentLength + 1));
      nextSpeed = this.TYPING_SPEED;
    }

    if (!this.isDeleting && this.displayedText() === currentWord) {
      // Finished typing word, pause before deleting
      this.isDeleting = true;
      nextSpeed = this.PAUSE_END;
    } else if (this.isDeleting && this.displayedText() === '') {
      // Finished deleting, switch to next word
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      nextSpeed = this.PAUSE_START;
    }

    this.timeoutId = setTimeout(() => this.typeLoop(), nextSpeed);
  }
  
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
