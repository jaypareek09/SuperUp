
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-viral-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto animate-fade-in">
      <div class="flex items-center justify-between mb-8">
         <h2 class="text-2xl font-bold text-[#0F172A]">Viral Inspiration</h2>
         <div class="flex gap-2">
            <input type="text" placeholder="Search topics..." class="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 w-64">
            <select class="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none">
               <option>Last 7 days</option>
               <option>Last 30 days</option>
               <option>All time</option>
            </select>
         </div>
      </div>

      <div class="grid grid-cols-1 gap-6">
         @if (store.viralPosts().length === 0) {
            <div class="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
               <div class="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mx-auto mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 class="text-xl font-bold text-[#0F172A] mb-2">No inspiration found</h3>
               <p class="text-slate-500 max-w-sm mx-auto">We need to scrape some initial data to find viral posts in your niche. Please sync the extension first.</p>
            </div>
         } @else {
             @for (post of store.viralPosts(); track post.id) {
                <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                   <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center gap-3">
                         <img [src]="post.authorAvatar" class="w-10 h-10 rounded-full object-cover">
                         <div>
                            <div class="font-bold text-[#0F172A]">{{ post.author }}</div>
                            <div class="text-xs text-slate-500">{{ post.date }}</div>
                         </div>
                      </div>
                      <div class="flex items-center gap-4 text-sm font-medium text-slate-600">
                         <span class="flex items-center gap-1"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg> {{ post.likes }}</span>
                         <span class="flex items-center gap-1"><svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg> {{ post.comments }}</span>
                      </div>
                   </div>
                   
                   <p class="text-[#0F172A] whitespace-pre-wrap leading-relaxed mb-6">{{ post.content }}</p>
                   
                   <div class="flex gap-3 pt-4 border-t border-slate-100">
                      <button class="flex-1 bg-slate-50 text-slate-600 font-semibold py-2 rounded-lg text-sm hover:bg-slate-100 transition-colors">
                         Copy Text
                      </button>
                      <button class="flex-1 bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                         Remix with AI
                      </button>
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
export class ViralPostsComponent {
  store = inject(StoreService);
}
