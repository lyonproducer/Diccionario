import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { TokenService } from 'src/app/services/auth/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoleService } from 'src/app/services/auth/role.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email:null,
    password:null
  };

  public error = null;

  constructor(private loginService:LoginService,
              private token: TokenService,
              private router: Router,
              private auth: AuthService,
              public role: RoleService
            ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.loginService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    console.log(data);
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
    this.error = error.error.error;

  }
}
