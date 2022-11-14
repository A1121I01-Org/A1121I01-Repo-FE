import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService) { }
}
