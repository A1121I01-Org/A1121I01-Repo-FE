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
  // getAll(): Observable<IMaterial[]> {
  //   return this.httpClient.get<IMaterial[]>(this.URI);
  // }

  findById(id: string): Observable<IMaterial> {
    return this.http.get<IMaterial>(this.API_URL + '/getById/' + id);
    console.log(id);
  }

  create(material: IMaterial): Observable<void> {
    return this.http.post<void>(this.API_URL+'/create', material);
  }

  getListCustomer():Observable<any>{
    return this.http.get(this.API_URL+'/customer/list');
  }

  getListTypeMaterial():Observable<any>{
    return this.http.get(this.API_URL+'/materialType/list');
  }
  update(material: IMaterial): Observable<IMaterial> {
    return this.http.patch<IMaterial>(this.API_URL+'/update' , material);
  }


  constructor(private http: HttpClient) {}



}

