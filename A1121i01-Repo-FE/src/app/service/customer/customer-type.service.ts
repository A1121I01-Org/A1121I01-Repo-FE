import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ICustomerType} from '../../model/customer/icustomer-type';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<ICustomerType[]> {
    return this.http.get<ICustomerType[]>(API_URL + 'customer-type');
  }
}
