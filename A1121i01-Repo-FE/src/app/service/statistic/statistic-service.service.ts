import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {

  readonly API_URL = 'http://localhost:8080/api/statistic';

  constructor(private http: HttpClient) { }

  // getBan(): Observable<number> {
  //   return this.http.get<number>(`${this.API_URL}/banhang`);
  // }
  //
  // getTra(): Observable<number> {
  //   return this.http.get<number>(`${this.API_URL}/trahang`);
  // }
  //
  // getHuy(): Observable<number> {
  //   return this.http.get<number>(`${this.API_URL}/huyhang`);
  // }
  //
  // getLuong(): Observable<number> {
  //   return this.http.get<number>(`${this.API_URL}/luongNV`);
  // }
  //
  // getNhap(): Observable<number> {
  //   return this.http.get<number>(`${this.API_URL}/nhaphang`);
  // }

  search(month: string , year: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/search?` + `month=${month}&year=${year}`);
  }
  getPdf(search: string[]): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.post<Blob>(`${this.API_URL}/pdf2`, search, {responseType: 'blob'} );
  }
}
