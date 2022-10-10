import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMaterial} from "../../model/material/imaterial";

@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {
readonly API_URL="http://localhost:8080/api/material";


findMaterialById(id:number):Observable<IMaterial>{
return this.httpClient.get<IMaterial>(`${this.API_URL}/detail/${id}`)
}
getTopNewMaterial():Observable<IMaterial[]>{
  return this.httpClient.get<IMaterial[]>(`${this.API_URL}/detail`)
}

  constructor(private httpClient:HttpClient) { }
}
