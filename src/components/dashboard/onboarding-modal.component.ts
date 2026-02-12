
import { Component, inject } from '@angular/core';
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
      <div class="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm transition-opacity"></div>

      <!-- Modal Container -->
      <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-scale-in">
        
        <!-- Header -->
        <div class="p-6 border-b border-[#EAEAEA] flex justify-between items-center">
            <h2 class="text-lg font-bold text-[#1C1C1C]">Connect Account</h2>
        </div>

        <!-- Content -->
        <div class="p-8">
            
            @if (store.onboardingStep() === 'INSTALL_PROMPT') {
                <div class="text-center">
                    <div class="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold text-[#1C1C1C] mb-2">Sync Profile Data</h3>
                    <p class="text-[#666] mb-8 text-sm leading-relaxed">
                        Connect your profile to import your avatar, name, and recent activity stats. This allows the AI to personalize your content.
                    </p>
                    
                    <button (click)="connectLinkedIn()" class="w-full bg-[#0065FF] hover:bg-[#0052CC] text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                        Connect Account (Beta)
                    </button>
                    <p class="text-xs text-[#999] mt-3">Simulated connection for development.</p>
                </div>
            }

            @if (store.onboardingStep() === 'SCANNING') {
                <div class="flex flex-col items-center justify-center py-8">
                    <div class="w-12 h-12 border-4 border-[#EAEAEA] border-t-[#1C1C1C] rounded-full animate-spin mb-4"></div>
                    <p class="text-[#666] text-sm">Retrieving data...</p>
                </div>
            }

            @if (store.onboardingStep() === 'CONFIRM_PROFILE') {
                <div class="text-center">
                    <img [src]="store.detectedProfile()?.avatar" class="w-20 h-20 rounded-full mx-auto mb-4 border border-[#EAEAEA]">
                    <h3 class="text-lg font-bold text-[#1C1C1C]">{{ store.detectedProfile()?.name }}</h3>
                    <p class="text-sm text-[#666] mb-6">{{ store.detectedProfile()?.headline }}</p>
                    
                    <button (click)="confirm()" class="w-full bg-[#0065FF] hover:bg-[#0052CC] text-white font-medium py-3 rounded-lg transition-all">
                        Confirm & Continue
                    </button>
                </div>
            }

        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class OnboardingModalComponent {
  store = inject(StoreService);
  authService = inject(AuthService);

  connectLinkedIn() {
    this.store.onboardingStep.set('SCANNING');
    
    setTimeout(() => {
        this.store.detectedProfile.set({
            name: this.authService.currentUser()?.name || 'Beta User',
            headline: 'Creator',
            location: 'Remote',
            avatar: this.authService.currentUser()?.avatar || 'https://picsum.photos/id/64/200/200'
        });
        
        this.store.profileStats.set({
            followers: 124,
            profileViews: 45,
            postImpressions: 1200,
            engagementRate: 3.4
        });
        
        this.store.onboardingStep.set('CONFIRM_PROFILE');
    }, 1500);
  }

  retry() {
     this.store.onboardingStep.set('INSTALL_PROMPT');
  }

  confirm() {
     const profile = this.store.detectedProfile();
     if (profile) {
        this.authService.updateProfileFromScrape(profile.name, profile.avatar);
        this.store.confirmProfileAndSync();
     }
  }
}
