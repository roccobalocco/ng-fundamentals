import { Router } from '@angular/router';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px;}
    .error ::-webkit-input-placeholder {color: red;}
    .error ::-moz-placeholder {color: red;}
    .error :-moz-placeholder {color: red;}
    .error :ms-input-placeholder {color: red;}
  `]
})
export class ProfileComponent implements OnInit{
  profileForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    if(this.authService.currentUser == null)
      this.router.navigate(['user/login']);
    this.firstName = new FormControl(
      this.authService.currentUser?.firstName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(
      this.authService.currentUser?.lastName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    console.log('ngOnInit' + this.firstName.value)
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    })
  }

  cancel(){
    this.router.navigate(['events']);
  }

  saveProfile(formValues: any){
    if(this.profileForm.valid){ //validazione lato client
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['events']);
    }
  }

  isRequiredFirstName(){
    return this.firstName?.hasError('required')
  }

  isRequiredLastName(){
    return this.lastName?.hasError('required')
  }

  validateFirstName(){
    return this.firstName?.valid
      || this.firstName.untouched
  }

  validateLastName(){
    return this.lastName?.valid
      || this.lastName?.untouched
  }

  patternFirstName(){
    return this.firstName?.hasError('pattern')
  }

  patternLastName(){
    return this.firstName?.hasError('pattern')
  }
}
