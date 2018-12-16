import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http:HttpClient
  ) { }

  getMessages(){
    return this.http.get('http://localhost:8000/api/Message');
  }

  postMessages(message){
    return this.http.post('http://localhost:8000/api/Message',message);
  }

}
