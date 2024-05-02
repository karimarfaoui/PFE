import { Component } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { KeyboardComponent } from '../../../../keyboard/keyboard.component';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pconnexion',
  standalone: true,
  imports: [ToggleButtonModule,KeyboardComponent,NgIf],
  templateUrl: './pconnexion.component.html',
  styleUrl: './pconnexion.component.css'
})
export class PconnexionComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(KeyboardComponent);
}
onSubmit() { 
  
  Swal.fire({
    icon: 'success',
    title: 'Enregistré avec succès',
    showConfirmButton: false,
    timer: 2000      });
}
}
