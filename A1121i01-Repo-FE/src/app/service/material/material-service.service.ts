import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IMaterial} from '../../model/material/imaterial';
import {PageMaterial} from '../../model/material/page-material';



@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {
  private API_URL = 'http://localhost:8080/api/material';

  constructor(private http: HttpClient) {
  }

  getAllMaterial(thePage: number, thePageSize: number): Observable<GetResponseMaterial> {
    const url = `${this.API_URL}/list?` + `&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseMaterial>(url);
  }

  getAllMaterialSearch(thePage: number, thePageSize: number, search: string): Observable<void> {
    const url = `${this.API_URL}/search?` + `page=${thePage}&size=${thePageSize}&search=${search}`;
    return this.http.get<void>(url);
  }

  findMaterialById(id: number): Observable<IMaterial> {
    return this.http.get<IMaterial>(`${this.API_URL}/detail/${id}`)
  }

  getTopNewMaterial(): Observable<IMaterial[]> {
    return this.http.get<IMaterial[]>(`${this.API_URL}/detail`)


  }

  getAll(page: number, search: string): Observable<PageMaterial> {
    return this.http.get<PageMaterial>(this.API_URL + '?page=' + page + '&&search=' + search);
  }

  delete(id: number): Observable<IMaterial> {
    return this.http.get(this.API_URL + '/delete/' + id);
  }
}
interface GetResponseMaterial {
  content: IMaterial[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

