import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {

  readonly API_URL = 'http://localhost:8080/api/statistic';

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
    return this.http.get<number>(`${this.API_URL}/luongNV`);
  }

  getNhap(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/nhaphang`);
  }
}
