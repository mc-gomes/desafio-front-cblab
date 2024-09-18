import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-books-search',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="book-card">
    <div class="book-image">
      <img
        [src]="
          book.volumeInfo.imageLinks?.thumbnail ||
          '../../../assets/book_img.jpg'
          "
        alt="Capa do livro {{ book.volumeInfo.title }}"
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
        {{
          book.volumeInfo.description
            ? (book.volumeInfo.description | slice: 0:200) +
              (book.volumeInfo.description.length > 200 ? '...' : '')
              : 'Sem descrição'
            }}
      </p>
    </div>
    <a class="favorite-link" (click)="addToFavorites(book)">Adicionar aos favoritos</a>
  </div>
  `,
  styleUrl: './books-search.component.css',
})
export class BooksSearchComponent {
  @Input() book!: any;

  booksService = inject(BooksService);
  newBookAdded = true;

  constructor(private notificationService: NotificationService) {}

  addToFavorites(book: any): void {
    this.newBookAdded = this.booksService.addToFavoritesBooksList(book);

    if(!this.newBookAdded){
      this.notificationService.showNotification('Este livro já foi adicionado.', 'error')
      return
    }

    this.notificationService.showNotification('Novo livro adicionado à sua lista!', 'success')
  }
}
