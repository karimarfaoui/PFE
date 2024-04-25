import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import { KeyboardComponent } from '../../../keyboard/keyboard.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NgIf,CheckboxModule,SelectButtonModule,FormsModule,ReactiveFormsModule,KeyboardComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  
  clicker: boolean = false;
  articleForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }
  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      codeProduit: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      options: new FormControl('', Validators.required)
    });
  }
  

  onSubmit() { 
  
      Swal.fire({
        icon: 'success',
        title: 'Enregistré avec succès',
        showConfirmButton: false,
        timer: 2000      });
  }
  onclick(){
     this.clicker =! this.clicker;
  }
  openDialog() {
    this.dialog.open(KeyboardComponent);
  }

}
