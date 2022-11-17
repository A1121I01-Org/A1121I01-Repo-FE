import { Injectable } from '@angular/core';
import {ICustomerAccount} from '../../model/account/ICustomerAccount';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly API_URL = 'http://localhost:8080/api/account';
  constructor(private http: HttpClient) { }

  // HieuNT tao tai khoan cho khach hang
  createAccount(customerAccount: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/create-Account', customerAccount);
  }
}
