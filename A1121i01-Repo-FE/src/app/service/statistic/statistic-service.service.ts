import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {

  readonly API_URL = 'http://localhost:8080/api/cart';
  readonly API_URL_LUONG = 'http://localhost:8080/api/salary';
  readonly API_URL_NHAP = 'http://localhost:8080/api/import';

  constructor(private http: HttpClient) { }

  getBan(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/banhang`);
  }

  getTra(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/trahang`);
  }

  getHuy(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/huyhang`);
  }

  getLuong(): Observable<number> {
    return this.http.get<number>(`${this.API_URL_LUONG}/luongNV`);
  }

  getNhap(): Observable<number> {
    return this.http.get<number>(`${this.API_URL_NHAP}/nhaphang`);
  }
}
