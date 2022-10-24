import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
  private API = 'http://localhost:8080/api/statistic';

  constructor(private httpClient: HttpClient) {}

  getAllCustomer(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API + '/list/customer');
  }

  getPDF(): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.get<Blob>(`${this.API}/pdf`, {responseType: 'blob'});
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
  }
}
