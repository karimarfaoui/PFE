import { Component, OnInit, forwardRef, inject } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { KeyboardComponent } from '../../../keyboard/keyboard.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { PaiementService } from '../../../@services/paiement.service';
import { error } from 'console';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,
    HttpClientModule,ToggleButtonModule,KeyboardComponent],
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaiementComponent),
      multi: true
    }
  ]
})
export class PaiementComponent implements OnInit{
  
  code_paiment:number=0;
  libelle_paiment:string="";
  type_reglement_espece:boolean=false;
  type_reglement_carte_credit:boolean=false;
  type_reglement_carte:boolean=false;
  type_reglement_credit:boolean=false;
  type_reglement_cheque:boolean=false;    
  type_reglement_offre:boolean=false;
  double_ticket:boolean=false;
  avoir_a_rendre:boolean=false;
  sans_a_rendre:boolean=false;
  espece_a_rendre:boolean=false;



  constructor(public dialog:MatDialog,private location :Location,
    private paiment:PaiementService
  ) { }
newData={
  code_paiment : this.code_paiment,
  libelle_paiment : this.libelle_paiment,
  type_reglement_espece : this.type_reglement_espece,
  
  type_reglement_carte_credit:this.type_reglement_carte_credit,
  type_reglement_carte:this.type_reglement_carte,
  type_reglement_credit:this.type_reglement_carte,
  type_reglement_cheque:this.type_reglement_cheque,
  type_reglement_offre:this.type_reglement_offre,
  double_ticket:this.double_ticket,
  avoir_a_rendre:this.avoir_a_rendre,
  sans_a_rendre:this.sans_a_rendre,
  espece_a_rendre:this.espece_a_rendre,

}
  openDialog() {
    this.dialog.open(KeyboardComponent);
  }
  ngOnInit():void{
  }
  fetchdata(){
    this.paiment.fetchdata().subscribe(posts =>{
      console.log(posts);
    });
  } 
  createData() {
    this.paiment.createData(this.newData).subscribe({
      next: (response) => {
        console.log('Data created successfully:', response);
        // Additional logic after successful creation, if necessary
      },
      error: (error) => {
        console.error('Error creating data:', error);
        // You might want to handle errors, show user feedback, etc.
      }
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Paiement ajouté avec succès',
      showConfirmButton: false,
      timer: 1500
    });
  }
  

    reset(){ 
      window.location.reload();
    }
} 