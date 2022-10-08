import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICustomer} from '../../model/customer/icustomer';
import {Observable} from 'rxjs';

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
}
