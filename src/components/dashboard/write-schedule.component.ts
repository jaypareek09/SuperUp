
import { Component, inject, signal, computed, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Post } from '../../services/store.service';
import { GeminiService } from '../../services/gemini.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-write-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in font-sans relative pb-20 h-full">
      
      <!-- Top Bar with Post Title (if exists) -->
      @if (store.activeDraft()?.title) {
         <div class="flex items-center gap-2 text-sm text-slate-400 mb-2 px-1">
            <span class="font-medium text-slate-800">{{ store.activeDraft()?.title }}</span>
            <span>•</span>
            <span>Draft</span>
         </div>
      }

      <div class="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)]">
        <!-- MAIN EDITOR COLUMN -->
        <div class="flex-1 flex flex-col bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden relative group">
          
          <!-- Top Toolbar -->
          <div class="h-16 border-b border-[#EAEAEA] flex items-center justify-between px-6 bg-white shrink-0 z-20">
              <!-- Formatting Tools -->
              <div class="flex items-center gap-1">
                 <button (click)="applyFormat('bold')" class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-900 font-serif font-bold text-lg transition-colors" title="Bold">B</button>
                 <button (click)="applyFormat('italic')" class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-900 font-serif italic text-lg transition-colors" title="Italic">I</button>
              </div>

              <!-- AI COMMAND CENTER (Redesigned) -->
              <div class="flex-1 max-w-lg mx-6">
                 <div class="relative group/ai">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <svg class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <input 
                      [(ngModel)]="aiTopic" 
                      (keyup.enter)="magicWrite()"
                      [disabled]="isAiLoading()"
                      class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-10 py-2.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="Ask AI to write about..."
                    >
                    <button 
                      (click)="magicWrite()"
                      [disabled]="isAiLoading() || !aiTopic"
                      class="absolute right-2 top-1.5 bottom-1.5 px-2 bg-white rounded-lg text-slate-400 hover:text-blue-600 disabled:opacity-0 transition-all shadow-sm border border-slate-100 flex items-center"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                 </div>
              </div>

              <!-- Character Count -->
               <div class="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  {{ content.length }} / 3000
               </div>
          </div>

          <!-- Editor Area -->
          <div class="flex-1 flex flex-col relative bg-white overflow-hidden">
                <textarea 
                    #editor
                    [(ngModel)]="content"
                    class="flex-1 w-full p-8 outline-none resize-none text-[#1C1C1C] text-lg leading-relaxed placeholder-[#DCDCDC] custom-scrollbar bg-white font-sans selection:bg-blue-100 selection:text-blue-900"
                    placeholder="Start writing your post here..."
                ></textarea>

                <!-- Floating Helper Tools (Redesigned) -->
                <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                    
                    <div class="flex gap-3 pointer-events-auto">
                        <button (click)="generateHooks()" class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-lg shadow-slate-200/50 rounded-full text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:-translate-y-1 transition-all group">
                           <span class="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                           </span>
                           Generate Hooks
                        </button>
                        
                        <button (click)="fixGrammar()" class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-lg shadow-slate-200/50 rounded-full text-xs font-bold text-slate-600 hover:text-green-600 hover:border-green-300 hover:-translate-y-1 transition-all group">
                           <span class="w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                           </span>
                           Fix Grammar
                        </button>
                    </div>

                    <div class="text-xs text-slate-300 font-bold bg-white/80 backdrop-blur px-2 py-1 rounded">
                       ~{{ (content.split(' ').length / 200).toFixed(1) }} min read
                    </div>
                </div>

                <!-- Hook Suggestions Overlay -->
                @if (hooks().length > 0) {
                    <div class="absolute inset-x-0 bottom-0 z-30 p-6 bg-gradient-to-t from-white via-white to-transparent pt-20">
                      <div class="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden animate-slide-up max-w-2xl mx-auto ring-4 ring-blue-50/50">
                          <div class="bg-blue-50/80 px-4 py-3 border-b border-blue-100 flex justify-between items-center backdrop-blur-sm">
                            <span class="text-xs font-bold text-blue-700 uppercase flex items-center gap-2">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                               Select a Viral Hook
                            </span>
                            <button (click)="hooks.set([])" class="text-blue-400 hover:text-blue-700 font-bold p-1 hover:bg-blue-100 rounded-md transition-colors">&times;</button>
                          </div>
                          <div class="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                            @for (hook of hooks(); track $index) {
                                <button (click)="applyHook(hook)" class="w-full text-left p-4 hover:bg-blue-50 text-slate-800 text-sm transition-colors block font-medium leading-relaxed group">
                                  <span class="text-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-opacity font-bold">→</span>
                                  {{ hook }}
                                </button>
                            }
                          </div>
                      </div>
                    </div>
                }
          </div>
        </div>

        <!-- PREVIEW COLUMN -->
        <div class="w-full lg:w-[400px] flex flex-col animate-fade-in stagger-1 shrink-0">
          <!-- Preview Toggle -->
          <div class="bg-slate-100 p-1 rounded-xl flex mb-4 self-center border border-slate-200">
             <button (click)="previewMode.set('mobile')" [class.bg-white]="previewMode() === 'mobile'" [class.shadow-sm]="previewMode() === 'mobile'" [class.text-slate-800]="previewMode() === 'mobile'" class="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500 transition-all flex items-center gap-2">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                Mobile
             </button>
             <button (click)="previewMode.set('desktop')" [class.bg-white]="previewMode() === 'desktop'" [class.shadow-sm]="previewMode() === 'desktop'" [class.text-slate-800]="previewMode() === 'desktop'" class="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500 transition-all flex items-center gap-2">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Desktop
             </button>
          </div>

          <!-- The Device Frame -->
          <div class="flex-1 relative overflow-hidden flex justify-center">
              <div 
                 class="bg-white border border-slate-300 shadow-xl overflow-hidden flex flex-col transition-all duration-300 relative"
                 [class.rounded-[2.5rem]]="previewMode() === 'mobile'"
                 [class.w-[320px]]="previewMode() === 'mobile'"
                 [class.h-[650px]]="previewMode() === 'mobile'"
                 [class.rounded-xl]="previewMode() === 'desktop'"
                 [class.w-full]="previewMode() === 'desktop'"
                 [class.h-auto]="previewMode() === 'desktop'"
              >
                  <!-- Mobile Notch (Visual Only) -->
                  @if (previewMode() === 'mobile') {
                     <div class="absolute top-0 left-0 right-0 h-8 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 z-10 flex justify-center items-end pb-1.5">
                        <div class="w-24 h-4 bg-black rounded-full absolute top-2"></div>
                     </div>
                  }

                  <!-- LinkedIn Post Header -->
                  <div class="p-4 pb-0" [class.pt-12]="previewMode() === 'mobile'" [class.pt-4]="previewMode() === 'desktop'">
                      <div class="flex gap-3 mb-3">
                        <img [src]="'https://picsum.photos/seed/' + (authService.currentUser()?.name?.replace(' ', '') || 'user') + '/100/100'" class="w-10 h-10 rounded-full border border-slate-100">
                        <div>
                            <div class="font-bold text-[#1C1C1C] text-sm leading-tight">{{ authService.currentUser()?.name }}</div>
                            <div class="text-xs text-slate-500 leading-tight">Creator • 1st</div>
                            <div class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                               2h • <svg class="w-3 h-3 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                            </div>
                        </div>
                      </div>
                  </div>

                  <!-- Post Content -->
                  <div class="px-4 text-[14px] text-[#1C1C1C] whitespace-pre-wrap leading-relaxed font-sans overflow-y-auto custom-scrollbar flex-1 pb-4">
                      {{ content || 'Your post preview will appear here...' }}
                      
                      @if (content.length > 200) {
                          <span class="text-slate-400 font-medium cursor-pointer">...see more</span>
                      }
                  </div>

                  <!-- Reaction Bar Image -->
                  <div class="border-t border-slate-100 p-2 mt-auto bg-white shrink-0">
                     <div class="flex items-center gap-1 mb-2">
                        <div class="flex -space-x-1">
                           <div class="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg></div>
                           <div class="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></div>
                           <div class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg></div>
                        </div>
                        <div class="text-xs text-slate-500 hover:text-blue-600 hover:underline cursor-pointer">128</div>
                     </div>
                     <div class="flex justify-between px-2 pt-2 border-t border-slate-100">
                        <div class="flex flex-col items-center gap-1 text-slate-500">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                           <span class="text-[10px] font-semibold">Like</span>
                        </div>
                        <div class="flex flex-col items-center gap-1 text-slate-500">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                           <span class="text-[10px] font-semibold">Comment</span>
                        </div>
                        <div class="flex flex-col items-center gap-1 text-slate-500">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                           <span class="text-[10px] font-semibold">Repost</span>
                        </div>
                        <div class="flex flex-col items-center gap-1 text-slate-500">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                           <span class="text-[10px] font-semibold">Send</span>
                        </div>
                     </div>
                  </div>
              </div>
          </div>
          
          <!-- Scheduling Actions (Below Preview) -->
           <div class="mt-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
              <button (click)="saveDraft()" class="w-full py-3 text-slate-700 font-bold text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Save Changes</button>
              <button (click)="scheduleUnderDev()" class="w-full py-3 text-white font-bold text-sm bg-[#0065FF] hover:bg-[#0052CC] rounded-xl transition-colors shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 transform active:scale-95">
                 Schedule Post
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </button>
           </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    .animate-slide-up { animation: slideUp 0.3s ease-out; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class WriteScheduleComponent {
  @ViewChild('editor') editor!: ElementRef<HTMLTextAreaElement>;
  
  // Content State
  aiTopic = '';
  content = '';
  hooks = signal<string[]>([]);
  isAiLoading = signal(false);
  previewMode = signal<'mobile' | 'desktop'>('mobile');
  
  store = inject(StoreService);
  gemini = inject(GeminiService);
  authService = inject(AuthService);

  // Unicode Maps
  boldMap: Record<string, string> = {
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
  };

  italicMap: Record<string, string> = {
    'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
    'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
  };

  constructor() {
     effect(() => {
        const draft = this.store.activeDraft();
        if (draft && draft.type === 'text') {
           this.content = draft.content;
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
     });
  }

  // --- Formatting ---
  applyFormat(type: 'bold' | 'italic') {
    const textarea = this.editor.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = this.content;

    if (start === end) return; // No selection

    const selectedText = text.substring(start, end);
    const map = type === 'bold' ? this.boldMap : this.italicMap;
    
    const converted = selectedText.split('').map(char => map[char] || char).join('');
    
    this.content = text.substring(0, start) + converted + text.substring(end);
    
    // Restore selection/cursor
    setTimeout(() => {
        textarea.setSelectionRange(start + converted.length, start + converted.length);
        textarea.focus();
    });
  }

  // --- AI LOGIC ---
  async magicWrite() {
    if (!this.aiTopic) return;
    this.isAiLoading.set(true);
    const result = await this.gemini.generatePost(this.aiTopic, 'Conversational & Authentic');
    this.content = result;
    this.isAiLoading.set(false);
  }

  async generateHooks() {
    if (!this.content) return;
    this.isAiLoading.set(true);
    const result = await this.gemini.generateHooks(this.content);
    this.hooks.set(result);
    this.isAiLoading.set(false);
  }

  async fixGrammar() {
    if (!this.content) return;
    this.isAiLoading.set(true);
    const result = await this.gemini.improveContent(this.content, "Make it sound human, remove corporate jargon.");
    this.content = result;
    this.isAiLoading.set(false);
  }

  applyHook(hook: string) {
    this.content = hook + "\n\n" + this.content;
    this.hooks.set([]);
  }

  // --- SAVING ---
  copyToClipboard() {
    if (!this.content) return;
    navigator.clipboard.writeText(this.content).then(() => {
      this.store.triggerNotification('Copied', 'Post content copied to clipboard.');
    });
  }

  saveDraft() {
    // Save current content to active draft
    const active = this.store.activeDraft();
    if (active) {
        // Update the existing draft in the array
        this.store.posts.update(posts => posts.map(p => {
            if (p.id === active.id) {
                return { ...p, content: this.content, lastModified: new Date() };
            }
            return p;
        }));
    } else {
        // Fallback if no active draft (legacy flow)
        this.store.saveDraft({ type: 'text', content: this.content });
    }
    this.store.triggerNotification('Success', 'Changes saved.');
  }

  scheduleUnderDev() {
     this.store.navigateTo('SCHEDULE');
  }
}
