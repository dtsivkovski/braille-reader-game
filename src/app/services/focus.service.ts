import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FocusService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Sets focus to an element with the specified ID
   * @param elementId The ID of the element to focus
   * @param delay Optional delay in milliseconds before setting focus
   */
  setFocus(elementId: string, delay: number = 100): void {
    // Only execute in browser environment
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.focus();
        }
      }, delay);
    }
  }

  /**
   * Announces a message to screen readers
   * @param message The message to announce
   */
  announce(message: string): void {
    // if in a browser then do the action
    if (isPlatformBrowser(this.platformId)) {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('class', 'sr-only');
      document.body.appendChild(announcer);
      
      setTimeout(() => {
        announcer.textContent = message;
        
        setTimeout(() => {
          document.body.removeChild(announcer);
        }, 1000);
      }, 100);
    }
  }
}
