import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonsLibService } from '@commons-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mfe-host';
  constructor(public commonsLibService: CommonsLibService) {}
}
