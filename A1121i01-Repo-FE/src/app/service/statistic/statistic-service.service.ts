import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMaterial} from '../../model/material/imaterial';
import {HttpClient} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICustomer} from '../../model/customer/icustomer';

const apiKey = 'coinrankingd61b57f112bb12a4c936bc50ec9bc94b9334b816c79d0f69';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-My-Custom-Header': `${apiKey}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {
  readonly API: string = 'http://localhost:8080/api/statistic';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API}/list/material1`);
  }

  getPdf(): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.get<Blob>(`${this.API}/pdf`, {responseType: 'blob'});
  }

  searchStatisticMaterial(fromDate: string, toDate: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API}/search/material` + '?fromDate=' + fromDate + '&toDate=' + toDate);
  }

  // searchStatisticMaterial(): Observable<string[]> {
  //   return this.httpClient.get
  // }

  // test chart material
  cryptoData(fromDate: string, toDate: string) {
    return this.httpClient.get(`${this.API}/search/material` + '?fromDate=' + fromDate + '&toDate=' + toDate).toPromise().then((data) => {
      return data;
    });
  }

  cryptoData1() {
    return this.httpClient.get(`${this.API}/chart`).toPromise().then((data) => {
      return data;
    });
  }

  getAllCustomer(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API + '/list/customer');
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


  getAllCustomer(page: number): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API + '/list/customer?page=' + page);
  }

  getPDF(): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.get<Blob>(`${this.API}/pdf`, {responseType: 'blob'});
    return this.httpClient.get<Blob>(`${this.API}/pdf-huyen`, {responseType: 'blob'});
  }

  searchStatisticCustomer(fromMonth: string, toMonth: string, year: string): Observable<string[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<string[]>(`${this.API}/search/customer` + '?fromMonth=' + fromMonth + '&toMonth=' + toMonth + '&year=' + year);
  }

  cryptoData(fromMonth: string, toMonth: string, year: string) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(`${this.API}/search/customer` + '?fromMonth=' + fromMonth + '&toMonth=' + toMonth + '&year=' + year).toPromise().then((data) => {
      return data;
    });
  }

  cryptoDataCustomer() {
    return this.httpClient.get(`${this.API}/list/customer`).toPromise().then((data) => {
      return data;
    });
    console.log(fromMonth);
    return this.httpClient.get<string[]>(`${this.API}/search/customer` + '?fromMonth=' + fromMonth + '&toMonth=' + toMonth + '&year=' + year);
  }
}
