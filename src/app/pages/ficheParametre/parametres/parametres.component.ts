import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { MatDialog } from '@angular/material/dialog';
import { KeyboardComponent } from '../../../keyboard/keyboard.component';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,ToggleButtonModule,KeyboardComponent],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.css'
})
export class ParametresComponent {
  clicker: boolean=false;
  
  constructor(public dialog: MatDialog) { }

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