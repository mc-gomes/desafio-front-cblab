import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, RouterLink, RouterOutlet],
  template: `
    <main>
      <header class="brand-name">
        <nav>
          <a [routerLink]="['/']">Página Inicial</a>
          <span>|</span>
          <a [routerLink]="['/favorites']">Favoritos</a>
        </nav>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'books-api';
}
