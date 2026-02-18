
import { Injectable, signal, computed } from '@angular/core';

export type View = 'HOME' | 'WRITE' | 'SCHEDULE' | 'MY_POSTS' | 'CAROUSEL' | 'VIRAL' | 'SETTINGS' | 'ANALYTICS';
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
  title?: string; // NEW: Post name for library organization
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
  
  // UI State
  isNewPostModalOpen = signal(false);

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
  activeAnalyticsPost = signal<Post | null>(null);

  posts = signal<Post[]>([]);
  commentsToReply = signal<Comment[]>([]);
  prospects = signal<Prospect[]>([]);
  viralPosts = signal<ViralPost[]>([]);

  // Computed Context-Aware Data
  activeProfile = computed(() => this.profiles().find(p => p.id === this.activeProfileId()) || this.profiles()[0]);
  
  // Filter posts based on active profile
  filteredPosts = computed(() => this.posts().filter(p => p.profileId === this.activeProfileId()));

  scheduledPosts = computed(() => this.filteredPosts().filter(p => p.status === 'scheduled').sort((a, b) => (a.scheduledDate?.getTime() || 0) - (b.scheduledDate?.getTime() || 0)));
  drafts = computed(() => this.filteredPosts().filter(p => p.status === 'draft'));

  constructor() {
    this.requestNotificationPermission();
    this._loadDemoData();
  }

  private _loadDemoData() {
    // Check if data already exists to avoid overwriting
    if (this.posts().length > 0) return;

    this.profileStats.set({
        followers: 1489,
        profileViews: 972,
        postImpressions: 48300,
        engagementRate: 4.7
    });

    this.posts.set([
      {
        id: 'demo-post-1',
        profileId: 'p1',
        type: 'text',
        title: 'Consistency Habit',
        content: 'I spent 100 hours interviewing top creators. Here\'s the one habit they all share: consistency. They show up even when they don\'t feel like it.',
        slides: [],
        scheduledDate: new Date(new Date().setDate(new Date().getDate() - 2)),
        status: 'published',
        stats: { views: 18200, likes: 305, comments: 89 },
        lastModified: new Date(new Date().setDate(new Date().getDate() - 2))
      },
      {
        id: 'demo-post-4',
        profileId: 'p1',
        type: 'text',
        title: 'Future of AI',
        content: 'The future of AI is not just about intelligence, but about collaboration. Tools that work with you, not just for you...',
        slides: [],
        scheduledDate: new Date(new Date().setDate(new Date().getDate() - 5)),
        status: 'published',
        stats: { views: 8400, likes: 152, comments: 34 },
        lastModified: new Date(new Date().setDate(new Date().getDate() - 5))
      },
      {
        id: 'demo-post-5',
        profileId: 'p1',
        type: 'carousel',
        title: 'SaaS Mistakes',
        content: 'Carousel: 5 mistakes to avoid when building a SaaS product. Mistake #1: Building without a distribution plan...',
        slides: [{ title: 'Mistake #1', body: 'Building without a distribution plan.' }],
        scheduledDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        status: 'published',
        stats: { views: 12500, likes: 210, comments: 55 },
        lastModified: new Date(new Date().setDate(new Date().getDate() - 7))
      },
      {
        id: 'demo-post-6',
        profileId: 'p1',
        type: 'text',
        title: 'Recycled Content Hot Take',
        content: 'Hot take: Most "thought leadership" is just recycled content. Originality wins, always.',
        slides: [],
        scheduledDate: new Date(new Date().setDate(new Date().getDate() - 10)),
        status: 'published',
        stats: { views: 6100, likes: 98, comments: 61 },
        lastModified: new Date(new Date().setDate(new Date().getDate() - 10))
      },
      {
        id: 'demo-post-2',
        profileId: 'p1',
        type: 'text',
        title: 'New Feature Sneak Peek',
        content: 'Just wrapped up a new feature for PostRocket. Scheduling is about to get a major iOS-style upgrade. Sneak peek tomorrow!',
        slides: [],
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        status: 'scheduled',
        stats: { views: 0, likes: 0, comments: 0 },
        lastModified: new Date()
      },
      {
        id: 'demo-post-3',
        profileId: 'p1',
        type: 'carousel',
        title: 'SaaS Carousel Draft',
        content: '5 mistakes to avoid when building a SaaS product.',
        slides: [
          { title: 'Mistake #1', body: 'Building without a distribution plan.' },
          { title: 'Mistake #2', body: 'Ignoring customer feedback.' }
        ],
        scheduledDate: null,
        status: 'draft',
        stats: { views: 0, likes: 0, comments: 0 },
        lastModified: new Date(new Date().setDate(new Date().getDate() - 1))
      }
    ]);
  }

  // --- Navigation Logic ---
  navigateTo(view: View) {
    if (this.currentView() === view) return;
    
    this.loadingMessage.set('Loading...');
    this.isLoadingView.set(true);
    setTimeout(() => {
        this.currentView.set(view);
        this.isLoadingView.set(false);
    }, 500); // reduced transition time slightly
  }

  openNewPostModal() {
     this.isNewPostModalOpen.set(true);
  }

  createNewPost(title: string, type: 'text' | 'carousel') {
      const newPost: Post = {
        id: Math.random().toString(36).substring(7),
        profileId: this.activeProfileId(),
        type: type,
        title: title,
        content: '',
        slides: type === 'carousel' ? [{title: 'Slide 1', body: 'Start writing...'}] : [],
        status: 'draft',
        scheduledDate: null,
        stats: { views: 0, likes: 0, comments: 0 },
        lastModified: new Date()
      };

      // 1. Add to store
      this.posts.update(p => [newPost, ...p]);
      
      // 2. Set as active
      this.activeDraft.set(newPost);
      
      // 3. Navigate
      if (type === 'carousel') {
         this.navigateTo('CAROUSEL');
      } else {
         this.navigateTo('WRITE');
      }
      
      this.triggerNotification('Draft Created', `"${title}" has been saved.`);
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

  removeProfile(profileId: string) {
      const profileToRemove = this.profiles().find(p => p.id === profileId);
      if (!profileToRemove) return;

      this.profiles.update(p => p.filter(profile => profile.id !== profileId));
      
      // If the removed profile was the active one, switch to the first available one
      if (this.activeProfileId() === profileId) {
          const firstProfile = this.profiles()[0];
          if (firstProfile) {
              this.activeProfileId.set(firstProfile.id);
          }
      }
      this.triggerNotification('Account Removed', `Unlinked ${profileToRemove.name}.`);
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
