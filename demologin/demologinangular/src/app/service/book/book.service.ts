import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from '../../model/book/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private API_URL = 'http://localhost:8080/api/books';
  constructor(private http: HttpClient) { }

  getListBook(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL );
  }
  // HieuNT get list book with pagination
  findAllCustomer(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '?page=' + page);
  }
  // search(value: string): Observable<IBook[]> {
  //   return this.http.get<IBook[]>(this.API_URL);
  // }

  searchBookByName(value1: string, value2: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + `/book-search?name=${value1}&page=${value2}`);
  }
}
