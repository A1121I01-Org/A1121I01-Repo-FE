import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee} from '../../model/employee/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  readonly URI: string = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.URI);
  }
  findById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.URI + '/getById/' + id);
    console.log(id);
  }

  saveEmployee(employee: IEmployee): Observable<void> {
    return this.http.post<void>(this.URI + '/create', employee);
  }

  getListPosition(): Observable<any> {
    return this.http.get(this.URI + '/position/list');
  }

  adminUpdateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.patch<IEmployee>(this.URI + '/update' , employee);
  }

}

