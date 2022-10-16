import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMaterial} from "../../model/material/imaterial";

@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {
    readonly URI: string ='http://localhost:8080/api/material'

  constructor(
  private httpClient: HttpClient
  ) {

  }
    getAll(): Observable<IMaterial[]> {
      return this.httpClient.get<IMaterial[]>(this.URI);
    }

    findById(id: string): Observable<IMaterial> {
      return this.httpClient.get<IMaterial>(this.URI + '/getById/' + id);
      console.log(id);
    }

    create(material: IMaterial): Observable<void> {
      return this.httpClient.post<void>(this.URI+'/create', material);
    }

    getListCustomer():Observable<any>{
      return this.httpClient.get(this.URI+'/customer/list');
    }

    getListTypeMaterial():Observable<any>{
      return this.httpClient.get(this.URI+'/materialType/list');
    }
    update(material: IMaterial): Observable<IMaterial> {
    return this.httpClient.patch<IMaterial>(this.URI+'/update' , material);
  }

}

