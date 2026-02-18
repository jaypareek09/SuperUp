
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
          
          <!-- Linked Accounts Section -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 class="text-lg font-bold text-[#0F172A] mb-4">Linked Accounts</h2>
              <div class="space-y-3 mb-6">
                  @for (profile of store.profiles(); track profile.id) {
                      <div class="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div class="flex items-center gap-3">
                              <img [src]="profile.avatar" class="w-10 h-10 rounded-full">
                              <div>
                                  <div class="font-bold text-slate-800 text-sm">{{ profile.name }}</div>
                                  <div class="text-xs text-slate-500">{{ profile.handle }}</div>
                              </div>
                          </div>
                          @if (store.profiles().length > 1) {
                              <button (click)="removeAccount(profile.id)" class="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                                  Remove
                              </button>
                          }
                      </div>
                  }
              </div>
              <button (click)="addAccount()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Add another LinkedIn Account
              </button>
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
  store = inject(StoreService);

  addAccount() {
    // Simulate adding a new account for the demo
    const randomId = Math.floor(Math.random() * 1000);
    const name = `Demo User ${randomId}`;
    this.store.addProfile(name, `@demo${randomId}`);
    this.store.triggerNotification('Account Added', `Successfully linked ${name}.`);
  }

  removeAccount(profileId: string) {
    if (this.store.profiles().length <= 1) {
        this.store.triggerNotification('Error', 'Cannot remove the last account.');
        return;
    }
    this.store.removeProfile(profileId);
  }
}
