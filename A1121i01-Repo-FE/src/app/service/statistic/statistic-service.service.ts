import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ICustomer} from '../../model/customer/icustomer';



@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {
  private url = 'http://localhost:8080/api/statistic';

  constructor(private http: HttpClient) {}

  getAllCustomer(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/list/customer');
  }

  getPDF(): Observable<Blob> {
    // @ts-ignore
    return this.http.get<Blob>(`${this.url}/pdf`, {responseType: 'blob'});
  }

  searchStatisticCustomer(fromMonth: string, toMonth: string, year: string): Observable<string[]> {
    console.log(fromMonth);
    return this.http.get<string[]>(`${this.url}/search/customer` + '?fromMonth=' + fromMonth + '&toMonth=' + toMonth + '&year=' + year);
  }
}
