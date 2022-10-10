import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Password} from '../../model/classDTO/password';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  API_ACCOUNT = 'http://localhost:8080/api/account';

  constructor(private http: HttpClient) {
  }

  // AnDVH thay đổi mật khẩu
  public updatePassword(accountId: number, password: Password): Observable<void> {
    return this.http.patch<void>(`${this.API_ACCOUNT}/update/password/${accountId}`, password);
  }
}
