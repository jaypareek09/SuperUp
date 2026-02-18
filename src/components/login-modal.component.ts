
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop with Blur -->
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" (click)="close()"></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden animate-scale-in border border-slate-100">
        
        <!-- Close Button -->
        <button (click)="close()" class="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="p-8 pt-10">
          
          <div class="flex flex-col items-center mb-8">
            <app-logo logoClass="h-10 w-auto mb-4" />
            <h2 class="text-xl font-bold text-[#0F172A] tracking-tight">Welcome to PostRocket</h2>
            <p class="text-slate-500 mt-2 text-sm text-center">Sign in or create your account to continue.</p>
          </div>

          <!-- REAL GOOGLE AUTH -->
          <button (click)="loginWithGoogle()" [disabled]="isLoading()" class="w-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-[#0F172A] font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition-all mb-4 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed h-12">
            @if (isLoading() && !email) {
                <svg class="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            } @else {
                <svg class="w-5 h-5 relative z-10" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span class="relative z-10">Continue with Google</span>
            }
          </button>

          <div class="relative mb-4">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
            <div class="relative flex justify-center text-xs"><span class="px-3 bg-white text-slate-400 font-medium">or email</span></div>
          </div>

          <!-- EMAIL MAGIC LINK FORM -->
          @if (!emailSent()) {
            <div class="space-y-3">
               <div>
                 <input 
                    type="email" 
                    [(ngModel)]="email" 
                    placeholder="name@company.com" 
                    class="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block px-4 py-2.5 outline-none transition-all placeholder:text-slate-400"
                    [disabled]="isLoading()"
                    (keyup.enter)="loginWithEmail()"
                 >
               </div>
               
               <button 
                  (click)="loginWithEmail()" 
                  [disabled]="isLoading() || !email"
                  class="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 @if (isLoading() && email) {
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                 } @else {
                   <span>Continue with Email</span>
                 }
               </button>
               
               @if (errorMessage()) {
                   <p class="text-xs text-red-500 font-medium text-center">{{ errorMessage() }}</p>
               }
            </div>
          } @else {
            <!-- SUCCESS STATE -->
            <div class="bg-green-50 rounded-xl p-6 border border-green-100 animate-scale-in text-center">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="font-bold text-green-900 text-sm mb-1">Check your inbox</h3>
                <p class="text-xs text-green-800 leading-relaxed mb-3">
                   A sign-in link has been sent to <b>{{ email }}</b>
                </p>
                <button (click)="emailSent.set(false)" class="text-xs font-bold text-green-700 hover:underline">Try different email</button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-scale-in {
      animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.98) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `]
})
export class LoginModalComponent {
  modalService = inject(ModalService);
  authService = inject(AuthService);
  
  email = '';
  isLoading = signal(false);
  emailSent = signal(false);
  errorMessage = signal('');
  currentUrl = window.location.origin;

  close() {
    this.modalService.close();
  }
  
  async loginWithGoogle() {
    this.isLoading.set(true);
    try {
        await this.authService.signInWithGoogle();
        // Redirect handled by Supabase, or if demo, store updates instantly
    } catch (err: any) {
        this.errorMessage.set(err.message || 'Failed to connect to Google.');
        this.isLoading.set(false);
    }
  }

  async loginWithEmail() {
    if (!this.email) return;
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
        await this.authService.signInWithEmail(this.email);
        this.emailSent.set(true);
        this.isLoading.set(false);
    } catch (err: any) {
        this.errorMessage.set(err.message || 'Failed to send magic link.');
        this.isLoading.set(false);
    }
  }

  copyUrl() {
     navigator.clipboard.writeText(this.currentUrl).then(() => {
        alert('URL copied to clipboard! Add this to Supabase Redirect URLs.');
     });
  }
}
