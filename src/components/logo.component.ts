import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img 
      src="https://raw.githubusercontent.com/jaypareek09/jay/3d276168cad002a9b839a1c867acf479928aa7f3/POSTROCKET%20-%20LOGO.png" 
      alt="PostRocket Logo"
      [class]="logoClass()"
      [class.invert]="theme() === 'dark'"
      [class.brightness-200]="theme() === 'dark'"
      [class.hue-rotate-180]="theme() === 'dark'"
    >
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
    }
  `]
})
export class LogoComponent {
  logoClass = input<string>('h-10 w-auto');
  theme = input<'light' | 'dark'>('light');

  // Deprecated inputs for backwards compatibility
  fillColor = input<string>();
  strokeColor = input<string>();
}
