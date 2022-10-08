import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IEmployee} from '../../model/employee/iemployee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  readonly API_URL = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) {
  }

  findEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL + '/detail/' + id);
  }
}
