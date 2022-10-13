import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMaterial} from "../../model/material/imaterial";

import {PageMaterial} from '../../model/material/page-material';



@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {
readonly API_URL="http://localhost:8080/api/material";

findMaterialById(id:number):Observable<IMaterial>{
return this.http.get<IMaterial>(`${this.API_URL}/detail/${id}`)
}
getTopNewMaterial():Observable<IMaterial[]>{
  return this.http.get<IMaterial[]>(`${this.API_URL}/detail`)

}
  getAll(page: number, search: string): Observable<PageMaterial> {
    return this.http.get<PageMaterial>(this.API_URL + '?page=' + page + '&&search=' + search);
  }
  delete(id: number): Observable<IMaterial> {
    return this.http.get(this.API_URL + '/delete/' + id);
  }


  constructor(private http: HttpClient) {}
}
