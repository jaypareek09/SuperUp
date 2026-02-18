
import { Component, inject } from '@angular/core';
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
           <h2 class="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-tight">
             One plan. Everything you need.
           </h2>
           <p class="text-slate-500 text-lg md:text-xl leading-relaxed">
              Simple pricing, powerful results. Start your 7-day free trial and get access to all features instantly.
           </p>
        </div>

        <div class="flex justify-center">
           
           <!-- SINGLE PRICING CARD -->
           <div class="bg-white rounded-[32px] p-8 border-2 border-[#0065FF] shadow-2xl shadow-blue-500/10 relative reveal z-10 w-full max-w-md flex flex-col transition-transform duration-300 hover:scale-[1.02]">
              
              <div class="flex justify-between items-center mb-4">
                 <h3 class="text-xl font-bold text-[#0F172A]">Pro Plan</h3>
                 <span class="text-xs font-bold bg-blue-50 text-[#0065FF] px-3 py-1 rounded-full border border-blue-100">All Inclusive</span>
              </div>
              <p class="text-slate-500 text-sm mb-6 h-10">Everything you need to grow a massive audience and generate leads.</p>
              
              <div class="mb-8">
                 <span class="text-5xl font-extrabold text-[#0F172A]">$20</span>
                 <span class="text-slate-400 font-medium">/mo</span>
              </div>
              
              <button (click)="modalService.open()" class="w-full py-3 bg-[#0065FF] rounded-lg font-bold text-white hover:bg-[#0052CC] hover:scale-[1.02] transition-all mb-8 shadow-lg shadow-blue-500/20">
                Start 7-Day Free Trial
              </button>
              
              <div class="space-y-4 mt-auto">
                 <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Includes all features:</p>
                 <ul class="space-y-3">
                    <li class="flex items-start gap-3 text-sm text-slate-800 font-medium">
                       <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                       <span>Unlimited AI Writing</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-800 font-medium">
                       <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                       <span>Smart Scheduling</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-800 font-medium">
                       <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                       <span>Deep Profile Analytics</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-800 font-medium">
                       <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                       <span>Advanced Carousel Maker</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-800 font-medium">
                       <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                       <span>Viral Post Database</span>
                    </li>
                    <li class="flex items-start gap-3 text-sm text-slate-800 font-medium">
                       <svg class="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                       <span>Priority Support</span>
                    </li>
                 </ul>
              </div>
           </div>

        </div>

        <!-- FAQ Section -->
        <div class="mt-24 max-w-4xl mx-auto reveal">
          <h3 class="text-2xl font-bold text-center text-[#0F172A] mb-8">Frequently Asked Questions</h3>
          <div class="space-y-4">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 class="font-bold text-slate-800 mb-2">Can I cancel anytime?</h4>
              <p class="text-sm text-slate-500 leading-relaxed">Yes, you can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing period, with no extra charges.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 class="font-bold text-slate-800 mb-2">What happens after my 7-day free trial?</h4>
              <p class="text-sm text-slate-500 leading-relaxed">We will notify you before your trial ends. You can then decide to upgrade to a paid plan to keep your Pro features, or your account will automatically be downgraded to our free plan.</p>
            </div>
             <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 class="font-bold text-slate-800 mb-2">Do you offer refunds?</h4>
              <p class="text-sm text-slate-500 leading-relaxed">Due to the nature of our service, we do not offer refunds. However, you can cancel your subscription at any time to avoid future charges.</p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  `
})
export class PricingComponent {
  modalService = inject(ModalService);
}
