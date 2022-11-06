import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {TokenStorageService} from '../service/security/token-storage.service';
import {SecurityServiceService} from '../service/security/security-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  username: string;
  password: string;
  roles: string[] = [];
  checkUserName = false;

  checkPassWord = false;
  isLoggedIn: boolean;
  urlImg: string;
  role: string;
  idEmployee: any;
  constructor(private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.start();
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // if (this.tokenStorageService.getUser()) {
    //   this.securityService.isLoggedIn = true;
    //   this.role = this.tokenStorageService.getUser().roles[0].roleName;
    //   this.username = this.tokenStorageService.getUser().account.username;
    //   this.router.navigate(['']);
    //
    // }
  }

  submit() {
    console.log(this.form.value);
    this.securityService.login(this.form.value).subscribe(() => {},
        () => {},
        () => {
          this.router.navigateByUrl('/customer');
        }
        );
  }
  start() {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });
  }
}
