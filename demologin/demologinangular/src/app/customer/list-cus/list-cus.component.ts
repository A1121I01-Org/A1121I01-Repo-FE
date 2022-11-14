import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-cus',
  templateUrl: './list-cus.component.html',
  styleUrls: ['./list-cus.component.css']
})
export class ListCusComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.assign('');
    this.router.navigateByUrl('');
  }

}
