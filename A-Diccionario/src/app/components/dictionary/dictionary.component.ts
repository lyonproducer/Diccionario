import { Component, OnInit } from '@angular/core';
import { DictionaryService } from 'src/app/services/admin/dictionary.service';
import { Dictionary } from 'src/app/Models/Dictionary';
import { MatDialog } from '@angular/material/dialog';
import { AddDictionaryComponent } from './add-dictionary/add-dictionary.component';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  constructor(public dictionaryService:DictionaryService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getDictionary();
  }

  getDictionary(){
    this.dictionaryService.getWords().subscribe(
      data=>{

        console.log(data);
        this.dictionaryService.dictionaries = data as Dictionary[];
      }
    );
  }

  onCreate(){

    const dialogRef = this.dialog.open(AddDictionaryComponent, {
      width: '250px',
      data:{
        'editar':false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getDictionary();
    });
    
  }

  onEdit(dictionary){
    const dialogRef = this.dialog.open(AddDictionaryComponent, {
      width: '250px',
      data:{
        'dictionary':dictionary,
        'editar':true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getDictionary();
    });
  }

  onDelete(id){
    this.dictionaryService.deleteWord(id).subscribe(
      data=>{
        console.log(data);
        this.getDictionary();
      }
    );
  }

}
