
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in pb-20">
      <div class="flex items-center justify-between mb-8">
         <div>
            <h2 class="text-2xl font-bold text-[#0F172A]">Prospect Hub</h2>
            <p class="text-slate-500 text-sm mt-1">Manage leads imported from your LinkedIn interactions.</p>
         </div>
         <button class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export CSV
         </button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         @if (store.prospects().length === 0) {
             <div class="text-center py-20 px-6">
               <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
               </div>
               <h3 class="text-xl font-bold text-[#0F172A] mb-2">No leads yet</h3>
               <p class="text-slate-500 max-w-sm mx-auto mb-6">Interact with people in the Engagement Hub to find prospects.</p>
             </div>
         } @else {
             <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                   <thead>
                      <tr class="bg-slate-50 border-b border-slate-200">
                         <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                         <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                         <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                         <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody class="divide-y divide-slate-100">
                      @for (prospect of store.prospects(); track prospect.id) {
                         <tr class="hover:bg-slate-50/50 transition-colors group">
                            <td class="px-6 py-4">
                               <div class="flex items-center gap-3">
                                  <img [src]="prospect.avatar" class="w-10 h-10 rounded-full object-cover border border-slate-100">
                                  <div>
                                     <div class="font-bold text-[#0F172A] text-sm">{{ prospect.name }}</div>
                                     <div class="text-xs text-slate-500">{{ prospect.headline }}</div>
                                  </div>
                               </div>
                            </td>
                            <td class="px-6 py-4">
                               <div class="text-sm text-slate-700 font-medium">{{ prospect.company }}</div>
                            </td>
                            <td class="px-6 py-4">
                               <span [class]="statusClass(prospect.status)" class="px-2.5 py-1 rounded-full text-xs font-bold border">
                                  {{ prospect.status }}
                               </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                               <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Message">
                                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                  </button>
                                  <button class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Remove">
                                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                  </button>
                               </div>
                            </td>
                         </tr>
                      }
                   </tbody>
                </table>
             </div>
         }
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ProspectsComponent {
  store = inject(StoreService);

  statusClass(status: string): string {
    switch(status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Contacted': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Replied': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  }
}
