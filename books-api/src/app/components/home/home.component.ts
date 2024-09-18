import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksSearchComponent } from '../books-search/books-search.component';
import { BooksService } from '../../services/books.service';

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
          (keydown.enter)="onEnter($event, filter.value)"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Buscar
        </button>

        <button
          type="button"
          class="clear-button"
          (click)="filter.value = ''"
        >
          Limpar
        </button>
      </form>
    </section>
    <div class="results-message" *ngIf="loading">
      <p>Buscando...</p>
    </div>

    <div class="results-message" *ngIf="!loading && booksSearchResults.length === 0">
      <p>Nenhum resultado encontrado</p>
    </div>

    <section class="results">
      <app-books-search
        *ngFor="let book of booksSearchResults"
        [book]="book"
      ></app-books-search>
    </section>

    <div *ngIf="booksSearchResults.length > 0" class="pagination-container">
      <button
        *ngIf="currentPage > 1"
        (click)="changePage(currentPage - 1)"
        class="pagination-button"
      >
        <
      </button>

      <span>Página {{ currentPage }}</span>

      <button
        *ngIf="currentPage * itemsPerPage < totalItems"
        (click)="changePage(currentPage + 1)"
        class="pagination-button"
      >
        >
      </button>
      
      <span class="total-results">
        {{ getStartIndex() }} - {{ getEndIndex() }} de {{ totalItems }}
      </span>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  booksSearchResults: any[] = [];
  loading = false;
  query: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private booksService: BooksService) {}

  onEnter(event: Event, query: string) {
    event.preventDefault(); // para evitar que a página seja recarregada e apague o input
    this.filterResults(query);
  }

  filterResults(query: string, page: number = 1) {
    if (!query) {
      return;
    }
    this.loading = true;
    this.query = query;

    const startIndex = (page - 1) * this.itemsPerPage;

    this.booksService.searchBooksByQuery(query, startIndex, this.itemsPerPage).subscribe({
      next: (res: any) => {
        this.booksSearchResults = res.items || [];
        this.totalItems = res.totalItems || 0;
      },
      error: (e) => console.log('Erro ao buscar livros', e),
      complete: () => (this.loading = false),
    });
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.filterResults(this.query, newPage);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > this.totalItems ? this.totalItems : endIndex;
  }

}