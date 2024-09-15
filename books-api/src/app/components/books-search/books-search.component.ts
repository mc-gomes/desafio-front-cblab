import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="book-image">
      <img
        *ngIf="book.volumeInfo.imageLinks?.thumbnail"
        [src]="book.volumeInfo.imageLinks.thumbnail"
        alt="{{ book.volumeInfo.title }}"
      />
    </div>
    <div class="book-info">
      <h3>{{ book.volumeInfo.title }}</h3>
      <p>
        <strong>Autor(es):</strong>
        {{ book.volumeInfo.authors?.join(', ') || 'Desconhecido' }}
      </p>
      <p>
        <strong>Descrição:</strong>
        {{ book.volumeInfo.description || 'Sem descrição disponível' }}
      </p>
    </div>
  `,
  styleUrl: './books-search.component.css',
})
export class BooksSearchComponent {
  @Input() book!: any;
}
