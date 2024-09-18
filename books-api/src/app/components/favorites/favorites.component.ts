import { Component, inject } from '@angular/core';
import { FavoriteBookModel } from '../../models/models';
import { BooksService } from '../../services/books.service';
import { BooksSearchComponent } from "../books-search/books-search.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(){
    this.favoriteBooksList = this.booksService.getAllFavoriteBooks();
  }
}
