
import { Injectable, signal, inject } from '@angular/core';
import { StoreService } from './store.service';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// ⚡️ PHASE 3: AUTH CONFIGURATION
// 1. Get these from Supabase Dashboard -> Settings -> API
// 2. Paste them here to enable REAL Google Login.
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env['SUPABASE_URL'] || 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = process.env['SUPABASE_KEY'] || 'your-anon-key-here';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  store = inject(StoreService);

  // The Active User Signal
  currentUser = signal<{
    id: string;
    email: string;
    name: string;
    avatar: string;
  } | null>(null);

  constructor() {
    // 1. Initialize the Real Client
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 2. Check for existing session on app load (e.g., page refresh)
    this.initializeSession();

    // 3. Listen for Auth State Changes (e.g., when LinkedIn redirects back)
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        this.mapUser(session.user);
        
        // If we just returned from a LinkedIn login, update the store
        if (event === 'SIGNED_IN') {
             this.store.isConnected.set(true); 
             if (this.store.currentView() === 'HOME') {
                // Ensure we stay on dashboard if already there
             }
        }
      } else {
        this.currentUser.set(null);
      }
    });
  }

  // Helper to check if the user has updated the keys
  isConfigured(): boolean {
     return !SUPABASE_URL.includes('your-project-id');
  }

  // --- OAUTH FLOW ---

  /**
   * Triggers the REAL LinkedIn OAuth redirect.
   */
  async signInWithLinkedIn() {
    if (!this.isConfigured()) {
        alert('Please update SUPABASE_URL and SUPABASE_ANON_KEY in src/services/auth.service.ts first.');
        return;
    }

    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'linkedin',
      options: {
        redirectTo: window.location.origin, 
        scopes: 'r_liteprofile r_emailaddress'
      },
    });

    if (error) {
      console.error('LinkedIn Auth Error:', error.message);
    }
  }

  /**
   * Triggers the REAL Google OAuth redirect.
   */
  async signInWithGoogle() {
    // DEV MODE BYPASS: If keys are dummy keys, simulate login immediately
    if (!this.isConfigured()) {
        console.warn('⚠️ Supabase keys not set. Simulating login for Demo.');
        this.simulateDevLogin('Google User (Demo)');
        return;
    }

    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    
    if (error) {
        console.error('Google Auth Error:', error.message);
        throw error;
    }
  }

  async signInWithEmail(email: string) {
    if (!this.isConfigured()) {
        // Simulate email login
        this.simulateDevLogin(email.split('@')[0]);
        return;
    }

    const { data, error } = await this.supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Email Auth Error:', error.message);
      throw error;
    }

    return data;
  }

  // --- DEV HELPERS ---
  simulateDevLogin(name: string) {
     this.currentUser.set({
        id: 'dev-user-' + Math.floor(Math.random() * 1000),
        email: 'dev@example.com',
        name: name,
        avatar: `https://picsum.photos/seed/${name}/100/100`
     });
     this.store.currentView.set('HOME');
  }


  async logout() {
    await this.supabase.auth.signOut();
    this.currentUser.set(null);
    this.store.currentView.set('HOME');
    this.store.onboardingStep.set('IDLE');
    window.location.reload(); 
  }

  // --- HELPERS ---

  private async initializeSession() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session?.user) {
      this.mapUser(data.session.user);
    }
  }

  private mapUser(user: User) {
    const metadata = user.user_metadata || {};
    
    this.currentUser.set({
      id: user.id,
      email: user.email || '',
      name: metadata['full_name'] || metadata['name'] || user.email?.split('@')[0] || 'User',
      avatar: metadata['avatar_url'] || metadata['picture'] || 'https://picsum.photos/100'
    });
  }

  updateProfileFromScrape(name: string, avatar: string) {
    const current = this.currentUser();
    if (current) {
        this.currentUser.set({ ...current, name, avatar });
    }
  }
}
