import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ICategory} from '../../model/book/ICategory';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:8080/api/category';
  constructor(private http: HttpClient) { }

  getListCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}` );
  }
}
