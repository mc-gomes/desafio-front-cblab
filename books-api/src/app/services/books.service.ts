import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteBookModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  favoriteBooksList: FavoriteBookModel[] = [];
  idCounter = 0;

  constructor(private http: HttpClient) { }

  private API_URL = 'https://www.googleapis.com/books/v1/volumes'
  
  searchBooksByQuery(query: string): Observable<any> {
    const params = {
      q: query
    }
    return this.http.get(this.API_URL, { params });
  }

  addToFavoritesBooksList(book: any) {
    const newBook: FavoriteBookModel = {
      id: this.idCounter++,
      volumeId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      publishedDate: book.volumeInfo.publishedDate,
      rate: 0,
      isFavorited: true,
      note: '',
    }
    this.favoriteBooksList.push(newBook);

    console.log('Livro adicionado à sua lista de favoritos:', this.favoriteBooksList)
  }

}
