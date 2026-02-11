
import { Injectable, signal, inject } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  store = inject(StoreService);
  
  // null = not logged in
  currentUser = signal<{name: string, email: string, avatar?: string} | null>(null);

  login() {
    // 1. Create a "Shell" session
    this.currentUser.set({
      name: 'Welcome', 
      email: 'user@example.com',
      avatar: '' 
    });

    // 2. Trigger the Onboarding Flow immediately
    this.store.startOnboarding();
  }

  logout() {
    this.currentUser.set(null);
    this.store.onboardingStep.set('IDLE');
    this.store.isExtensionInstalled.set(false);
  }

  // Called by store when profile is confirmed
  updateProfileFromScrape(name: string, avatar: string) {
    const current = this.currentUser();
    if (current) {
        this.currentUser.set({ ...current, name, avatar });
    }
  }
}
