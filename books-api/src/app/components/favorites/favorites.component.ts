import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FavoriteBookModel } from '../../models/models';
import { BooksService } from '../../services/books.service';
import { BooksSearchComponent } from "../books-search/books-search.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BooksSearchComponent, FormsModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  
  favoriteBooksList: FavoriteBookModel[] = []
  booksService = inject(BooksService);
  notificationService = inject(NotificationService);

  private removeBookSubject = new Subject<string>();
  private cdRef = inject(ChangeDetectorRef);

  constructor(){
    this.loadFavoriteBooks();

    this.removeBookSubject.pipe(
      switchMap(bookId => {
        const confirmation = confirm('Tem certeza que deseja remover este livro dos favoritos?');
        if (confirmation) {
          return this.booksService.removeBookFromFavorites(bookId).pipe(
            tap(() => {
              this.loadFavoriteBooks();
              this.cdRef.detectChanges();
              this.notificationService.showNotification('Livro removido dos favoritos com sucesso.', 'success');
            }),
            catchError(error => {
              this.notificationService.showNotification('Erro ao remover livro dos favoritos.', 'error');
              console.log(error)
              return of();
            })
          );
        } else {
          return of();
        }
      })
    ).subscribe();
  }

  loadFavoriteBooks(){
    this.favoriteBooksList = this.booksService.getAllFavoriteBooks();
  }

  onRemoveBook(bookId: string) {
    this.removeBookSubject.next(bookId);
  }

}
