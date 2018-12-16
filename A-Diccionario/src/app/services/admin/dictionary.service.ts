import { Injectable } from '@angular/core';

import { Dictionary } from 'src/app/Models/Dictionary';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  dictionaries:Dictionary[];

  constructor(public http:HttpClient) { }

  getWords(){
    return this.http.get('http://localhost:8000/api/Dictionary');
  }

  postWord(word){
    return this.http.post('http://localhost:8000/api/Dictionary',word);
  }

  putWord(word){
    return this.http.put('http://localhost:8000/api/Dictionary/' + word.id, word);
  }

  deleteWord(id){
    return this.http.delete('http://localhost:8000/api/Dictionary/' + id);
  }

}
