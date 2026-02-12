
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-8 animate-fade-in">
       <h1 class="text-2xl font-bold text-[#0F172A] mb-8">Settings</h1>
       
       <div class="space-y-8">
          <!-- Profile Section -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
             <h2 class="text-lg font-bold text-[#0F172A] mb-4">Profile</h2>
             <div class="flex items-start gap-6">
                <img [src]="authService.currentUser()?.avatar" class="w-20 h-20 rounded-full border border-slate-200">
                <div class="flex-1 max-w-md space-y-4">
                   <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                      <input [value]="authService.currentUser()?.name" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" readonly>
                   </div>
                   <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input [value]="authService.currentUser()?.email" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" readonly>
                   </div>
                </div>
             </div>
          </div>

          <!-- Preferences -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
             <h2 class="text-lg font-bold text-[#0F172A] mb-4">Preferences</h2>
             <div class="space-y-4">
                <div class="flex items-center justify-between">
                   <div>
                      <div class="font-medium text-slate-800">Email Notifications</div>
                      <div class="text-xs text-slate-500">Receive updates about your scheduled posts</div>
                   </div>
                   <div class="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                   </div>
                </div>
                <div class="flex items-center justify-between">
                   <div>
                      <div class="font-medium text-slate-800">Browser Notifications</div>
                      <div class="text-xs text-slate-500">Get notified when AI generation completes</div>
                   </div>
                   <div class="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                   </div>
                </div>
             </div>
          </div>

          <!-- Subscription -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
             <h2 class="text-lg font-bold text-[#0F172A] mb-4">Subscription</h2>
             <div class="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div>
                   <div class="font-bold text-blue-900">Pro Plan (Trial)</div>
                   <div class="text-xs text-blue-700">Expires in 14 days</div>
                </div>
                <button class="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700">Manage Billing</button>
             </div>
          </div>
       </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class SettingsComponent {
  authService = inject(AuthService);
}
