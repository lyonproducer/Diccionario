import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public isUser : boolean=false;
  public isSuperAdmin : boolean=false;

  found1:boolean;
  found2:boolean;

  constructor() { }



  verifyAdmin() {
    var user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);

    if(user==null){
      this.isSuperAdmin = false;
    }else

    for(let i=0;i<user.roles.length;i++){

      if (user.roles[i].name == 'admin'){
        console.log('el usuario es: ' + user.roles[i].name);
        this.found1=true;
        this.isSuperAdmin = true;
      }
    }

    if(!this.found1){
      this.isSuperAdmin = false;
    }
    
    console.log('isUser: '+ this.isSuperAdmin);
  }

  verifyUser(){
    var user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);

    if(user==null){
      this.isUser = false;
    }else
    
    for(let i=0;i<user.roles.length;i++){

      if (user.roles[i].name == 'user'){
        console.log('el usuario es: ' + user.roles[i].name);
        this.found2=true;
        this.isUser = true;
      }
    }

    if(!this.found2){
      this.isUser = false;
    }

    console.log('isUser: '+ this.isUser);
  }
}
