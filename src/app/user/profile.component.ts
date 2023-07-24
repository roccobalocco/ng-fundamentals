import { Router } from '@angular/router';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Component, OnInit, Inject } from '@angular/core'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

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

  constructor(private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) {

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
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    })
  }

  cancel(){
    this.router.navigate(['events']);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveProfile(formValues: any){
    if(this.profileForm.valid){ //validazione lato client
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
        this.toastr.success(this.authService.currentUser?.firstName + ' ' + this.authService.currentUser?.lastName + ' profile saved');
        this.router.navigate(['events']);
      })
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
