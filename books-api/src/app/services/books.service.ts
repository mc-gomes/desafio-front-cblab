import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FavoriteBookModel } from '../models/models';
import { normalizeText } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  favoriteBooksList: FavoriteBookModel[] = [];
  idCounter = 0;

  constructor(private http: HttpClient) { }

  private API_URL = 'https://www.googleapis.com/books/v1/volumes'
  
  searchBooksByQuery(query: string, startIndex: number = 0, maxResults: number = 10): Observable<any> {
    const params = {
      q: query,
      startIndex: startIndex.toString(),
      maxResults: maxResults.toString(),
    };
    return this.http.get(this.API_URL, { params });
  }

  isBookAdded(bookId: string){
    return this.favoriteBooksList.some((book) => book.volumeId === bookId)
  }

  addToFavoritesBooksList(book: any): boolean {
    if(this.isBookAdded(book.id)){
      return false
    }

    const newBook: FavoriteBookModel = {
      id: this.idCounter++,
      volumeId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors ?? ['Desconhecido'],
      description: book.volumeInfo.description ?? 'Sem descrição',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail ?? '../../assets/book_img.jpg',
      publishedDate: book.volumeInfo.publishedDate,
      rating: 1,
      isFavorited: true,
      note: '',
    }
    this.favoriteBooksList.push(newBook);

    this.saveFavoriteBooksToStorage();

    return true;
  }

  getAllFavoriteBooks(): FavoriteBookModel[] {
    const booksFromStorage = sessionStorage.getItem('favoriteBooks');
    if (booksFromStorage) {
      this.favoriteBooksList = JSON.parse(booksFromStorage);
    }
    return this.favoriteBooksList;
  }

  private saveFavoriteBooksToStorage(): void {
    sessionStorage.setItem('favoriteBooks', JSON.stringify(this.favoriteBooksList));
  }

  removeBookFromFavorites(bookId: string): Observable<any> {
    this.favoriteBooksList = this.favoriteBooksList.filter(book => book.volumeId !== bookId);
    this.saveFavoriteBooksToStorage();

    return of(true);
  }

  updateFavoriteBook(updatedBook: FavoriteBookModel) {
    const index = this.favoriteBooksList.findIndex(book => book.id === updatedBook.id);

    if (index !== -1) {
      this.favoriteBooksList[index] = updatedBook;

      this.saveFavoriteBooksToStorage();
    }
  }

  filterFavoriteBooks(query: string): FavoriteBookModel[] {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return this.favoriteBooksList;
    }

    return this.favoriteBooksList.filter(book =>
      normalizeText(book.title).includes(normalizedQuery) ||
      (book.authors && book.authors.some(author =>
        normalizeText(author).includes(normalizedQuery)
      ))
    );
  }
}
