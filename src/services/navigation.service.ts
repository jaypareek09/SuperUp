import { Injectable, signal } from '@angular/core';

export type Page = 'landing' | 'demo';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  currentPage = signal<Page>('landing');

  navigateTo(page: Page) {
    this.currentPage.set(page);
    // Ensure user starts at the top of the new "page"
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
