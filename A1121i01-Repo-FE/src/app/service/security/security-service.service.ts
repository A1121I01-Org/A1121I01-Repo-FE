import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const AUTH_API = `${environment.apiUrl}`;
@Injectable({
    providedIn: 'root'
})
export class SecurityServiceService {
    httpOptions: any;
    isLoggedIn: boolean;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        };
    }
    login(user: any): Observable<any> {
        return this.http.post(AUTH_API + '/auth/login', {
            username: user.username,
            password: user.password
        }, this.httpOptions);
    }
}
