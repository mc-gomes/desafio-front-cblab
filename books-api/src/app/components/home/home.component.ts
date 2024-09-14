import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksSearchComponent} from '../books-search/books-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BooksSearchComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Faça sua pesquisa"/>
        <button class="primary" type="button">Buscar</button>
      </form>
    </section>
    <section class="results">
      <app-books-search></app-books-search>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent { }