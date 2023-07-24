import { TOASTR_TOKEN } from './../common/toastr.service';
import { Component, Inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Toastr } from '../common/toastr.service';

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent {
  userName!: string
  password!: string
  mouseoverLogin!: boolean
  loginInvalid: boolean = false

  constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
  }

  login(formValues: any){
    this.authService.loginUser(
      formValues.userName,
      formValues.password).subscribe(resp => {
        if (!resp){
          this.toastr.error('Login failed... Retry!')
          this.loginInvalid = true
        }else{
          this.loginInvalid = false
          this.router.navigate(['events'])
        }
      })
  }

  cancel(){
    this.router.navigate(['events'])
  }
}
