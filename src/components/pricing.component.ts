
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pricing" class="py-32 px-6 bg-white scroll-mt-24 relative overflow-hidden">
      
      <!-- Ambient Background -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto">
        
        <div class="text-center max-w-3xl mx-auto mb-16 reveal">
           <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0065FF] text-xs font-semibold uppercase tracking-wide mb-6">
             <span class="w-2 h-2 rounded-full bg-[#0065FF] animate-pulse"></span>
             Limited Time Offer
           </div>
           <h2 class="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-tight">
             Plans that 
             <span class="inline-block bg-[#E8F0FE] text-[#1967D2] px-4 py-1 rounded-full">pay for themselves.</span>
           </h2>
           <p class="text-slate-500 text-lg md:text-xl leading-relaxed">Stop wasting hours on content. Start treating your LinkedIn like a business.</p>
        </div>

        <!-- Toggle Switch -->
        <div class="flex justify-center mb-16 reveal">
           <div class="bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-sm inline-flex relative">
              <div class="absolute inset-1 bg-[#0065FF] rounded-md transition-all duration-300 shadow-sm w-[100px]" 
                   [class.translate-x-0]="billingCycle() === 'monthly'"
                   [class.translate-x-[108px]]="billingCycle() === 'yearly'"></div>
              
              <button (click)="billingCycle.set('monthly')" class="relative z-10 w-[100px] py-2 text-sm font-semibold rounded-md transition-colors duration-300"
                      [class.text-white]="billingCycle() === 'monthly'"
                      [class.text-slate-500]="billingCycle() === 'yearly'">
                 Monthly
              </button>
              <button (click)="billingCycle.set('yearly')" class="relative z-10 w-[108px] py-2 text-sm font-semibold rounded-md transition-colors duration-300 flex items-center justify-center gap-1"
                      [class.text-white]="billingCycle() === 'yearly'"
                      [class.text-slate-500]="billingCycle() === 'monthly'">
                 Yearly
                 <span class="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold ml-1">-20%</span>
              </button>
           </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
           
           <!-- STARTER ($15) -->
           <div class="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group reveal">
              <div class="flex justify-between items-center mb-4">
                 <h3 class="text-xl font-bold text-[#0F172A]">Starter</h3>
              </div>
              <p class="text-slate-500 text-sm mb-6 h-10">Perfect for individuals just getting started with personal branding.</p>
              
              <div class="mb-8">
                 <span class="text-4xl font-extrabold text-[#0F172A]">
                    {{ billingCycle() === 'monthly' ? '$15' : '$12' }}
                 </span>
                 <span class="text-slate-400 font-medium">/mo</span>
                 @if (billingCycle() === 'yearly') {
                   <div class="text-xs text-green-600 font-medium mt-1">Billed $144 yearly</div>
                 }
              </div>
              
              <button (click)="modalService.open()" class="w-full py-4 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all mb-8">
                Get Started
              </button>
              
              <div class="space-y-4">
                 <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Features</p>
                 <ul class="space-y-3">
                    <li class="flex items-start gap-3 text-sm text-slate-600">
                       <svg class="w-5 h-5 text-[#0065FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span>15 AI-Generated Posts/mo</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-600">
                       <svg class="w-5 h-5 text-[#0065FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span>Basic Scheduling</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-600">
                       <svg class="w-5 h-5 text-[#0065FF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span>Profile Analytics (30 days)</span>
                    </li>
                 </ul>
              </div>
           </div>

           <!-- PRO ($30) -->
           <div class="bg-black rounded-[32px] p-8 border border-slate-800 shadow-2xl relative reveal scale-105 z-10 overflow-hidden group">
              
              <!-- Gradient Glow -->
              <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -z-10 pointer-events-none group-hover:bg-blue-600/30 transition-colors"></div>

              <div class="flex justify-between items-center mb-4">
                 <h3 class="text-xl font-bold text-white">Pro</h3>
                 <span class="text-xs font-bold bg-[#0065FF] text-white px-3 py-1 rounded-full shadow-lg shadow-blue-900/50">Most Popular</span>
              </div>
              <p class="text-slate-400 text-sm mb-6 h-10">Everything you need to grow a massive audience and generate leads.</p>
              
              <div class="mb-8">
                 <span class="text-5xl font-extrabold text-white">
                   {{ billingCycle() === 'monthly' ? '$30' : '$24' }}
                 </span>
                 <span class="text-slate-400 font-medium">/mo</span>
                 @if (billingCycle() === 'yearly') {
                   <div class="text-xs text-green-400 font-medium mt-1">Billed $288 yearly</div>
                 }
              </div>
              
              <button (click)="modalService.open()" class="w-full py-4 bg-[#0065FF] rounded-lg font-bold text-white hover:bg-[#0052CC] hover:scale-[1.02] transition-all mb-8 shadow-lg shadow-blue-900/20">
                Get Started
              </button>
              
              <div class="space-y-4">
                 <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Everything in Starter, plus:</p>
                 <ul class="space-y-3">
                    <li class="flex items-start gap-3 text-sm text-slate-300">
                       <svg class="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span class="font-medium text-white">Unlimited AI Writing</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-300">
                       <svg class="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span class="font-medium text-white">Advanced Carousel Maker</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-300">
                       <svg class="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span>Viral Post Database</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-300">
                       <svg class="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <span>Lead CRM Integration</span>
                    </li>
                 </ul>
              </div>
           </div>

        </div>
        
      </div>
    </section>
  `
})
export class PricingComponent {
  modalService = inject(ModalService);
  billingCycle = signal<'monthly' | 'yearly'>('monthly');
}
