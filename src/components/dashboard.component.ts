
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { StoreService, View, LinkedProfile } from '../services/store.service';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { WriteScheduleComponent } from './dashboard/write-schedule.component';
import { ScheduleComponent } from './dashboard/schedule.component';
import { MyPostsComponent } from './dashboard/my-posts.component';
import { CarouselMakerComponent } from './dashboard/carousel-maker.component';
import { ViralPostsComponent } from './dashboard/viral-posts.component';
import { OnboardingModalComponent } from './dashboard/onboarding-modal.component';
import { SettingsComponent } from './dashboard/settings.component';
import { AnalyticsComponent } from './dashboard/analytics.component';
import { NewPostModalComponent } from './dashboard/new-post-modal.component';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    DashboardHomeComponent, 
    WriteScheduleComponent,
    ScheduleComponent,
    MyPostsComponent, 
    CarouselMakerComponent,
    ViralPostsComponent,
    OnboardingModalComponent,
    SettingsComponent,
    AnalyticsComponent,
    NewPostModalComponent,
    LogoComponent
  ],
  template: `
    <div class="flex h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      
      <!-- ONBOARDING MODAL -->
      @if (store.onboardingStep() !== 'IDLE' && store.onboardingStep() !== 'COMPLETE') {
         <app-onboarding-modal />
      }

      <!-- NEW POST MODAL -->
      @if (store.isNewPostModalOpen()) {
         <app-new-post-modal />
      }

      <!-- NOTIFICATIONS -->
      @if (store.activeNotification()) {
         <div class="absolute top-6 right-6 z-[100] bg-[#1C1C1C] text-white text-sm py-2 px-4 rounded-md shadow-lg animate-slide-in flex items-center gap-3">
            <span>{{ store.activeNotification()?.message }}</span>
            <button (click)="store.closeNotification()" class="text-white/50 hover:text-white">&times;</button>
         </div>
      }

      <!-- SIDEBAR -->
      <aside class="w-[280px] bg-white flex flex-col flex-shrink-0 z-20 py-4 pl-4 pr-4">
        
        <!-- Brand -->
        <div class="h-14 flex items-center px-4 mb-2 gap-3">
           <app-logo class="cursor-pointer" (click)="store.navigateTo('HOME')" />
           <span class="font-bold text-xl tracking-tight text-slate-900 cursor-pointer" (click)="store.navigateTo('HOME')">PostRocket</span>
        </div>

        <!-- PROFILE SWITCHER -->
        <div class="relative mb-4 px-1 z-50">
           <button (click)="toggleProfileMenu()" class="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 group text-left">
               <img [src]="store.activeProfile().avatar" class="w-9 h-9 rounded-full border border-slate-200 object-cover">
               <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-slate-700 truncate group-hover:text-slate-900">{{ store.activeProfile().name }}</div>
                  <div class="text-[11px] text-slate-400 truncate">{{ store.activeProfile().handle }}</div>
               </div>
               <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
           </button>

           <!-- Dropdown -->
           @if (isProfileMenuOpen()) {
               <div class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in z-50 p-1">
                  <div class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Profile</div>
                  
                  @for (profile of store.profiles(); track profile.id) {
                     <button (click)="selectProfile(profile)" class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group">
                        <div class="relative">
                            <img [src]="profile.avatar" class="w-8 h-8 rounded-full border border-slate-100 object-cover">
                            @if (store.activeProfileId() === profile.id) {
                                <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                                    <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                            }
                        </div>
                        <div class="flex-1 min-w-0">
                           <div class="text-xs font-bold text-slate-700 truncate">{{ profile.name }}</div>
                        </div>
                     </button>
                  }

                  <div class="h-px bg-slate-100 my-1 mx-2"></div>
                  
                  <button (click)="addNewAccount()" class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left text-slate-500 hover:text-blue-600">
                     <div class="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                     </div>
                     <div class="text-xs font-medium">Add Account</div>
                  </button>
               </div>
               
               <!-- Backdrop to close -->
               <div class="fixed inset-0 z-40" (click)="isProfileMenuOpen.set(false)"></div>
           }
        </div>

        <!-- Primary Action (New Post) -->
        <div class="mb-6">
           <button (click)="store.openNewPostModal()" class="bg-white hover:bg-slate-50 border border-slate-200 text-[#444746] text-sm font-medium py-3.5 px-6 rounded-2xl flex items-center gap-3 transition-all shadow-sm hover:shadow-md w-fit">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
             <span class="font-medium">New Post</span>
           </button>
        </div>

        <!-- Nav Links -->
        <nav class="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          
          <button (click)="store.navigateTo('HOME')" [class]="navClass('HOME')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
             Dashboard
          </button>

          <!-- NEW SCHEDULE BUTTON -->
          <button (click)="store.navigateTo('SCHEDULE')" [class]="navClass('SCHEDULE')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             Schedule
          </button>
          
          <button (click)="store.navigateTo('ANALYTICS')" [class]="navClass('ANALYTICS')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
             Analytics
          </button>

          <button (click)="store.navigateTo('MY_POSTS')" [class]="navClass('MY_POSTS')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
             My Posts
          </button>

          <button (click)="store.navigateTo('CAROUSEL')" [class]="navClass('CAROUSEL')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             Carousel Maker
          </button>

          <button (click)="store.navigateTo('VIRAL')" [class]="navClass('VIRAL')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             Inspiration
          </button>

          <div class="pt-4 mt-2 border-t border-slate-100"></div>

          <button (click)="store.navigateTo('SETTINGS')" [class]="navClass('SETTINGS')">
             <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             Settings
          </button>
        </nav>

        <!-- User Profile (Bottom) -->
        <div class="mt-4">
           <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors opacity-60 hover:opacity-100" (click)="authService.logout()">
              <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </div>
              <div class="flex-1 min-w-0">
                 <div class="text-xs font-medium text-slate-700 truncate">Log out</div>
              </div>
           </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto custom-scrollbar bg-white relative flex flex-col p-4">
         <div class="bg-white rounded-[24px] h-full overflow-hidden border border-slate-200 shadow-sm relative">
            
            <!-- PROFESSIONAL LOADING OVERLAY -->
            @if (store.isLoadingView()) {
                <div class="absolute inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in transition-all duration-300">
                   <!-- Just the spinning logo, no text -->
                   <app-logo logoClass="h-16 w-auto animate-spin-slow" />
                </div>
            }

            @if (!store.isLoadingView()) {
                <div class="flex-1 animate-fade-in h-full overflow-y-auto custom-scrollbar">
                    @switch (store.currentView()) {
                        @case ('HOME') { <app-dashboard-home /> }
                        @case ('WRITE') { <app-write-schedule /> }
                        @case ('SCHEDULE') { <app-schedule /> }
                        @case ('MY_POSTS') { <app-my-posts /> }
                        @case ('CAROUSEL') { <app-carousel-maker /> }
                        @case ('VIRAL') { <app-viral-posts /> }
                        @case ('SETTINGS') { <app-settings /> }
                        @case ('ANALYTICS') { <app-analytics /> }
                        @default { <app-dashboard-home /> }
                    }
                </div>
            }
         </div>
      </main>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 3px; }
    .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
    
    @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* Custom Slow Spin Animation */
    .animate-spin-slow {
      animation: spin 3s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
  store = inject(StoreService);
  isProfileMenuOpen = signal(false);

  navClass(view: View): string {
    const base = "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-full transition-colors mb-0.5 ";
    if (this.store.currentView() === view) {
      return base + "bg-[#C2E7FF] text-[#001D35]"; 
    }
    return base + "text-[#444746] hover:bg-slate-100";
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen.update(v => !v);
  }

  selectProfile(profile: LinkedProfile) {
      this.store.switchProfile(profile.id);
      this.isProfileMenuOpen.set(false);
  }

  addNewAccount() {
      // Simulate adding a new account for the demo
      const randomId = Math.floor(Math.random() * 1000);
      this.store.addProfile(`New User ${randomId}`, `@user${randomId}`);
      this.isProfileMenuOpen.set(false);
  }
}
