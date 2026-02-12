
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { HeroComponent } from './components/hero.component';
import { FooterComponent } from './components/footer.component';
import { HowItWorksComponent } from './components/how-it-works.component';
import { LoginModalComponent } from './components/login-modal.component';
import { DashboardComponent } from './components/dashboard.component';
import { PricingComponent } from './components/pricing.component';
import { ShowcaseComponent } from './components/showcase.component';
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    HowItWorksComponent,
    FooterComponent,
    LoginModalComponent,
    DashboardComponent,
    PricingComponent,
    ShowcaseComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  modalService = inject(ModalService);
  authService = inject(AuthService);
}
