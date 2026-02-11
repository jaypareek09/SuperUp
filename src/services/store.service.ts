
import { Injectable, signal, computed } from '@angular/core';

export type View = 'HOME' | 'WRITE' | 'CAROUSEL' | 'VIRAL' | 'EXTENSION' | 'ENGAGEMENT' | 'PROSPECTS';
export type OnboardingStep = 'IDLE' | 'INSTALL_PROMPT' | 'SCANNING' | 'CONFIRM_PROFILE' | 'COMPLETE';

export interface Post {
  id: string;
  type: 'text' | 'carousel';
  content: string; 
  slides?: { title: string; body: string }[];
  templateId?: string; 
  scheduledDate: Date | null;
  status: 'draft' | 'scheduled' | 'published';
  stats?: { views: number; likes: number; comments: number };
}

export interface ViralPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  likes: string;
  comments: string;
  date: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  headline: string;
  text: string;
  postTitle: string;
  time: string;
}

export interface Prospect {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  company: string;
  status: 'New' | 'Contacted' | 'Replied';
}

export interface ProfileStats {
  followers: number;
  profileViews: number;
  postImpressions: number;
  engagementRate: number;
}

export interface AnalyzedPost {
  id: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
  engagement: number;
}

export interface ScrapedProfile {
    name: string;
    headline: string;
    avatar: string;
    location: string;
}

export interface ExtensionPayload {
  user: ScrapedProfile;
  stats: ProfileStats;
  recentPosts: AnalyzedPost[];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // --- App State ---
  currentView = signal<View>('HOME');
  activeDraft = signal<Post | null>(null); 
  isExtensionInstalled = signal(false);
  
  // Onboarding State
  onboardingStep = signal<OnboardingStep>('IDLE');
  detectedProfile = signal<ScrapedProfile | null>(null);

  // Notification Signal
  activeNotification = signal<{title: string, message: string} | null>(null);

  // --- ANALYTICS STATE ---
  profileStats = signal<ProfileStats>({
    followers: 0,
    profileViews: 0,
    postImpressions: 0,
    engagementRate: 0
  });

  analyzedPosts = signal<AnalyzedPost[]>([]);
  posts = signal<Post[]>([]);
  commentsToReply = signal<Comment[]>([]);
  prospects = signal<Prospect[]>([]);
  viralPosts = signal<ViralPost[]>([]);

  // Computed
  scheduledPosts = computed(() => this.posts().filter(p => p.status === 'scheduled'));
  drafts = computed(() => this.posts().filter(p => p.status === 'draft'));

  constructor() {
    this.requestNotificationPermission();
    this.initExtensionListener();
  }

  // --- Onboarding Logic ---

  startOnboarding() {
      this.onboardingStep.set('INSTALL_PROMPT');
  }

  // 1. Start listening for the extension
  startScanningForExtension() {
      this.onboardingStep.set('SCANNING');
      
      // We send a ping to the extension in case it's already there
      window.postMessage({ type: 'SUPERUP_PING' }, '*');
  }

  // 2. Setup Listener for "Real" Data
  private initExtensionListener() {
    window.addEventListener('message', (event) => {
      // Validate origin in production
      if (event.data && event.data.type === 'SUPERUP_EXTENSION_DATA') {
         this.handleExtensionData(event.data.payload);
      }
    });
  }

  // 3. Handle Incoming Data
  private handleExtensionData(payload: ExtensionPayload) {
      if (this.onboardingStep() === 'SCANNING') {
          this.detectedProfile.set(payload.user);
          this.profileStats.set(payload.stats);
          this.analyzedPosts.set(payload.recentPosts);
          this.onboardingStep.set('CONFIRM_PROFILE');
      }
  }

  // Called when user says "Yes, that's me"
  confirmProfileAndSync() {
      const profile = this.detectedProfile();
      if (!profile) return;

      this.isExtensionInstalled.set(true);
      this.onboardingStep.set('COMPLETE');
      this.triggerNotification('Sync Complete', 'LinkedIn profile connected successfully.');
  }

  // DEV ONLY: Helper to simulate extension in dev environment since we have no real extension
  dev_simulateExtensionResponse() {
    const mockPayload: ExtensionPayload = {
        user: {
            name: 'Dev User',
            headline: 'Testing Profile Integration',
            avatar: 'https://picsum.photos/200',
            location: 'Developer Console'
        },
        stats: {
            followers: 1250,
            profileViews: 450,
            postImpressions: 15000,
            engagementRate: 5.2
        },
        recentPosts: [
            { id: 'dev1', content: 'This is a synced post from the extension.', date: '1 day ago', likes: 24, comments: 5, views: 1200, engagement: 2.5 },
        ]
    };
    
    // Simulate network delay then dispatch event
    setTimeout(() => {
        window.postMessage({ type: 'SUPERUP_EXTENSION_DATA', payload: mockPayload }, '*');
    }, 1500);
  }

  // --- Standard Logic ---

  addPost(post: Omit<Post, 'id' | 'stats'>) {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substring(7),
      stats: { views: 0, likes: 0, comments: 0 }
    };
    this.posts.update(posts => [newPost, ...posts]);
  }

  saveDraft(post: Omit<Post, 'id' | 'stats' | 'scheduledDate' | 'status'>) {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substring(7),
      scheduledDate: null,
      status: 'draft',
      stats: { views: 0, likes: 0, comments: 0 }
    };
    this.posts.update(posts => [newPost, ...posts]);
  }

  deletePost(id: string) {
    this.posts.update(posts => posts.filter(p => p.id !== id));
  }

  removeComment(id: string) {
    this.commentsToReply.update(comments => comments.filter(c => c.id !== id));
  }

  updateProspectStatus(id: string, status: Prospect['status']) {
    this.prospects.update(prospects => prospects.map(p => p.id === id ? { ...p, status } : p));
  }

  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  triggerNotification(title: string, message: string) {
    this.activeNotification.set({ title, message });
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    }
    setTimeout(() => {
        if (this.activeNotification()?.title === title) {
            this.activeNotification.set(null);
        }
    }, 8000);
  }

  closeNotification() {
    this.activeNotification.set(null);
  }
}
