import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoleService } from 'src/app/services/auth/role.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public form = {
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  };
  
  public error = [];

  constructor(private loginService:LoginService,
              private token: TokenService,
              private router: Router,
              private auth: AuthService ,
              public role:RoleService
            ) {  }

  ngOnInit() {
  }

  onSubmit(){
    this.loginService.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.token.handle(data.access_token,data.user);
    this.auth.changeAuthStatus(true);

    console.log(data.user.roles[0].name);

    if(data.user.roles[0].name == 'admin'){
      console.log('is admin: ' + this.role.isSuperAdmin);
      this.router.navigateByUrl('admin/dashboard');
    }

    if(data.user.roles[0].name == 'user'){
      console.log('is user: ' + this.role.isUser);
      this.router.navigateByUrl('dashboard');
    }
  }

  handleError(error){
    this.error = error.error.errors;

  }

}
