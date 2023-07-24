import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable()
export class AuthService {

  currentUser: IUser | undefined

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string){
    const loginInfo = { username: userName, password: password }
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

    return this.http.post<IUser>('/api/login', loginInfo, options)
      .pipe(tap(data => { //tap ci permette di vedere i valori che passano attraverso l'observable
        this.currentUser = data
      })).pipe(catchError(err => { console.log(err); return of(false) })) // se ci fosse un errore si creerebbe un observable con valore false
  }

  isAuthenticated(){
    return !!this.currentUser
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => { //tap ci permette di vedere i valori che passano attraverso l'observable
        if (data instanceof Object)
          this.currentUser = data as IUser
      })).subscribe()
  }

  logout(){
    this.currentUser = undefined

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
    this.http.post('/api/logout', {}, options).subscribe()
  }

  updateCurrentUser(firstName: string, lastName: string){
    this.currentUser!.firstName = firstName
    this.currentUser!.lastName = lastName
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

    return this.http.put(`/api/users/${this.currentUser?.id}`, this.currentUser, options)
  }
}

