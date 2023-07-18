import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  currentUser: IUser | undefined

  loginUser(userName: string, password: string){
    console.log('loginUser: ' + userName)
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'Pietro',
      lastName: 'Masolini'
    }
  }

  isAuthenticated(){
    return !!this.currentUser
  }

  logout(){
    this.currentUser = undefined
  }

  updateCurrentUser(firstName: string, lastName: string){
    if(this.currentUser){
      this.currentUser.firstName = firstName
      this.currentUser.lastName = lastName
    }
  }
}
