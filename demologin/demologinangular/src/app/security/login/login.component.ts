import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {SecurityServiceService} from '../../service/security/security-service.service';
import {Router} from '@angular/router';
import {AccountService} from '../../service/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  createForm: FormGroup;
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
              private router: Router,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.start();

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: false
    });

    this.createForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        customerName: ['', [Validators.required ]],
        customerPhone: ['', [Validators.required ]],
        customerEmail: ['', [Validators.required ]],
        customerAddress: ['', [Validators.required ]]

      }),
      account: this.formBuilder.group({
        username: ['', [Validators.required ]],
        password: ['', [Validators.required ]]
      })
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

  submitCreate() {
    const customerAccount = this.createForm.value;
    console.log(customerAccount);
    this.accountService.createAccount(customerAccount).subscribe(
      () => {},
      (error) => {
        // if (error.status === 403) {
        //   this.router.navigateByUrl('/auth/access-denied');
        // } else if (error.status === 400) {
        //   this.createForm.setErrors({ usernameExisted: true });
        //   this.notifier.notify('error', 'Vui lòng kiểm tra lại thông tin!');
        // } else if (this.confirmPassCheck !== '') {
        //   this.notifier.notify('error', 'Thêm mới tài khoản không thành công!');
        //
        //   // } else if (error.error.includes('username')) {
        //   //     this.usernameAlreadyExist = 'Tên tài khoản đã tồn tại.';
        //   //     window.alert('loi');
        // } else {
        //   this.notifier.notify('error', 'Thêm mới tài khoản không thành công!');
        // }
        console.log(error);
      },
      () => {
        // this.notifier.notify('success', 'Thêm mới tài khoản thành công!');
        alert('them moi thanh cong');
        this.router.navigateByUrl('login');
        // this.createForm.reset();
        // this.focusInput();
        // this.removeDisableInput();
        // this.disableButton();
      });
  }
}
