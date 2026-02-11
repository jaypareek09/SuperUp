
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
              <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">S.</span>
              SuperUp Extension Kit v1.1
           </h2>
           <p class="text-slate-500 text-sm mt-1">Production-ready code for LinkedIn monitoring & analytics extraction.</p>
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
              <!-- SIMULATE DATA SYNC -->
              <button (click)="simulateSync()" [disabled]="isSyncing()" class="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
                 @if (isSyncing()) {
                    <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Syncing...
                 } @else {
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    Simulate Data Sync
                 }
              </button>
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
               <button (click)="downloadAll()" class="w-full bg-[#0F172A] text-white font-bold text-xs py-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download .ZIP (Simulated)
               </button>
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

      <!-- Instructions Footer -->
      <div class="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start">
         <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
         </div>
         <div>
            <h4 class="font-bold text-blue-900 mb-2">Installation Guide</h4>
            <ol class="list-decimal list-inside space-y-1 text-sm text-blue-800">
               <li>Create a folder named <code>superup-extension</code> on your desktop.</li>
               <li>Create the files listed on the left inside that folder and paste the code provided.</li>
               <li>Open Chrome, go to <code>chrome://extensions</code>, and toggle <strong>Developer Mode</strong> (top right).</li>
               <li>Click <strong>Load Unpacked</strong> and select your folder.</li>
               <li>Open LinkedIn and pin the SuperUp extension!</li>
            </ol>
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
    { id: 'background', name: 'background.js', icon: 'https://cdn-icons-png.flaticon.com/512/136/136530.png' },
    { id: 'content', name: 'content.js', icon: 'https://cdn-icons-png.flaticon.com/512/136/136530.png' },
    { id: 'popup_html', name: 'popup.html', icon: 'https://cdn-icons-png.flaticon.com/512/136/136528.png' },
    { id: 'popup_js', name: 'popup.js', icon: 'https://cdn-icons-png.flaticon.com/512/136/136530.png' },
    { id: 'styles', name: 'styles.css', icon: 'https://cdn-icons-png.flaticon.com/512/136/136527.png' }
  ];

  fileContent: Record<string, string> = {
    manifest: `{
  "manifest_version": 3,
  "name": "SuperUp - LinkedIn Growth Engine",
  "version": "1.0.0",
  "description": "Monitor engagement, extract analytics, and schedule posts for LinkedIn.",
  "permissions": [
    "activeTab",
    "storage",
    "scripting",
    "alarms"
  ],
  "host_permissions": [
    "https://www.linkedin.com/*",
    "https://app.superup.ai/*"
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.linkedin.com/*"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_end"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["assets/*"],
      "matches": ["https://www.linkedin.com/*"]
    }
  ]
}`,
    background: `// background.js - The Brain
let isMonitoring = true;

// 1. Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("SuperUp Extension Installed");
  chrome.storage.local.set({ status: 'active', userToken: null });
});

// 2. Message Handler (Communication Hub)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if (request.action === "getData") {
    // Send data to backend (Simulated)
    console.log("Received Analytics:", request.data);
    
    // In production, fetch('https://api.superup.ai/sync', ...)
    sendResponse({ status: "synced" });
  }
  
  if (request.action === "getStatus") {
    sendResponse({ isMonitoring });
  }

  if (request.action === "toggleMonitoring") {
    isMonitoring = request.value;
    // Broadcast to tabs
    chrome.tabs.query({url: "*://www.linkedin.com/*"}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { action: "updateStatus", isMonitoring });
      });
    });
  }
});

// 3. Keep-alive alarm (Service workers go dormant)
chrome.alarms.create("keepAlive", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {
  // Ping backend to check for new scheduled posts
  console.log("Checking for scheduled posts...");
});`,
    content: `// content.js - The Eye (Runs on LinkedIn)

console.log("%c SuperUp Active ", "background: #2563EB; color: white; padding: 4px; border-radius: 4px;");

// --- 1. Selectors (The scraping logic) ---
const SELECTORS = {
  feedPost: '.feed-shared-update-v2',
  authorName: '.update-components-actor__name',
  postContent: '.update-components-text',
  likes: '.social-details-social-counts__reactions-count',
  comments: '.social-details-social-counts__comments',
  profileName: '.text-heading-xlarge',
  profileHeadline: '.text-body-medium'
};

// --- 2. Data Extraction Functions ---

function scrapeFeed() {
  const posts = document.querySelectorAll(SELECTORS.feedPost);
  const data = [];

  posts.forEach(post => {
    try {
      const author = post.querySelector(SELECTORS.authorName)?.innerText;
      const content = post.querySelector(SELECTORS.postContent)?.innerText;
      const likes = post.querySelector(SELECTORS.likes)?.innerText || "0";
      
      if (author && content) {
        data.push({
          author: author.trim(),
          content: content.trim().substring(0, 100) + "...",
          stats: { likes, timestamp: new Date().toISOString() }
        });
      }
    } catch (e) {
      // Silent fail for individual posts
    }
  });

  if (data.length > 0) {
    chrome.runtime.sendMessage({ action: "getData", data: data });
  }
}

// --- 3. UI Injection (The "SuperUp" Overlay) ---

function injectDashboard() {
  if (document.getElementById('superup-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'superup-overlay';
  overlay.innerHTML = \`
    <div class="su-header">
      <div class="su-logo">S.</div>
      <span>SuperUp Monitor</span>
      <div class="su-live"></div>
    </div>
    <div class="su-stats">
      <div class="su-stat">
        <label>Scraped</label>
        <span id="su-count">0</span>
      </div>
      <div class="su-stat">
        <label>Status</label>
        <span class="su-badge">Active</span>
      </div>
    </div>
    <button id="su-action">Analyze Profile</button>
  \`;

  document.body.appendChild(overlay);
  
  // Update count periodically
  setInterval(() => {
    const count = document.querySelectorAll(SELECTORS.feedPost).length;
    const el = document.getElementById('su-count');
    if(el) el.innerText = count;
  }, 2000);
}

// --- 4. Observers (Handle Single Page App Navigation) ---

const observer = new MutationObserver((mutations) => {
  // Debounce logic could go here
  if (window.location.href.includes('/feed/')) {
    scrapeFeed();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Init
setTimeout(injectDashboard, 2000);
scrapeFeed(); // Initial run`,
    popup_html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SuperUp</title>
  <link rel="stylesheet" href="styles.css">
  <style>
     body { width: 320px; height: 400px; margin: 0; font-family: -apple-system, system-ui, sans-serif; background: #F8FAFC; }
     .header { background: #0F172A; color: white; padding: 20px; }
     .logo { font-weight: 800; font-size: 18px; display: flex; align-items: center; gap: 8px; }
     .logo-box { width: 24px; height: 24px; background: #2563EB; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
     .content { padding: 20px; }
     .status-card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 15px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
     .status-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
     .indicator { width: 8px; height: 8px; background: #22C55E; border-radius: 50%; display: inline-block; margin-right: 6px; }
     .indicator.paused { background: #F59E0B; }
     .btn { background: #0F172A; color: white; width: 100%; padding: 12px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
     .btn:hover { background: #1E293B; }
     .btn-secondary { background: white; border: 1px solid #CBD5E1; color: #475569; margin-top: 10px; }
     .btn-secondary:hover { background: #F1F5F9; }
     .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
     .metric { background: #F1F5F9; padding: 10px; border-radius: 8px; text-align: center; }
     .metric-val { font-weight: bold; font-size: 16px; color: #0F172A; }
     .metric-label { font-size: 10px; color: #64748B; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-box">S.</div>
      SuperUp
    </div>
  </div>
  <div class="content">
    <div class="status-card">
      <div class="status-row">
         <span style="font-weight: 600; font-size: 14px; color: #334155;">System Status</span>
         <span id="status-text" style="font-size: 12px; color: #22C55E;"><span class="indicator" id="indicator"></span>Monitoring</span>
      </div>
      <div class="metrics">
         <div class="metric">
            <div class="metric-val" id="posts-scraped">0</div>
            <div class="metric-label">Posts Scraped</div>
         </div>
         <div class="metric">
            <div class="metric-val" id="api-req">0</div>
            <div class="metric-label">API Syncs</div>
         </div>
      </div>
    </div>
    
    <button id="toggle-btn" class="btn">Pause Monitoring</button>
    <button id="dashboard-btn" class="btn btn-secondary">Open Dashboard</button>
  </div>
  <script src="popup.js"></script>
</body>
</html>`,
    popup_js: `// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const indicator = document.getElementById('indicator');
  const statusText = document.getElementById('status-text');
  
  let isMonitoring = true;

  // Load state
  chrome.storage.local.get(['status'], (result) => {
    if (result.status === 'paused') {
      setPaused();
    }
  });

  toggleBtn.addEventListener('click', () => {
    isMonitoring = !isMonitoring;
    if (isMonitoring) {
      setActive();
      chrome.runtime.sendMessage({ action: "toggleMonitoring", value: true });
      chrome.storage.local.set({ status: 'active' });
    } else {
      setPaused();
      chrome.runtime.sendMessage({ action: "toggleMonitoring", value: false });
      chrome.storage.local.set({ status: 'paused' });
    }
  });

  document.getElementById('dashboard-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://app.superup.ai' });
  });

  function setActive() {
    toggleBtn.innerText = "Pause Monitoring";
    toggleBtn.style.background = "#0F172A";
    indicator.classList.remove('paused');
    statusText.innerHTML = '<span class="indicator" id="indicator"></span>Monitoring';
  }

  function setPaused() {
    toggleBtn.innerText = "Resume Monitoring";
    toggleBtn.style.background = "#22C55E";
    indicator.classList.add('paused');
    statusText.innerHTML = '<span class="indicator paused" id="indicator"></span>Paused';
  }
});`,
    styles: `/* Injected Overlay Styles */
#superup-overlay {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 220px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  border: 1px solid #E2E8F0;
  z-index: 99999;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.su-header {
  background: #0F172A;
  color: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
}

.su-logo {
  width: 20px;
  height: 20px;
  background: #2563EB;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.su-live {
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  margin-left: auto;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.su-stats {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.su-stat {
  display: flex;
  flex-direction: column;
}

.su-stat label {
  font-size: 10px;
  color: #64748B;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
}

#su-count {
  font-size: 20px;
  font-weight: 800;
  color: #0F172A;
}

.su-badge {
  background: #DCFCE7;
  color: #166534;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  align-self: start;
}

#su-action {
  width: calc(100% - 32px);
  margin: 0 16px 16px 16px;
  padding: 8px;
  background: white;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

#su-action:hover {
  border-color: #2563EB;
  color: #2563EB;
}`
  };

  getFileName() {
    return this.filesList.find(f => f.id === this.activeFile())?.name || '';
  }

  getActiveCode() {
    return this.fileContent[this.activeFile()] || '';
  }

  // Simple syntax highlighting simulation for HTML display
  getHighlightedCode() {
    let code = this.getActiveCode();
    // Rudimentary highlighting for visual appeal
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
    alert("In a real environment, this would download a .zip file of 'superup-extension'. For now, please create the files manually using the code provided.");
  }
  
  simulateSync() {
    this.isSyncing.set(true);
    // Simulate extension handshake delay
    setTimeout(() => {
       this.store.syncExtensionData({ name: 'Real User' });
       this.authService.updateProfile('Real User', 'https://picsum.photos/seed/realuser/100/100');
       this.isSyncing.set(false);
       this.store.currentView.set('HOME');
    }, 2500);
  }
}
