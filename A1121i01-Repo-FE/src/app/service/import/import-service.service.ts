import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IImport} from '../../model/iimport';
import {ICustomer} from '../../model/customer/icustomer';
import {IEmployee} from '../../model/employee/iemployee';
import {IMaterial} from '../../model/material/imaterial';
import {IMaterialType} from '../../model/material/imaterial-type';

@Injectable({
  providedIn: 'root'
})
export class ImportServiceService {
  readonly URI: string = 'http://localhost:8080/api/import';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  findAllImport(page: number): Observable<IImport[]> {
    return this.httpClient.get<IImport[]>(this.URI + '/import-list?page=' + page);
  }

  findAllImportNotPagination(): Observable<IImport[]> {
    return this.httpClient.get<IImport[]>(this.URI + '/import-list-not-pagination');
  }

  findImportById(id: number): Observable<IImport> {
    return this.httpClient.get<IImport>(this.URI + '/import-detail/' + id);
  }

  createImport(importCreate: IImport): Observable<void> {
    return this.httpClient.post<void>(this.URI + '/import-create', importCreate);
  }

  deleteImport(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.URI + '/import-delete/' + id);
  }

  updateImport(id: number, importUpdate: IImport): Observable<void> {
    return this.httpClient.put<void>(this.URI + '/import-update/' + id, importUpdate);
  }

  findAllCustomerImport(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(this.URI + '/customer-list');
  }

  findAllEmployeeImport(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.URI + '/employee-list');
  }

  findAllMaterialImport(id: number): Observable<IMaterial[]> {
    return this.httpClient.get<IMaterial[]>(this.URI + '/material-list/' + id);
  }

  findAllMaterialTypeImport(): Observable<IMaterialType[]> {
    return this.httpClient.get<IMaterialType[]>(this.URI + '/material-type-list');
  }

  findAllImportString(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.URI + '/import-list-string');
  }

  getPdfImport(import1: IImport): Observable<Blob> {
    // @ts-ignore
    return this.httpClient.post<Blob>(this.URI + '/import-pdf', import1, {responseType: 'blob'});
  }
}
