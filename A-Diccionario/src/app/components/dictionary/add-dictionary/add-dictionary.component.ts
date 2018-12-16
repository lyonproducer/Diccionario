import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/admin/dictionary.service';
import { Dictionary } from 'src/app/Models/Dictionary';

@Component({
  selector: 'app-add-dictionary',
  templateUrl: './add-dictionary.component.html',
  styleUrls: ['./add-dictionary.component.css']
})
export class AddDictionaryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDictionaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dictionaryService:DictionaryService
  ) { }

  dictionary:Dictionary = {
    word:null,
    id:null,
  }

  ngOnInit() {
    console.log(this.data);

    if(this.data.editar){
      this.dictionary=this.data.dictionary;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  saveWord(){
    this.dictionaryService.postWord(this.dictionary).subscribe(
      data=>{
        console.log(data);
        this.onNoClick();
      }
    );
    
  }

  editWord(){
    this.dictionaryService.putWord(this.dictionary).subscribe(
      data=>{
        console.log(data);
        this.onNoClick();
      }
    );
  }

  pushDictionary(){
    console.log(this.dictionary);

    if(!this.data.editar){
      console.log('hola');
      this.saveWord();
    }else
    this.editWord();
  }


}
