import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {SecurityServiceService} from '../../service/security/security-service.service';
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
  loader =  false;
  constructor(private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.start();
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: false
    });

    if (this.tokenStorageService.getUser()) {
      console.log('day la get user');
      this.securityService.isLoggedIn = true;
      this.role = this.tokenStorageService.getUser().roles[0].roleName;
      this.username = this.tokenStorageService.getUser().account.username;
      this.router.navigate(['']);
    }
  }

  submit() {
    console.log(this.form.value);
    this.securityService.login(this.form.value).subscribe((data) => {
      this.loader = true;
      console.log(data);
      if (this.form.value.remember_me === true) {
        this.tokenStorageService.saveUserLocal(data);
        this.tokenStorageService.saveTokenLocal(data.jwtToken);
      } else {
        this.tokenStorageService.saveUserLocal(data);
        this.tokenStorageService.saveTokenLocal(data.jwtToken);
      }



      this.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().account.username;
      this.role = this.tokenStorageService.getUser().account.roles.roleName;
      console.log('username: ' + this.tokenStorageService.getUser().account.username);
      console.log('role: ' + this.tokenStorageService.getUser().account.roles[0].roleName);
      console.log('token: ' + this.tokenStorageService.getUser().jwtToken);
      console.log('token: ' + this.tokenStorageService.getUser().account.accountId);


      },
        () => {},
        () => {
          this.loader = false;
          window.location.assign('');
          this.router.navigateByUrl('');
        }
        );
  }
  start() {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container3');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });
  }
}
