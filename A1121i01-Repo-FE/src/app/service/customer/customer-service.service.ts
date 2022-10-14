import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ICustomer} from '../../model/customer/icustomer';
import {Observable} from 'rxjs';

const URL_API = `${environment.apiUrl}` + 'customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }
  create(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(URL_API + '/create', customer);
  }

  update(customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(URL_API + '/' + customer.customerId, customer);
  }

  findCustomerById(customerId: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(URL_API + '/customer-findById/' + customerId);
  }
}
