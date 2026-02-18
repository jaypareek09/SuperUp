
import { Component, inject, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-new-post-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <!-- Backdrop -->
       <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" (click)="close()"></div>
       
       <!-- Modal -->
       <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in p-0 border border-slate-100">
          
          <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <div>
               <h2 class="text-lg font-bold text-slate-900">Create New Post</h2>
               <p class="text-xs text-slate-500 mt-1">Name your post to organize it in your library.</p>
             </div>
             <button (click)="close()" class="text-slate-400 hover:text-slate-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
          </div>
          
          <div class="p-6 space-y-6">
             <!-- Name Input -->
             <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Post Name</label>
                <input 
                    #titleInput 
                    [(ngModel)]="title" 
                    (keyup.enter)="title && create()" 
                    class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400" 
                    placeholder="e.g. 5 Tips for LinkedIn Growth..." 
                >
             </div>

             <!-- Type Selection -->
             <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Format</label>
                <div class="grid grid-cols-2 gap-3">
                    <button (click)="type = 'text'" [class]="type === 'text' ? 'border-blue-500 bg-blue-50/50 text-blue-700 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'" class="border rounded-xl p-3 flex flex-col items-center gap-2 transition-all relative group">
                        @if(type === 'text') { <div class="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div> }
                        <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </div>
                        <span class="text-xs font-bold">Text Post</span>
                    </button>
                    
                    <button (click)="type = 'carousel'" [class]="type === 'carousel' ? 'border-purple-500 bg-purple-50/50 text-purple-700 ring-1 ring-purple-500' : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'" class="border rounded-xl p-3 flex flex-col items-center gap-2 transition-all relative group">
                        @if(type === 'carousel') { <div class="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></div> }
                        <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <span class="text-xs font-bold">Carousel</span>
                    </button>
                </div>
             </div>

             <button (click)="create()" [disabled]="!title" class="w-full bg-[#1C1C1E] text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
                Create & Start Writing
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </button>
          </div>
       </div>
    </div>
  `,
  styles: [`
    .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class NewPostModalComponent implements AfterViewInit {
  store = inject(StoreService);
  
  title = '';
  type: 'text' | 'carousel' = 'text';

  @ViewChild('titleInput') titleInput!: ElementRef;

  ngAfterViewInit() {
    // Focus input on open
    setTimeout(() => this.titleInput.nativeElement.focus(), 50);
  }

  close() {
    this.store.isNewPostModalOpen.set(false);
  }

  create() {
    if (!this.title.trim()) return;
    
    // Create post in store and navigate
    this.store.createNewPost(this.title, this.type);
    this.close();
  }
}
