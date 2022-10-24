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

  readonly API_URL = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {
  }

  // SonLH tạo phương thức tìm kiếm theo id
  findCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.API_URL + '/detail/' + id);
  }

  // HieuNT get list customer not pagination
  getAllCustomer(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.API_URL);
  }

  // HieuNT get list customer with pagination
  getAllCustomerWithPagination(page: number): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.API_URL + '/customer-pagination/' + page);
  }

  // HieuNT delete customer by id
  deleteCustomerById(id: number): Observable<ICustomer> {
    console.log('ID de xoa: ' + id);
    return this.http.delete<ICustomer>(this.API_URL + '/customer-delete/' + id);
  }

  searchCustomerByNameAndPhone(value1: string, value2: string): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.API_URL + `/search-customer?name=${value1}&phone=${value2}`);
  }

  create(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(URL_API + '/customer-create', customer);
  }

  update(customer: ICustomer): Observable<ICustomer> {
    return this.http.patch<ICustomer>(URL_API + '/update', customer);
  }

}
