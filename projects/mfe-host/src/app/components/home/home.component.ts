import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsLibService } from '@commons-lib';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  commonsLibService = inject(CommonsLibService);
  router = inject(Router);

  onLogout() {
    this.commonsLibService.signOut();
    this.router.navigate(['/login']);
  }
}
