import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomer} from '../../model/customer/icustomer';
const API_URL = 'http://localhost:8080/api/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private  httpClient: HttpClient) { }
  // HieuNT get list customer not pagination
  getAllCustomer(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(API_URL);
  }
  // HieuNT get list customer with pagination
  getAllCustomerWithPagination(page: number): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(API_URL + '/customer-pagination/' + page);
  }
    // HieuNT delete customer by id
  deleteCustomerById(id: number): Observable<ICustomer> {
    console.log('ID de xoa: ' + id);
    return this.httpClient.delete<ICustomer>(API_URL + '/customer-delete/' + id);
  }
  searchCustomerByNameAndPhone(value1: string, value2: string): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(API_URL + `/customer-search?name=${value1}&phone=${value2}` );
  }
}
