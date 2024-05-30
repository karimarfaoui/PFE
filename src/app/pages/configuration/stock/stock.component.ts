import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit,} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Keyboard, { SimpleKeyboard } from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import { CheckboxModule } from 'primeng/checkbox';
import { MatDialog} from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ArticleService } from '../../../@services/article.service';
import { EntreService } from '../../../@services/entre.service';
import { BonEntreComponent } from '../../gestionStock/bon-entre/bon-entre.component';
import { ArticleComponent } from '../article/article.component';
@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  keyboardVisible : boolean = false;
  logIn: boolean = false;
showKeyboard() {
  this.keyboardVisible = !this.keyboardVisible; 
  console.log(this.keyboardVisible);
}
  
  keyboard: Keyboard = {} as Keyboard;
  inputValue: string = '';
  constructor(public dialog: MatDialog,private article: ArticleService, private entre: EntreService ) { }
  ngOnInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange(input: string) {
    this.inputValue = input;
    console.log("Input changed", input);
  }

  onKeyPress(button: string) {
    this.inputValue = button;
    this.inputValue.slice(0, -1);
    if(this.inputValue === '{bksp}'){
      this.inputValue='';
    }
  }
  areItemsVisible :boolean = false;
  authentification() {
    this.areItemsVisible = !this.areItemsVisible;
    console.log(this.areItemsVisible);
  }
  resetAllArticles() { 
    this.article.update().subscribe(posts =>{
      console.log(posts);
    });
  }
  deleteAllEntre() { 
    this.entre.deleteAll().subscribe(posts =>{
      console.log(posts);
    });
  }


  submit(){
    this.deleteAllEntre();
    this.resetAllArticles();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Stock réinitialisé avec succès',
      showConfirmButton: false,
      timer: 1500
    });
  }

  openDialog() {
    this.dialog.open(BonEntreComponent);
  }
  opendialog1() {
    this.dialog.open(ArticleComponent);
  }
}