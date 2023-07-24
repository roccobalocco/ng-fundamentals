import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class UserResolver{

  constructor(private auth: AuthService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.auth.checkAuthenticationStatus()
  }
}
