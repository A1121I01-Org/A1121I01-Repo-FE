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

  // getFindForPotentialCustomers(cartDateCreate: any): Observable<any> {
  //   return this.http.get<any>(this.url + '/search/customer?cartDateCreate=' + cartDateCreate);
  // }
}
