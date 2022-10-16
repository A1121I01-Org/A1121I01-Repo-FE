import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee} from '../../model/employee/iemployee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  API_URL = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_URL);
  }

  getAllEmployeeWithPagination(page: number): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_URL + '/employee-pagination/' + page);
  }


  deleteEmployeeById(id: number): Observable<IEmployee> {
    console.log('ID de xoa: ' + id);
    return this.http.delete<IEmployee>(this.API_URL + '/employee-delete/' + id);
  }

  findEmployeeById(code: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.API_URL}/${code}`);
  }

  searchEmployeeByName(value: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_URL + `/customer-search?name=${value}}`);
  }


}
