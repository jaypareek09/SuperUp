
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop with Blur and Dark Blue Gradient -->
      <div class="absolute inset-0 bg-[#0B1120]/60 backdrop-blur-md transition-opacity" (click)="close()"></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-[900px] flex overflow-hidden animate-scale-in">
        
        <!-- Close Button -->
        <button (click)="close()" class="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Left Side: Login Form -->
        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center">
          
          <div class="flex flex-col items-center mb-8">
             <div class="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-900/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 class="text-3xl font-bold text-[#0F172A]">Welcome!</h2>
            <p class="text-slate-500 mt-2 text-sm">We'll sign you in or create an account if you don't have one yet.</p>
          </div>

          <button (click)="login()" class="w-full bg-white border border-slate-200 hover:bg-slate-50 text-[#0F172A] font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all mb-6 group">
            <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span class="group-hover:text-blue-700 transition-colors">Continue with Google</span>
          </button>

          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
            <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-slate-400">or</span></div>
          </div>

          <div class="space-y-4">
             <div class="text-left">
               <label class="block text-xs font-semibold text-slate-500 mb-1 ml-1">Email address</label>
               <input type="email" placeholder="you@example.com" class="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-sm rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block px-4 py-3 outline-none transition-all">
             </div>
             
             <button class="w-full bg-slate-50 text-slate-300 font-semibold py-3 px-4 rounded-xl cursor-not-allowed" disabled>
               Continue with email
             </button>
          </div>

          <p class="mt-8 text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            By continuing you agree to the <a href="#" class="underline hover:text-slate-600">Terms of use</a> and <a href="#" class="underline hover:text-slate-600">Privacy policy</a>.
          </p>
        </div>

        <!-- Right Side: Social Proof (Hidden on mobile) -->
        <div class="hidden md:flex w-1/2 bg-[#FAFAFA] border-l border-slate-100 flex-col p-10">
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 text-center">Trusted by top creators</h3>
          
          <div class="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            
            <!-- Creator Card 1 -->
            <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <img src="https://picsum.photos/50/50?random=10" class="w-10 h-10 rounded-full object-cover">
               <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-[#0F172A]">Justin Welsh</div>
                  <div class="text-xs text-slate-500 truncate">Solopreneur</div>
               </div>
               <div class="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                 <svg class="w-3 h-3 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 <span class="text-xs font-bold text-slate-700">544k</span>
               </div>
            </div>

            <!-- Creator Card 2 -->
            <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <img src="https://picsum.photos/50/50?random=11" class="w-10 h-10 rounded-full object-cover">
               <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-[#0F172A]">Matt Gray</div>
                  <div class="text-xs text-slate-500 truncate">Founder Systems</div>
               </div>
               <div class="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                 <svg class="w-3 h-3 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 <span class="text-xs font-bold text-slate-700">505k</span>
               </div>
            </div>

            <!-- Creator Card 3 -->
            <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <img src="https://picsum.photos/50/50?random=12" class="w-10 h-10 rounded-full object-cover">
               <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-[#0F172A]">Chase Dimond</div>
                  <div class="text-xs text-slate-500 truncate">Email Marketing</div>
               </div>
               <div class="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                 <svg class="w-3 h-3 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 <span class="text-xs font-bold text-slate-700">291k</span>
               </div>
            </div>

             <!-- Creator Card 4 -->
            <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <img src="https://picsum.photos/50/50?random=13" class="w-10 h-10 rounded-full object-cover">
               <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-[#0F172A]">Lara Acosta</div>
                  <div class="text-xs text-slate-500 truncate">Personal Branding</div>
               </div>
               <div class="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                 <svg class="w-3 h-3 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 <span class="text-xs font-bold text-slate-700">133k</span>
               </div>
            </div>

             <!-- Creator Card 5 -->
            <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <img src="https://picsum.photos/50/50?random=14" class="w-10 h-10 rounded-full object-cover">
               <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-[#0F172A]">Kevin Moënne</div>
                  <div class="text-xs text-slate-500 truncate">Head of Product</div>
               </div>
               <div class="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                 <svg class="w-3 h-3 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 <span class="text-xs font-bold text-slate-700">75k</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-scale-in {
      animation: scaleIn 0.2s ease-out forwards;
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #E2E8F0;
      border-radius: 4px;
    }
  `]
})
export class LoginModalComponent {
  modalService = inject(ModalService);
  authService = inject(AuthService);

  close() {
    this.modalService.close();
  }
  
  login() {
    this.authService.login();
    this.modalService.close();
  }
}
