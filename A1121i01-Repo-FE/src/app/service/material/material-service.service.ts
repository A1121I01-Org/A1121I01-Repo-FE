import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMaterial} from "../../model/material/imaterial";
=======
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMaterial} from '../../model/material/imaterial';
import {PageMaterial} from '../../model/material/page-material';
>>>>>>> origin/material-manager

const API_URL = 'http://localhost:8080/api/material';
@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {
readonly API_URL="http://localhost:8080/api/material";

<<<<<<< HEAD

findMaterialById(id:number):Observable<IMaterial>{
return this.httpClient.get<IMaterial>(`${this.API_URL}/detail/${id}`)
}
getTopNewMaterial():Observable<IMaterial[]>{
  return this.httpClient.get<IMaterial[]>(`${this.API_URL}/detail`)
}

  constructor(private httpClient:HttpClient) { }
=======
  constructor(private http: HttpClient) {}
  getAll(page: number, search: string): Observable<PageMaterial> {
    return this.http.get<PageMaterial>(API_URL + '?page=' + page + '&&search=' + search);
  }
  delete(id: number): Observable<IMaterial> {
    return this.http.get(API_URL + '/delete/' + id);
  }
>>>>>>> origin/material-manager
}
