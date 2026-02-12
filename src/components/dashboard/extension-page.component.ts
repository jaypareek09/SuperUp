
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-extension-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto animate-fade-in pb-20">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
           <h2 class="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
              PostRocket Extension Source Code
           </h2>
           <p class="text-slate-500 text-sm mt-1">Copy these files to create your local extension.</p>
        </div>
        
        <div class="flex gap-3">
           @if (store.isExtensionInstalled()) {
              <div class="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-100 flex items-center gap-2">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Connected
              </div>
           } @else {
               <div class="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full border border-orange-100 flex items-center gap-2">
                 Not Detected
               </div>
           }
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
         
         <!-- Sidebar: File Explorer -->
         <div class="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div class="p-4 border-b border-slate-100 bg-slate-50/50">
               <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Extension Files</h3>
            </div>
            
            <div class="flex-1 overflow-y-auto">
               @for (file of filesList; track file.id) {
                  <button 
                    (click)="activeFile.set(file.id)" 
                    [class.bg-blue-50]="activeFile() === file.id"
                    [class.text-blue-700]="activeFile() === file.id"
                    [class.border-l-4]="activeFile() === file.id"
                    [class.border-blue-600]="activeFile() === file.id"
                    [class.border-l-transparent]="activeFile() !== file.id"
                    class="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-all text-left border-l-4"
                  >
                     <img [src]="file.icon" class="w-4 h-4 opacity-70">
                     <span class="font-mono">{{ file.name }}</span>
                  </button>
               }
            </div>

            <div class="p-4 border-t border-slate-100 bg-slate-50">
               <div class="text-[10px] text-slate-500 text-center mb-2">
                 1. Create folder "postrocket-ext"<br>
                 2. Create these files<br>
                 3. Load Unpacked in Chrome
               </div>
            </div>
         </div>

         <!-- Editor Area -->
         <div class="lg:col-span-3 bg-[#1E293B] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden relative group">
            
            <!-- Window Controls -->
            <div class="h-10 bg-[#0F172A] border-b border-slate-700 flex items-center justify-between px-4">
               <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
               </div>
               <div class="text-xs font-mono text-slate-400">{{ getFileName() }}</div>
               <button (click)="copyCode()" class="text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">
                  Copy Code
               </button>
            </div>

            <!-- Code Content -->
            <div class="flex-1 overflow-auto custom-scrollbar p-6 relative">
               <pre class="font-mono text-sm leading-relaxed"><code [innerHTML]="getHighlightedCode()"></code></pre>
            </div>
         </div>

      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; border: 2px solid #1E293B; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #0F172A; }
    
    /* Syntax Highlighting Mock */
    :host ::ng-deep .keyword { color: #C678DD; }
    :host ::ng-deep .string { color: #98C379; }
    :host ::ng-deep .function { color: #61AFEF; }
    :host ::ng-deep .comment { color: #5C6370; font-style: italic; }
    :host ::ng-deep .number { color: #D19A66; }
  `]
})
export class ExtensionPageComponent {
  store = inject(StoreService);
  authService = inject(AuthService);
  activeFile = signal<string>('manifest');
  isSyncing = signal(false);

  filesList = [
    { id: 'manifest', name: 'manifest.json', icon: 'https://cdn-icons-png.flaticon.com/512/136/136525.png' },
    { id: 'content', name: 'content.js', icon: 'https://cdn-icons-png.flaticon.com/512/136/136530.png' },
    { id: 'background', name: 'background.js', icon: 'https://cdn-icons-png.flaticon.com/512/136/136530.png' }
  ];

  fileContent: Record<string, string> = {
    manifest: `{
  "manifest_version": 3,
  "name": "PostRocket - LinkedIn Sync",
  "version": "1.0",
  "permissions": [
    "storage"
  ],
  "host_permissions": [
    "https://www.linkedin.com/*",
    "http://localhost:4200/*",
    "https://*.stackblitz.io/*" 
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.linkedin.com/*", "http://localhost:4200/*", "https://*.stackblitz.io/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ]
}`,
    content: `// content.js - THE REAL SCRAPER

// 1. LINKEDIN SCRAPING LOGIC
if (window.location.hostname.includes("linkedin.com")) {
    
    console.log("PostRocket: Active on LinkedIn");

    // Helper to extract data from LinkedIn's feed sidebar (Left Rail)
    function scrapeProfile() {
        // Try multiple selectors because LinkedIn changes classes often
        const nameEl = document.querySelector(".feed-identity-module__actor-meta .text-heading-large") || 
                       document.querySelector(".entity-result__title-text");
                       
        const headlineEl = document.querySelector(".feed-identity-module__actor-meta .text-body-small") ||
                           document.querySelector(".entity-result__primary-subtitle");
                           
        const avatarEl = document.querySelector(".feed-identity-module__member-photo") || 
                         document.querySelector(".ghost-person");

        if (nameEl) {
            const data = {
                name: nameEl.innerText.trim(),
                headline: headlineEl ? headlineEl.innerText.trim() : "LinkedIn Member",
                avatar: avatarEl ? avatarEl.src : "",
                location: "Detected via Extension"
            };
            
            // Save to Chrome Storage so we can pass it to the dashboard tab later
            chrome.storage.local.set({ "postrocket_profile": data });
            console.log("PostRocket: Scraped & Saved", data);
        }
    }

    // Run scraper when feed loads
    setTimeout(scrapeProfile, 3000);
    setInterval(scrapeProfile, 10000); // Retry every 10s
}

// 2. DASHBOARD COMMUNICATION LOGIC
else {
    // We are on the PostRocket App (Localhost or Stackblitz)
    console.log("PostRocket: Active on Dashboard");

    // Listen for the "PING" from the Angular App
    window.addEventListener("message", (event) => {
        if (event.data && event.data.type === "POSTROCKET_PING") {
            console.log("PostRocket: Ping Received, checking storage...");
            
            // Fetch the scraped data from storage
            chrome.storage.local.get(["postrocket_profile"], (result) => {
                if (result.postrocket_profile) {
                    
                    const payload = {
                        user: result.postrocket_profile,
                        stats: {
                            followers: 1240, // Mock stats for now (real scraping requires more complex logic)
                            profileViews: 342,
                            postImpressions: 15200,
                            engagementRate: 3.4
                        },
                        recentPosts: []
                    };

                    // Send the data BACK to the Angular App
                    window.postMessage({
                        type: "POSTROCKET_EXTENSION_DATA",
                        payload: payload
                    }, "*");
                }
            });
        }
    });
}`,
    background: `// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("PostRocket Installed");
});`
  };

  getFileName() {
    return this.filesList.find(f => f.id === this.activeFile())?.name || '';
  }

  getActiveCode() {
    return this.fileContent[this.activeFile()] || '';
  }

  getHighlightedCode() {
    let code = this.getActiveCode();
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    code = code.replace(/(".*?")/g, '<span class="string">$1</span>');
    code = code.replace(/(function|const|let|var|return|if|else|import|from|class)/g, '<span class="keyword">$1</span>');
    code = code.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    return code;
  }

  copyCode() {
    navigator.clipboard.writeText(this.getActiveCode()).then(() => {
       alert(`${this.getFileName()} copied to clipboard!`);
    });
  }

  downloadAll() {
    alert("Please create these files manually in a folder and load them into Chrome Extensions (Developer Mode).");
  }
}
