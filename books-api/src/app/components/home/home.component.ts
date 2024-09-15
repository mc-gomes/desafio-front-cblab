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
        <input
          type="text"
          placeholder="Faça sua pesquisa"
          #filter
          (keyup.enter)="filterResults(filter.value)"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Buscar
        </button>
      </form>
    </section>
    <section class="results">
      <app-books-search
        *ngFor="let book of filteredBooksList"
        [book]="book"
      ></app-books-search>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  filteredBooksList: any[] = [];
  loading = false;

  constructor(private booksService: BooksService) {}

  filterResults(query: string) {
    if (!query) {
      return;
    }
    this.loading = true;

    this.booksService.searchBooksByQuery(query).subscribe({
      next: (res: any) => {
        this.filteredBooksList = res.items || [];
      },
      error: (e) => console.log('Erro ao buscar livros', e)
    });

    this.loading = false;
  }
}