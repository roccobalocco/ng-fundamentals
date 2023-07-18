import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile.component';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }
