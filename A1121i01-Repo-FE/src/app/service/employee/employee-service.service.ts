import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IEmployee} from '../../model/employee/iemployee';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee} from '../../model/employee/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  readonly API_EMPLOYEE = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) {
  }

  findEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_EMPLOYEE + '/detail/' + id);
  }

// AnDVH update employee
  public updateEmployee(id: number, employee: IEmployee): Observable<void> {
    return this.http.patch<void>(`${this.API_EMPLOYEE}/update/${id}`, employee);
  }

  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_EMPLOYEE);
  }

  getAllEmployeeWithPagination(page: number): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_EMPLOYEE + '/employee-pagination/' + page);
  }


  deleteEmployeeById(id: number): Observable<IEmployee> {
    console.log('ID de xoa: ' + id);
    return this.http.delete<IEmployee>(this.API_EMPLOYEE + '/employee-delete/' + id);
  }

  // findEmployeeById(code: string): Observable<IEmployee> {
  //   return this.http.get<IEmployee>(`${this.API_URL}/${code}`);
  // }

  searchEmployeeByName(value: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_EMPLOYEE + `/customer-search?name=${value}}`);
  }

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.URI);
  }

  saveEmployee(employee: IEmployee): Observable<void> {
    return this.http.post<void>(this.API_EMPLOYEE + '/create', employee);
  }

  getListPosition(): Observable<any> {
    return this.http.get(this.API_EMPLOYEE + '/position/list');
  }

  adminUpdateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.patch<IEmployee>(this.API_EMPLOYEE + '/update' , employee);
  }
}

