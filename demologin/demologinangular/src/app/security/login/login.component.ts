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
  loading = false;
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
  validationMessages = {
    customerPhone: [
      {type: 'required', message: 'Không được để trống'},
      {type: 'pattern', message: 'Số điện thoại 9-10 số. 09-xx, 03-xxx'}
    ],
    customerEmail: [
      {type: 'required', message: 'Email không được để trống'},
      {type: 'pattern', message: 'Ex: abc@gmail.com'}
    ]
  };
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
        customerName: new FormControl('', [Validators.required, Validators.maxLength(49), Validators.minLength(8), Validators.pattern('^[A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*([ ][A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*)*$')]),
        customerPhone:  new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
        customerEmail:  new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@gmail.com$')]),
        customerAddress:  new FormControl('', [Validators.required, Validators.maxLength(390), Validators.minLength(10)])

      }),
      account: this.formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5), Validators.pattern('^[a-z]|[0-9]{8,20}$') ]],
        password: ['', [Validators.required, Validators.maxLength(19), Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$') ]]
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
      this.loading = true;
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
          this.loading = false;
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
      () => {
        this.loading = true;
      },
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
        this.loading = true;
        alert('them moi thanh cong');
        this.router.navigateByUrl('login');
        // this.createForm.reset();
        // this.focusInput();
        // this.removeDisableInput();
        // this.disableButton();
      });
  }
}
