import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class UserResolver{

  constructor(private auth: AuthService){}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(route: ActivatedRouteSnapshot){
    return this.auth.checkAuthenticationStatus()
  }
}
