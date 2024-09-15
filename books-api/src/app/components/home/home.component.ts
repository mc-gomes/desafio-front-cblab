import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksSearchComponent} from '../books-search/books-search.component';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BooksSearchComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Faça sua pesquisa" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Buscar</button>
      </form>
    </section>
    <section class="results">
      <app-books-search></app-books-search>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  filteredBooks: any[] = [];

  constructor(private booksService: BooksService) {}

  filterResults(query: string) {
    if (!query) {
      return;
    }

    this.booksService.searchBooksByQuery(query).subscribe({
      next: (res: any) => {
        this.filteredBooks = res.items || []
        console.log('Livros encontrados:', this.filteredBooks)
      },
      error: (e) => console.log('Erro ao busscar livros', e)
    });
  }
  
}