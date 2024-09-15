import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IMaterial} from '../../model/material/imaterial';
import {ICustomer} from '../../model/customer/icustomer';



@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {
  readonly API: string = 'http://localhost:8080/api/statistic';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API + '/list/material');
  }

  getPdf(): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.get<Blob>(`${this.API}/pdf`, {responseType: 'blob'});
  }

  // searchStatisticMaterial(): Observable<string[]> {
  //   return this.httpClient.get
  // }


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

  search(month: string, year: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API}/search?` + `month=${month}&year=${year}`);
  }

  getPdf2(search: string[]): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.post<Blob>(`${this.API}/pdf2`, search, {responseType: 'blob'});
  }


  getAllCustomer(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API + '/list/customer');
  }

  // getFindForPotentialCustomers(cartDateCreate: any): Observable<any> {
  //   return this.http.get<any>(this.url + '/search/customer?cartDateCreate=' + cartDateCreate);
  // }
}

