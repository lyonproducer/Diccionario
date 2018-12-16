import { Injectable } from '@angular/core';
import { decode } from '@angular/router/src/url_tree';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {

    login : 'http://localhost:8000/api/login',
    signup : 'http://localhost:8000/api/signup'
  };

  constructor() { }

  handle(token,user){
    this.set(token,user);
    //console.log(this.isValid());
  }

  set(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
  }

  isValid(){
    //Verifica si el token recibido por el servicio es valido
    let token = this.get();

    if(token){
      const payload = this.payload(token);
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }

    return false;
  }

  payload(token){
    //funcion para recortar el token
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload){
    return JSON.parse(atob(payload));
  }

  loggedIn(){

    return this.isValid();
  }
}


