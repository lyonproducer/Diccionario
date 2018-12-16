import { Component, OnInit } from '@angular/core';
import { DictionaryService } from 'src/app/services/admin/dictionary.service';
import { Dictionary } from 'src/app/Models/Dictionary';
import { MessageService } from 'src/app/services/admin/message.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message:string='';

  word:string='';

  suggestions:any=[];
  messages:any=[];

  dictionary:any=[];

  userName:string;

  constructor(
    public dictionaryService:DictionaryService,
    public messageService:MessageService
  ) { }

  ngOnInit() {
    this.getDictionary();
    this.getSentences();
    var user = JSON.parse(localStorage.getItem('user'));
    this.userName = user.name;
    console.log(this.userName);
  }

  getSentences(){
    this.messageService.getMessages().subscribe(
      data=>{
        console.log(data);
        this.messages = data;
      }
    );
  }

  getDictionary(){
    this.dictionaryService.getWords().subscribe(
      data=>{

        console.log(data);
        this.dictionary = data as Dictionary[];
      }
    );
  }

  reviewWord():void{
    this.suggestions=[];
    
    console.log('ingresado '+this.word);
    this.dictionary.some(element => {
      //empieza a comparar
      console.log('comparando: ' + element.word);
      if(this.word == element.word){
        console.log('es igual');
        this.suggestions=[];
        this.addToMessage(this.word);
        return true;
      }
      //primero compara si tiene la misma cantidad de letras
      if(this.word.length == element.word.length){

        var aux=0;
        for(let i=0; i< this.word.length;i++){
          console.log('comparando', this.word[i]);
          if(this.word[i]==element.word[i]){
            aux++;
          }
        }

        console.log('aux'+ aux);
        //si tiene la misma cantidad de letras verifica si es diferente
        if(this.word!=element.word){
          if(aux > this.word.length-2){
            this.suggestions.push(element.word);
            console.log('se encontro: '+ this.word);
          }
        }  
      }else

      if(this.word.length != element.word.length){

        var aux=0;
        for(let i=0; i< this.word.length;i++){
          console.log('comparando', this.word[i]);
          if(this.word[i]==element.word[i]){
            aux++;
          }
        }

        console.log('aux '+ aux);

        if(aux == this.word.length-1){
          this.suggestions.push(element.word);
          console.log('se encontro -1: '+ element.word);
        }

      }


    });

    this.word='';

  }

  addToMessage(data){
    if(this.message==''){
      this.message = this.message + data;
    }else
    this.message = this.message + ' ' + data;
  }

  postMessage(){

    var message = {
      sentence:this.message,
      user:this.userName
    }

    console.log(message);

    this.messageService.postMessages(message).subscribe(
      data=>{
        console.log(data);
        this.getSentences();
      }
    );
  }
}
