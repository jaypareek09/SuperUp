import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { GeminiService } from '../../services/gemini.service';
import { AuthService } from '../../services/auth.service';

// Declare html2canvas
declare var html2canvas: any;

@Component({
  selector: 'app-carousel-maker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col h-[calc(100vh-4rem)] bg-[#F8FAFC]">
       
       <!-- Toolbar -->
       <div class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 h-16 shadow-sm z-20 relative">
          <div class="flex items-center gap-6">
             <h2 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                Carousel Maker
             </h2>
             <div class="h-6 w-px bg-slate-200"></div>
             <!-- Templates -->
             <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wide mr-2">Style:</span>
                <button (click)="applyTemplate('minimal')" class="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">Minimal</button>
                <button (click)="applyTemplate('bold')" class="px-3 py-1.5 text-xs font-bold rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30">Bold</button>
                <button (click)="applyTemplate('dark')" class="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-800 bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm">Dark</button>
             </div>
          </div>
          
          <div class="flex gap-3">
             <button (click)="saveDraft()" class="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200">Save Draft</button>
             <button (click)="openSchedule()" class="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                 Schedule
             </button>
          </div>
       </div>

       <div class="flex flex-1 overflow-hidden">
          
          <!-- LEFT SIDEBAR: Slide Management -->
          <div class="w-[400px] bg-white border-r border-slate-200 flex flex-col overflow-hidden shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
             
             <!-- Navigation Tabs -->
             <div class="flex border-b border-slate-100 p-1 bg-slate-50/50">
                <button (click)="activeTab.set('content')" [class.bg-white]="activeTab() === 'content'" [class.shadow-sm]="activeTab() === 'content'" [class.text-blue-600]="activeTab() === 'content'" class="flex-1 py-2 text-sm font-bold text-slate-500 rounded-md transition-all">Content</button>
                <button (click)="activeTab.set('design')" [class.bg-white]="activeTab() === 'design'" [class.shadow-sm]="activeTab() === 'design'" [class.text-blue-600]="activeTab() === 'design'" class="flex-1 py-2 text-sm font-bold text-slate-500 rounded-md transition-all">Design & Profile</button>
             </div>

             <div class="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#FAFAFA]">
                
                @if (activeTab() === 'content') {
                   <!-- AI Generator -->
                   <div class="mb-6 bg-white p-4 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden group">
                      <div class="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      <div class="relative z-10">
                          <label class="text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
                             <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                             AI Magic Generator
                          </label>
                          <textarea [(ngModel)]="topic" (keyup.enter)="generateSlides()" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm mb-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none font-medium text-slate-700" placeholder="e.g. 5 ways to improve productivity..."></textarea>
                          <button (click)="generateSlides()" [disabled]="isLoading()" class="w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
                             {{ isLoading() ? 'Generating...' : 'Generate Slides' }}
                             <svg *ngIf="!isLoading()" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          </button>
                      </div>
                   </div>

                   <!-- Slides List -->
                   <div class="space-y-3 pb-10">
                      <div class="flex justify-between items-center px-1 mb-2">
                          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Slides ({{ slides().length }})</span>
                      </div>

                      @if (slides().length === 0) {
                        <div class="text-center py-8 text-slate-400 text-sm">
                            <p>No slides yet. Generate with AI or add manually.</p>
                        </div>
                      }

                      @for (slide of slides(); track $index) {
                         <div class="bg-white p-4 rounded-xl border shadow-sm relative group cursor-pointer transition-all hover:shadow-md" 
                              [class.border-blue-500]="activeSlideIndex() === $index"
                              [class.ring-2]="activeSlideIndex() === $index"
                              [class.ring-blue-100]="activeSlideIndex() === $index"
                              [class.border-slate-200]="activeSlideIndex() !== $index"
                              (click)="activeSlideIndex.set($index)"
                         >
                            <div class="flex items-center gap-3 mb-3">
                               <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" 
                                     [class.bg-blue-100]="activeSlideIndex() === $index" 
                                     [class.text-blue-700]="activeSlideIndex() === $index"
                                     [class.bg-slate-100]="activeSlideIndex() !== $index"
                                     [class.text-slate-500]="activeSlideIndex() !== $index"
                               >
                                  {{ $index + 1 }}
                               </span>
                               <span class="text-xs font-bold text-slate-400 uppercase tracking-wide flex-1">Slide Content</span>
                               <button (click)="removeSlide($index); $event.stopPropagation()" class="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded">
                                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                               </button>
                            </div>
                            
                            <input [(ngModel)]="slide.title" class="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-blue-300 rounded px-2 py-1.5 font-bold text-slate-800 text-sm mb-2 outline-none transition-colors" placeholder="Headline">
                            <textarea [(ngModel)]="slide.body" rows="3" class="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-blue-300 rounded px-2 py-1.5 text-xs text-slate-600 outline-none resize-none leading-relaxed" placeholder="Body text..."></textarea>
                         </div>
                      }
                      
                      <button (click)="addSlide()" class="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
                         <div class="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-blue-200 flex items-center justify-center transition-colors text-white font-bold text-lg">+</div>
                         Add New Slide
                      </button>
                   </div>
                } 
                
                @else {
                   <!-- Design & Profile Settings -->
                   <div class="space-y-6 animate-fade-in">
                      
                      <!-- Profile Section -->
                      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                         <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Profile Info</h3>
                         <div class="space-y-4">
                            <div>
                               <label class="block text-xs font-bold text-slate-700 mb-1">Name</label>
                               <input [(ngModel)]="authorName" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all">
                            </div>
                            <div>
                               <label class="block text-xs font-bold text-slate-700 mb-1">Handle</label>
                               <input [(ngModel)]="authorHandle" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all">
                            </div>
                            <div>
                               <label class="block text-xs font-bold text-slate-700 mb-1">Photo</label>
                               <div class="flex gap-3 items-center">
                                  <img [src]="authorAvatar()" class="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0">
                                  <div class="relative overflow-hidden">
                                      <button class="bg-white border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Change Photo</button>
                                      <input type="file" (change)="onAvatarUpload($event)" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer">
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      <!-- Colors Section -->
                      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                         <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Theme Colors</h3>
                         <div class="space-y-4">
                            <div class="flex items-center justify-between">
                               <label class="text-sm font-bold text-slate-700">Background</label>
                               <div class="flex items-center gap-2">
                                  <input type="color" [ngModel]="backgroundColor()" (ngModelChange)="backgroundColor.set($event)" class="w-8 h-8 rounded cursor-pointer border-0 p-0">
                                  <span class="text-xs font-mono text-slate-400">{{ backgroundColor() }}</span>
                               </div>
                            </div>
                            <div class="flex items-center justify-between">
                               <label class="text-sm font-bold text-slate-700">Text</label>
                               <div class="flex items-center gap-2">
                                  <input type="color" [ngModel]="textColor()" (ngModelChange)="textColor.set($event)" class="w-8 h-8 rounded cursor-pointer border-0 p-0">
                                  <span class="text-xs font-mono text-slate-400">{{ textColor() }}</span>
                               </div>
                            </div>
                            <div class="flex items-center justify-between">
                               <label class="text-sm font-bold text-slate-700">Accent</label>
                               <div class="flex items-center gap-2">
                                  <input type="color" [ngModel]="accentColor()" (ngModelChange)="accentColor.set($event)" class="w-8 h-8 rounded cursor-pointer border-0 p-0">
                                  <span class="text-xs font-mono text-slate-400">{{ accentColor() }}</span>
                               </div>
                            </div>
                         </div>
                      </div>

                   </div>
                }

             </div>
          </div>

          <!-- MAIN PREVIEW AREA -->
          <div class="flex-1 bg-slate-100 relative overflow-hidden flex flex-col items-center justify-center">
             <!-- Dot Pattern Background -->
             <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;"></div>
             
             <!-- Preview Header -->
             <div class="absolute top-6 z-10 bg-white/90 backdrop-blur border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                <span class="text-xs font-bold text-slate-500">Live Preview • {{ slides().length }} Slides</span>
             </div>

             <!-- Scrollable Preview Area -->
             <div class="w-full overflow-x-auto overflow-y-hidden custom-scrollbar flex items-center px-12 gap-8 snap-x snap-mandatory py-12">
                
                @if (slides().length === 0) {
                     <div class="flex flex-col items-center justify-center text-slate-400">
                        <div class="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <p>No slides to preview</p>
                     </div>
                }

                @for (slide of slides(); track $index) {
                   <!-- Single Slide Preview Card -->
                   <div [id]="'slide-' + $index"
                        class="w-[360px] aspect-[4/5] shadow-xl rounded-none shrink-0 flex flex-col relative transition-all duration-300 snap-center cursor-pointer group bg-white"
                        [style.background-color]="backgroundColor()"
                        [style.color]="textColor()"
                        [class.ring-4]="activeSlideIndex() === $index"
                        [class.ring-blue-500]="activeSlideIndex() === $index"
                        [class.scale-105]="activeSlideIndex() === $index"
                        [class.opacity-50]="activeSlideIndex() !== $index && activeSlideIndex() !== -1"
                        [class.hover:opacity-100]="activeSlideIndex() !== $index"
                        (click)="activeSlideIndex.set($index); activeTab.set('content')"
                   >
                      <!-- Download Button -->
                       <div class="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity ignore-on-download">
                         <button (click)="downloadSlide($index); $event.stopPropagation()" class="bg-white text-slate-800 p-2 rounded-full shadow-lg border border-slate-100 hover:scale-110 transition-transform">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                         </button>
                       </div>

                      <!-- Slide Content -->
                      <div class="flex-1 p-8 flex flex-col">
                          <!-- Author Header -->
                          <div class="flex items-center gap-3 mb-8">
                             <img [src]="authorAvatar()" class="w-10 h-10 rounded-full border-2 border-white/20 shadow-sm object-cover">
                             <div>
                                <div class="font-bold text-sm leading-tight">{{ authorName() }}</div>
                                <div class="text-[10px] opacity-70 uppercase tracking-wide font-bold">{{ authorHandle() }}</div>
                             </div>
                          </div>

                          <!-- Body -->
                          <div class="flex-1 flex flex-col justify-center">
                             <h2 class="text-3xl font-extrabold mb-4 leading-tight" [style.color]="activeSlideIndex() === $index ? accentColor() : 'inherit'">{{ slide.title }}</h2>
                             <p class="text-lg opacity-90 leading-relaxed font-medium whitespace-pre-wrap">{{ slide.body }}</p>
                          </div>

                          <!-- Footer -->
                          <div class="pt-8 flex justify-end items-center opacity-50 border-t border-current/10 mt-auto">
                             <div class="text-xs font-bold">{{ $index + 1 }} / {{ slides().length }}</div>
                          </div>
                      </div>
                   </div>
                }
                
                @if (slides().length > 0) {
                    <!-- Add Slide Action Card -->
                    <div (click)="addSlide()" class="w-[360px] aspect-[4/5] rounded-xl border-4 border-dashed border-slate-300 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer shrink-0 group">
                       <div class="w-16 h-16 rounded-full bg-slate-200 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
                       </div>
                       <span class="font-bold text-lg">Add New Page</span>
                    </div>
                }

             </div>
          </div>

       </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { height: 12px; width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 6px; border: 3px solid transparent; background-clip: content-box; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94A3B8; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class CarouselMakerComponent {
  // Content Signals
  topic = '';
  // START EMPTY
  slides = signal<{title: string, body: string}[]>([]);
  
  // State Signals
  activeTab = signal<'content' | 'design'>('content');
  activeSlideIndex = signal(0);
  isLoading = signal(false);

  // Design & Profile Signals
  authorName = signal('');
  authorHandle = signal('');
  authorAvatar = signal('');
  
  backgroundColor = signal('#ffffff');
  textColor = signal('#0F172A');
  accentColor = signal('#2563EB');

  store = inject(StoreService);
  gemini = inject(GeminiService);
  authService = inject(AuthService);

  constructor() {
    const user = this.authService.currentUser();
    if (user) {
       this.authorName.set(user.name);
       this.authorHandle.set('@' + user.name.replace(/\s/g, '').toLowerCase());
       const seed = user.name.replace(/\s/g, '');
       this.authorAvatar.set(`https://picsum.photos/seed/${seed}/100/100`);
    }

    effect(() => {
      const draft = this.store.activeDraft();
      if (draft && draft.type === 'carousel' && draft.slides) {
        this.slides.set(draft.slides);
      }
    });
  }

  // --- Actions ---

  onAvatarUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.authorAvatar.set(e.target?.result as string);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async downloadSlide(index: number) {
    const element = document.getElementById(`slide-${index}`);
    if (!element) return;
    
    this.store.triggerNotification('Processing', 'Generating high-quality image...');

    try {
        const canvas = await html2canvas(element, { 
            scale: 2,
            useCORS: true, 
            allowTaint: true,
            ignoreElements: (el: Element) => el.classList.contains('ignore-on-download')
        });
        
        const link = document.createElement('a');
        link.download = `slide-${index + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        this.store.triggerNotification('Success', 'Slide downloaded successfully!');
    } catch (e) {
        console.error(e);
        this.store.triggerNotification('Error', 'Failed to generate image.');
    }
  }

  applyTemplate(type: 'minimal' | 'bold' | 'dark') {
      switch(type) {
          case 'minimal':
              this.backgroundColor.set('#ffffff');
              this.textColor.set('#0F172A');
              this.accentColor.set('#2563EB');
              break;
          case 'bold':
              this.backgroundColor.set('#2563EB');
              this.textColor.set('#ffffff');
              this.accentColor.set('#FCD34D');
              break;
          case 'dark':
              this.backgroundColor.set('#0F172A');
              this.textColor.set('#ffffff');
              this.accentColor.set('#38BDF8');
              break;
      }
  }

  async generateSlides() {
    if (!this.topic) return;
    this.isLoading.set(true);
    const result = await this.gemini.generateCarousel(this.topic);
    if (result && result.length > 0) {
       this.slides.set(result);
       this.activeSlideIndex.set(0);
       this.activeTab.set('content');
    }
    this.isLoading.set(false);
  }

  addSlide() {
    this.slides.update(s => [...s, { title: 'New Slide', body: 'Add your content here.' }]);
    setTimeout(() => this.activeSlideIndex.set(this.slides().length - 1), 100);
  }

  removeSlide(index: number) {
    if (this.slides().length <= 1) return;
    this.slides.update(s => s.filter((_, i) => i !== index));
    if (this.activeSlideIndex() >= this.slides().length) {
        this.activeSlideIndex.set(this.slides().length - 1);
    }
  }

  saveDraft() {
    this.store.saveDraft({
       type: 'carousel',
       content: this.slides()[0].title + "...", 
       slides: this.slides(),
    });
    this.store.triggerNotification('Success', 'Carousel saved to drafts!');
  }

  openSchedule() {
    // Placeholder for schedule logic
    this.store.triggerNotification('Info', 'Scheduling feature coming soon.');
  }
}