
import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md transition-opacity"></div>

      <!-- Modal Container -->
      <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden min-h-[550px] animate-scale-in">
        
        <!-- STEP 1: INSTALL PROMPT -->
        @if (store.onboardingStep() === 'INSTALL_PROMPT') {
            <div class="w-full md:w-1/2 p-10 flex flex-col relative z-10">
              <div class="flex items-center gap-2 mb-8">
                 <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S.</div>
                 <span class="font-bold text-xl text-slate-900">Setup SuperUp</span>
              </div>

              <h2 class="text-3xl font-bold text-slate-900 mb-4 leading-tight">Step 1: Connect LinkedIn</h2>
              <p class="text-slate-500 mb-8 leading-relaxed">
                 To analyze your profile and schedule posts, SuperUp needs to connect securely to your LinkedIn session via our extension.
              </p>

              <div class="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
                 <div class="flex items-center gap-3 mb-2">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <h3 class="font-bold text-blue-900">Browser Extension Required</h3>
                 </div>
                 <p class="text-sm text-blue-800">
                    Please install the extension. Once installed, it will automatically sync your profile data to this dashboard.
                 </p>
              </div>

              <div class="mt-auto">
                <button (click)="start()" class="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 group">
                   <span>I've Installed It</span>
                   <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                <div class="mt-4 flex justify-between items-center">
                    <p class="text-xs text-slate-400">Waiting for extension handshake...</p>
                </div>
              </div>
            </div>

            <!-- Visual Side -->
            <div class="hidden md:flex w-1/2 bg-slate-50 relative items-center justify-center border-l border-slate-100">
               <div class="relative w-64 h-80 bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col p-4 transform rotate-[-2deg]">
                   <!-- Visual placeholder of a profile loading -->
                   <div class="flex gap-2 mb-4 animate-pulse">
                      <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div class="space-y-1">
                         <div class="w-20 h-2 bg-slate-200 rounded"></div>
                         <div class="w-12 h-2 bg-slate-200 rounded"></div>
                      </div>
                   </div>
                   <div class="flex-1 bg-slate-50 rounded-lg border border-dashed border-slate-200 mb-4 flex items-center justify-center">
                      <span class="text-slate-300 text-sm font-semibold">Waiting for Sync...</span>
                   </div>
                   <div class="h-8 bg-slate-200 rounded-lg w-full animate-pulse"></div>
               </div>
            </div>
        }

        <!-- STEP 2: SCANNING (WAITING FOR EXTENSION) -->
        @if (store.onboardingStep() === 'SCANNING') {
            <div class="w-full flex flex-col items-center justify-center text-center p-12">
               <div class="relative w-24 h-24 mb-8">
                  <!-- Radar Ping -->
                  <div class="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping"></div>
                  <div class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  <div class="absolute inset-2 rounded-full bg-white shadow-inner flex items-center justify-center">
                     <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
               </div>
               
               <h2 class="text-2xl font-bold text-slate-900 mb-2">Connecting to Extension...</h2>
               <p class="text-slate-500 max-w-md mx-auto mb-8">
                  We are waiting for the extension to send your profile data. Please ensure you are logged into LinkedIn in another tab.
               </p>
               
               <!-- DEV HELPER: Only visible because we don't have the real extension installed in this sandbox -->
               <div class="p-4 bg-yellow-50 border border-yellow-100 rounded-xl max-w-md mx-auto text-left">
                  <h4 class="text-xs font-bold text-yellow-800 uppercase mb-1">Developer Mode</h4>
                  <p class="text-xs text-yellow-700 mb-3">
                     Since the Chrome Extension cannot be installed in this preview environment, click below to simulate the data packet arrival.
                  </p>
                  <button (click)="store.dev_simulateExtensionResponse()" class="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-bold py-2 rounded transition-colors">
                     Simulate Incoming Data Payload
                  </button>
               </div>
            </div>
        }

        <!-- STEP 3: CONFIRM PROFILE -->
        @if (store.onboardingStep() === 'CONFIRM_PROFILE') {
            <div class="w-full flex flex-col items-center justify-center p-10 text-center">
               <h2 class="text-2xl font-bold text-slate-900 mb-8">Profile Detected</h2>
               
               <!-- Profile Card -->
               <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl w-full max-w-sm mb-8 relative group">
                  <div class="absolute -top-6 left-1/2 -translate-x-1/2">
                     <img [src]="store.detectedProfile()?.avatar" class="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-slate-100">
                     <div class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div class="mt-12">
                     <h3 class="text-xl font-bold text-slate-900">{{ store.detectedProfile()?.name }}</h3>
                     <p class="text-sm text-slate-500 mb-4">{{ store.detectedProfile()?.headline }}</p>
                     
                     <div class="flex justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 py-2 rounded-lg">
                        <span class="flex items-center gap-1"><svg class="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> {{ store.detectedProfile()?.location }}</span>
                     </div>
                  </div>
               </div>

               <div class="flex gap-4">
                  <button (click)="retry()" class="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors">
                     Retry Scan
                  </button>
                  <button (click)="confirm()" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105">
                     Yes, Continue as {{ store.detectedProfile()?.name?.split(' ')?.[0] }}
                  </button>
               </div>
            </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class OnboardingModalComponent {
  store = inject(StoreService);
  authService = inject(AuthService);

  start() {
    this.store.startScanningForExtension();
  }

  retry() {
     this.store.onboardingStep.set('INSTALL_PROMPT');
  }

  confirm() {
     const profile = this.store.detectedProfile();
     if (profile) {
        // Update Auth Service with the "Real" detected name from the extension payload
        this.authService.updateProfileFromScrape(profile.name, profile.avatar);
        // Finalize store state
        this.store.confirmProfileAndSync();
     }
  }
}
