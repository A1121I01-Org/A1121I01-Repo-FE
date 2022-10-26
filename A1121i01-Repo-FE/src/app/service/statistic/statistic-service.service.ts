import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {

  // KimPBH-Thong ke tai chinh

  readonly API_URL = 'http://localhost:8080/api/statistic';

  constructor(private http: HttpClient) { }

  search(month: string , year: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/search?` + `month=${month}&year=${year}`);
  }
  getPdf(search: string[]): Observable<Blob> {
    // @ts-ignore
    return this.http.post<Blob>(`${this.API_URL}/pdf2`, search, {responseType: 'blob'} );
  }

  // test chart material
  // cryptoData(): Promise<number> {
  //   return this.http.get<number>(`${this.API_URL}/huyhang`).toPromise().then((data) => {
  //     return data;
  //   });
  // }
  cryptoData() {
    return this.http.get(`${this.API_URL}/huyhang`).toPromise().then((data) => {
      return data;
    });
  }
}
