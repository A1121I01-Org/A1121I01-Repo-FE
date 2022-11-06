import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from './security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService) { }
}
