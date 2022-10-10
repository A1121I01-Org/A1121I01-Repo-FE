import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IEmployee} from '../../model/employee/iemployee';
import {Observable} from 'rxjs';

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
}
