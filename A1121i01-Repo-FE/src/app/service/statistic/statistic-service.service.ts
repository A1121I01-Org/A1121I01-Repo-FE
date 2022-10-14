import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMaterial} from '../../model/material/imaterial';

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {
  readonly API: string = 'http://localhost:8080/api/statistic/list/material';
  readonly API1: string = 'http://localhost:8080/api/statistic';
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API);
  }
  getPdf(): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.get<Blob>(`${this.API1}/pdf`, {responseType: 'blob'} );
  }
  // searchStatisticMaterial(): Observable<string[]> {
  //   return this.httpClient.get
  // }

}
