
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Comment } from '../../services/store.service';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-engagement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto animate-fade-in pb-20">
      <div class="flex items-center justify-between mb-8">
         <h2 class="text-2xl font-bold text-[#0F172A]">Engagement Hub</h2>
         @if (store.commentsToReply().length > 0) {
            <div class="text-sm text-slate-500 font-medium">
                {{ store.commentsToReply().length }} comments waiting
            </div>
         }
      </div>

      <div class="space-y-6">
         @if (store.commentsToReply().length === 0) {
            <!-- EMPTY STATE -->
            <div class="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
               <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
               </div>
               <h3 class="text-xl font-bold text-[#0F172A] mb-2">No new comments</h3>
               <p class="text-slate-500 max-w-sm mx-auto">Your feed is all caught up! Comments from your latest posts will appear here once you sync the extension.</p>
               
               @if (store.profileStats().followers === 0) {
                   <button (click)="store.currentView.set('EXTENSION')" class="mt-4 text-blue-600 font-bold text-sm hover:underline">Check Extension Status</button>
               }
            </div>
         } @else {
             <!-- COMMENTS LIST -->
             @for (comment of store.commentsToReply(); track comment.id) {
                <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                   <!-- Left Border Indicator -->
                   <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>

                   <div class="flex gap-4">
                      <!-- Author Info -->
                      <div class="shrink-0 text-center">
                         <img [src]="comment.avatar" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm mx-auto mb-2">
                         <div class="w-px h-full bg-slate-100 mx-auto"></div>
                      </div>

                      <div class="flex-1">
                         <!-- Header -->
                         <div class="flex justify-between items-start mb-2">
                            <div>
                               <h3 class="font-bold text-[#0F172A] text-lg">{{ comment.author }}</h3>
                               <p class="text-xs text-slate-500">{{ comment.headline }}</p>
                            </div>
                            <div class="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded">
                               On: "{{ comment.postTitle }}" • {{ comment.time }}
                            </div>
                         </div>

                         <!-- Comment Text -->
                         <div class="bg-slate-50 rounded-xl p-4 mb-4 text-slate-700 text-sm leading-relaxed border border-slate-100">
                            {{ comment.text }}
                         </div>

                         <!-- Reply Area -->
                         <div class="relative">
                            <textarea 
                               #replyBox
                               class="w-full bg-white border border-slate-200 rounded-xl p-4 pr-32 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm min-h-[100px]" 
                               placeholder="Write a reply..."
                            ></textarea>
                            
                            <!-- AI Button -->
                            <button 
                               (click)="generateReply(comment.text, replyBox)"
                               [disabled]="isGenerating()"
                               class="absolute top-3 right-3 text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                            >
                               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                               {{ isGenerating() ? 'Thinking...' : 'AI Reply' }}
                            </button>

                            <div class="flex justify-end mt-3 gap-3">
                               <button (click)="store.removeComment(comment.id)" class="text-slate-400 hover:text-slate-600 text-sm font-medium px-4 py-2">Skip</button>
                               <button (click)="sendReply(comment.id)" class="bg-[#0065FF] text-white font-bold text-sm px-6 py-2 rounded-lg hover:bg-[#0052CC] shadow-lg shadow-blue-500/10 transition-all">
                                  Reply & Next
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             }
         }
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class EngagementComponent {
  store = inject(StoreService);
  gemini = inject(GeminiService);
  isGenerating = signal(false);

  async generateReply(commentText: string, textarea: HTMLTextAreaElement) {
    this.isGenerating.set(true);
    const reply = await this.gemini.generateReply(commentText);
    textarea.value = reply;
    this.isGenerating.set(false);
  }

  sendReply(id: string) {
    // Simulate API call
    this.store.removeComment(id);
  }
}
