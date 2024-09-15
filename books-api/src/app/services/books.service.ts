import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  private API_URL = 'https://www.googleapis.com/books/v1/volumes'
  
  searchBooksByQuery(query: string): Observable<any> {
    const params = {
      q: query
    }
    return this.http.get(this.API_URL, { params });
  }

}
