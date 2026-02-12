
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer id="footer" class="bg-[#0F172A] text-white pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Top Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-800 pb-16 mb-16">
           <div>
             <h2 class="text-4xl font-bold tracking-tight mb-6">Start growing today.</h2>
             <p class="text-slate-400 text-lg max-w-md">Be one of the first to use PostRocket to dominate LinkedIn.</p>
           </div>
           <div class="flex flex-col sm:flex-row gap-4 items-start md:items-center md:justify-end">
              <input type="email" placeholder="Enter your email" class="bg-slate-800 border border-slate-700 text-white rounded-lg px-6 py-4 outline-none focus:border-blue-500 w-full sm:w-80 transition-colors">
              <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/50">
                Join Waitlist
              </button>
           </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div class="col-span-2 md:col-span-2 pr-8">
            <div class="flex items-center gap-3 mb-6 cursor-pointer" (click)="scrollToTop()">
               <img src="https://raw.githubusercontent.com/jaypareek09/jay/f8f0e8a4249db057b6d86eb42a6139b6abaa8287/POSTROCKET%20-%20LOGO.png" alt="PostRocket" class="h-8 w-auto brightness-0 invert">
               <span class="font-bold text-xl tracking-tight text-white">PostRocket</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              The AI operating system for LinkedIn. We help you write, schedule, and analyze your content 10x faster.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold text-white mb-6">Product</h4>
            <ul class="space-y-4 text-sm text-slate-400">
               <li><a (click)="scrollTo('pricing')" class="cursor-pointer hover:text-white transition-colors">Pricing</a></li>
               <li><a href="#" class="hover:text-white transition-colors">Changelog</a></li>
               <li><a href="#" class="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-white mb-6">Resources</h4>
            <ul class="space-y-4 text-sm text-slate-400">
               <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
               <li><a href="#" class="hover:text-white transition-colors">Community</a></li>
               <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
               <li><a href="#" class="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-white mb-6">Legal</h4>
            <ul class="space-y-4 text-sm text-slate-400">
               <li><a href="#" class="hover:text-white transition-colors">Privacy</a></li>
               <li><a href="#" class="hover:text-white transition-colors">Terms</a></li>
               <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-start gap-4">
           <div class="flex flex-col gap-3">
             <p class="text-xs text-slate-500">Copyright © 2026 PostRocket. All rights reserved.</p>
             <p class="text-[10px] text-slate-600 max-w-lg leading-relaxed">
               Disclaimer: PostRocket is not endorsed by or affiliated with the LinkedIn Corporation, registered in the U.S. and other countries. LinkedIn is a trademark of the LinkedIn Corporation.
             </p>
           </div>
           
           <div class="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
             <span class="w-2 h-2 rounded-full bg-green-500"></span>
             All systems operational
           </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
