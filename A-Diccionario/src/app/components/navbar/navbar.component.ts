import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { RoleService } from 'src/app/services/auth/role.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn : boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private token:TokenService,
    private role:RoleService
  ) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);

  }

  logout(event: MouseEvent){

    event.preventDefault();
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.role.isUser=false;
    this.role.isSuperAdmin=false;
  }

  goDashboard(){

    if(this.role.isSuperAdmin){
      console.log('is admin: ' + this.role.isSuperAdmin);
      this.router.navigateByUrl('admin/dashboard');
    }

    if(this.role.isUser){
      console.log('is user: ' + this.role.isUser);
      this.router.navigateByUrl('dashboard');
    }

  }

}
