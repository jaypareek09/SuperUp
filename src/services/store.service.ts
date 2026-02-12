
import { Injectable, signal, computed } from '@angular/core';

export type View = 'HOME' | 'WRITE' | 'SCHEDULE' | 'MY_POSTS' | 'CAROUSEL' | 'VIRAL' | 'ENGAGEMENT' | 'SETTINGS' | 'ANALYTICS';
export type OnboardingStep = 'IDLE' | 'INSTALL_PROMPT' | 'SCANNING' | 'CONFIRM_PROFILE' | 'COMPLETE';

export interface LinkedProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
}

export interface Post {
  id: string;
  profileId: string; // Linked to specific profile
  type: 'text' | 'carousel';
  content: string; 
  slides?: { title: string; body: string }[];
  templateId?: string; 
  scheduledDate: Date | null;
  status: 'draft' | 'scheduled' | 'published';
  stats?: { views: number; likes: number; comments: number };
  lastModified?: Date;
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

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // --- App State ---
  currentView = signal<View>('HOME');
  isLoadingView = signal(false);
  loadingMessage = signal('Loading...');
  activeDraft = signal<Post | null>(null); 
  isConnected = signal(false); 
  
  // Onboarding State
  onboardingStep = signal<OnboardingStep>('IDLE');
  detectedProfile = signal<ScrapedProfile | null>(null);

  // Notification Signal
  activeNotification = signal<{title: string, message: string} | null>(null);

  // --- MULTI-PROFILE STATE ---
  profiles = signal<LinkedProfile[]>([
    { id: 'p1', name: 'Alex Johnson', handle: '@alexgrowth', avatar: 'https://picsum.photos/seed/alex/100' },
    { id: 'p2', name: 'PostRocket Team', handle: '@postrocket', avatar: 'https://picsum.photos/seed/postrocket/100' }
  ]);
  activeProfileId = signal<string>('p1');

  // --- ANALYTICS STATE ---
  profileStats = signal<ProfileStats>({
    followers: 0,
    profileViews: 0,
    postImpressions: 0,
    engagementRate: 0
  });

  // START EMPTY - No Demo Data
  analyzedPosts = signal<AnalyzedPost[]>([]);
  posts = signal<Post[]>([]);
  commentsToReply = signal<Comment[]>([]);
  prospects = signal<Prospect[]>([]);
  viralPosts = signal<ViralPost[]>([]);

  // Computed Context-Aware Data
  activeProfile = computed(() => this.profiles().find(p => p.id === this.activeProfileId()) || this.profiles()[0]);
  
  // Filter posts based on active profile
  filteredPosts = computed(() => this.posts().filter(p => p.profileId === this.activeProfileId()));

  scheduledPosts = computed(() => this.filteredPosts().filter(p => p.status === 'scheduled'));
  drafts = computed(() => this.filteredPosts().filter(p => p.status === 'draft'));

  constructor() {
    this.requestNotificationPermission();
  }

  // --- Navigation Logic ---
  navigateTo(view: View) {
    if (this.currentView() === view) return;
    
    this.loadingMessage.set('Loading...');
    this.isLoadingView.set(true);
    setTimeout(() => {
        this.currentView.set(view);
        this.isLoadingView.set(false);
    }, 800); 
  }

  // --- Profile Logic ---
  switchProfile(profileId: string) {
      if (this.activeProfileId() === profileId) return;
      
      this.loadingMessage.set('Switching Profile...');
      this.isLoadingView.set(true);
      setTimeout(() => {
          this.activeProfileId.set(profileId);
          this.isLoadingView.set(false);
          this.triggerNotification('Profile Switched', `Now working as ${this.activeProfile().name}`);
      }, 500);
  }

  addProfile(name: string, handle: string) {
      const newProfile: LinkedProfile = {
          id: Math.random().toString(36).substring(7),
          name,
          handle,
          avatar: `https://picsum.photos/seed/${name}/100`
      };
      this.profiles.update(p => [...p, newProfile]);
      this.switchProfile(newProfile.id);
  }

  // --- Onboarding Logic ---

  startOnboarding() {
      this.onboardingStep.set('INSTALL_PROMPT');
  }

  confirmProfileAndSync() {
      const profile = this.detectedProfile();
      if (!profile) return;

      this.isConnected.set(true);
      this.onboardingStep.set('COMPLETE');
      this.triggerNotification('Success', 'LinkedIn account connected.');
  }

  // --- Standard Logic ---

  addPost(post: Omit<Post, 'id' | 'stats' | 'lastModified' | 'profileId'>) {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substring(7),
      profileId: this.activeProfileId(), // Attach to current profile
      stats: { views: 0, likes: 0, comments: 0 },
      lastModified: new Date()
    };
    this.posts.update(posts => [newPost, ...posts]);
  }

  saveDraft(post: Omit<Post, 'id' | 'stats' | 'scheduledDate' | 'status' | 'lastModified' | 'profileId'>) {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substring(7),
      profileId: this.activeProfileId(), // Attach to current profile
      scheduledDate: null,
      status: 'draft',
      stats: { views: 0, likes: 0, comments: 0 },
      lastModified: new Date()
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
