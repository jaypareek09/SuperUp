
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { StoreService, View } from '../services/store.service';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { WriteScheduleComponent } from './dashboard/write-schedule.component';
import { CarouselMakerComponent } from './dashboard/carousel-maker.component';
import { ViralPostsComponent } from './dashboard/viral-posts.component';
import { ExtensionPageComponent } from './dashboard/extension-page.component';
import { EngagementComponent } from './dashboard/engagement.component';
import { ProspectsComponent } from './dashboard/prospects.component';
import { OnboardingModalComponent } from './dashboard/onboarding-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    DashboardHomeComponent, 
    WriteScheduleComponent, 
    CarouselMakerComponent,
    ViralPostsComponent,
    ExtensionPageComponent,
    EngagementComponent,
    ProspectsComponent,
    OnboardingModalComponent
  ],
  template: `
    <div class="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans relative">
      
      <!-- ONBOARDING MODAL OVERLAY -->
      @if (store.onboardingStep() !== 'IDLE' && store.onboardingStep() !== 'COMPLETE') {
         <app-onboarding-modal />
      }

      <!-- GLOBAL NOTIFICATION ALERT -->
      @if (store.activeNotification()) {
         <div class="absolute top-6 right-6 z-[100] bg-white border-l-4 border-blue-600 rounded-lg shadow-2xl p-4 w-96 animate-slide-in flex gap-4 items-start">
            <div class="text-blue-600 mt-1">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <div class="flex-1">
               <h3 class="font-bold text-slate-900">{{ store.activeNotification()?.title }}</h3>
               <p class="text-slate-600 text-sm mt-1 leading-relaxed">{{ store.activeNotification()?.message }}</p>
            </div>
            <button (click)="store.closeNotification()" class="text-slate-400 hover:text-slate-600">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
         </div>
      }

      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-20">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-slate-100 cursor-pointer" (click)="store.currentView.set('HOME')">
           <span class="text-xl font-extrabold tracking-tight text-[#0F172A]">SuperUp.</span>
        </div>

        <!-- Main Action -->
        <div class="p-4">
          <button (click)="store.currentView.set('WRITE')" class="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 group">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Write a Post
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
          
          <button (click)="store.currentView.set('HOME')" [class]="navClass('HOME')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </button>

          <button (click)="store.currentView.set('WRITE')" [class]="navClass('WRITE')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Write Post
          </button>

          <button (click)="store.currentView.set('CAROUSEL')" [class]="navClass('CAROUSEL')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
             Carousel Maker
          </button>

          <button (click)="store.currentView.set('ENGAGEMENT')" [class]="navClass('ENGAGEMENT')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
             Engagement Hub
          </button>

          <button (click)="store.currentView.set('VIRAL')" [class]="navClass('VIRAL')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
            Viral posts
          </button>

          <button (click)="store.currentView.set('PROSPECTS')" [class]="navClass('PROSPECTS')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Prospect Hub
          </button>

          <button (click)="store.currentView.set('EXTENSION')" [class]="navClass('EXTENSION')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Chrome Extension
          </button>
        </nav>

        <!-- User Profile -->
        <div class="p-4 border-t border-slate-100">
           <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors" (click)="authService.logout()">
              @if (authService.currentUser()?.avatar) {
                 <img [src]="authService.currentUser()?.avatar" class="w-9 h-9 rounded-full object-cover border border-slate-200">
              } @else {
                 <div class="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                 </div>
              }
              <div class="flex-1 min-w-0">
                 <div class="text-sm font-semibold text-slate-900 truncate">{{ authService.currentUser()?.name || 'Waiting for Sync...' }}</div>
                 <div class="text-xs text-slate-500 truncate">1 seat • Free Plan</div>
              </div>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
           </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
        
        <!-- Header -->
        <header class="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200/60">
           <div class="flex items-center gap-4">
               <h1 class="text-xl font-bold text-[#0F172A]">
                 @switch(store.currentView()) {
                   @case('HOME') { 
                      @if (store.isExtensionInstalled()) {
                         Hi {{ authService.currentUser()?.name?.split(' ')?.[0] }}, Welcome back.
                      } @else {
                         Dashboard
                      }
                   }
                   @case('WRITE') { Write Post }
                   @case('CAROUSEL') { Carousel Maker }
                   @case('VIRAL') { Viral Post Search }
                   @case('EXTENSION') { Chrome Extension }
                   @case('ENGAGEMENT') { Engagement Hub }
                   @case('PROSPECTS') { Prospect Hub }
                 }
               </h1>
               
               <!-- Connection Badge -->
               @if (store.isExtensionInstalled()) {
                   <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
                      <div class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </div>
                      <span class="text-[10px] font-bold text-green-700 uppercase tracking-wide">Extension Connected</span>
                   </div>
               } @else {
                   <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                      <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Pending Sync</span>
                   </div>
               }
           </div>
           
           <div class="flex items-center gap-4">
             <div class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
               AI Credits: 45/100
             </div>
             <button class="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
               Help
             </button>
           </div>
        </header>

        <div class="p-8 max-w-[1600px] mx-auto">
          @switch (store.currentView()) {
            @case ('HOME') { <app-dashboard-home /> }
            @case ('WRITE') { <app-write-schedule /> }
            @case ('CAROUSEL') { <app-carousel-maker /> }
            @case ('VIRAL') { <app-viral-posts /> }
            @case ('EXTENSION') { <app-extension-page /> }
            @case ('ENGAGEMENT') { <app-engagement /> }
            @case ('PROSPECTS') { <app-prospects /> }
            @default { <app-dashboard-home /> }
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #E2E8F0;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #CBD5E1;
    }
    .animate-slide-in {
      animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
  store = inject(StoreService);

  navClass(view: View): string {
    const base = "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ";
    if (this.store.currentView() === view) {
      return base + "text-blue-700 bg-blue-50";
    }
    return base + "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
  }
}
