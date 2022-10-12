import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee} from '../../model/employee/iemployee';
import {IPositionEmployee} from '../../model/employee/iposition-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  API_URL = 'http://localhost:8080/api/employee';
  constructor(private http: HttpClient) { }
  // NhiVP lay employee theo code
  getEmployeeByCode(code: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL + '/byCode/' + code);
  }
  // NhiVP lay ds chuc vu tru chuc vu quan ly
  getPositionNotManager(): Observable<IPositionEmployee[]> {
    return this.http.get<IPositionEmployee[]>(this.API_URL + '/position-NotManager/list');
  }
  // NhiVP lay danh sach ma nhan vien da co tai khoan theo list string
  getAllEmployeeHasAccount(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL + '/listHasAccount');
  }

  // NhiVP lay danh sach ma nhan vien chua co tai khoan theo list string
  getAllEmployeeDontHasAccount(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL + '/listDontHasAccount');
  }
}
