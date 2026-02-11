
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-32 px-6 bg-white relative">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl font-bold text-[#0F172A] tracking-tight mb-4">Try the magic yourself.</h2>
          <p class="text-lg text-slate-500">No sign-up needed. Generate a post in seconds.</p>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row reveal">
          
          <!-- Left: Input Controls -->
          <div class="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-8 flex flex-col gap-6">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Topic</label>
              <textarea 
                [(ngModel)]="topic"
                rows="4"
                placeholder="e.g. 3 lessons I learned from failing my first startup..."
                class="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-[#0F172A] placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Tone</label>
              <select 
                [(ngModel)]="tone"
                class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-[#0F172A] focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="Thought Leadership">Thought Leadership</option>
                <option value="Storytelling">Storytelling</option>
                <option value="Controversial">Controversial</option>
                <option value="Actionable Advice">Actionable Advice</option>
              </select>
            </div>

            <div class="mt-auto">
              <button 
                (click)="generate()" 
                [disabled]="isLoading()"
                class="w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#1E293B] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                @if (isLoading()) {
                   <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                } @else {
                  <span>Generate Post</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                }
              </button>
            </div>
          </div>

          <!-- Right: Output Preview -->
          <div class="w-full md:w-2/3 p-8 md:p-12 bg-white flex flex-col justify-center relative min-h-[400px]">
             @if (!result() && !isLoading()) {
               <div class="text-center text-slate-300">
                  <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  <p class="font-medium">Your generated post will appear here.</p>
               </div>
             }

             @if (result()) {
               <div class="animate-fade-in">
                  <!-- LinkedIn Post Header -->
                  <div class="flex gap-3 mb-4">
                     <div class="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0"></div>
                     <div>
                        <div class="h-4 w-32 bg-slate-800 rounded mb-1"></div>
                        <div class="h-3 w-48 bg-slate-400 rounded"></div>
                     </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="prose prose-slate prose-lg max-w-none text-[#0F172A] mb-6 whitespace-pre-wrap leading-relaxed">
                    {{ result() }}
                  </div>

                  <!-- Footer Actions -->
                  <div class="border-t border-slate-100 pt-4 flex gap-6 text-slate-500 font-medium text-sm">
                     <span class="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded cursor-pointer transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg> Like</span>
                     <span class="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded cursor-pointer transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> Comment</span>
                     <span class="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded cursor-pointer transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Repost</span>
                  </div>
               </div>
             }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DemoComponent {
  topic = '';
  tone = 'Thought Leadership';
  isLoading = signal(false);
  result = signal<string | null>(null);

  private geminiService = inject(GeminiService);

  async generate() {
    if (!this.topic.trim()) return;
    
    this.isLoading.set(true);
    this.result.set(null);
    
    const response = await this.geminiService.generatePost(this.topic, this.tone);
    
    this.result.set(response);
    this.isLoading.set(false);
  }
}
