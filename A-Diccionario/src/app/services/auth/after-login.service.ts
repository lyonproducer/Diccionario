import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean |
  Observable<boolean> | Promise<boolean>{

    this.role.verifyAdmin();
    this.role.verifyUser();

    const roleRoute = route.data['role'];

    if(roleRoute && this.token.loggedIn()){

      if(roleRoute == 'ADMIN'){
        console.log('retorna true admin');
        return this.role.isSuperAdmin;
        //return this.verifyAdmin(roleRoute);
      }else

      if(roleRoute == 'USER'){
        console.log('retorna true user');
        return this.role.isUser;
        //return this.verifyUser(roleRoute);
      }

    }else

    return this.token.loggedIn();
  }

  constructor(private token: TokenService, public role:RoleService) { }

  

}
