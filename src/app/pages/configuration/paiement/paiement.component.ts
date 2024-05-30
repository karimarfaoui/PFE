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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,
    HttpClientModule,ToggleButtonModule,KeyboardComponent,RouterLink],
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
  list(){
    
    this.paiment.fetchdata().subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Détails du paiement',
          html: this.formatPaymentData(data),
          icon: 'info',
          confirmButtonText: 'Fermer'
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  private formatPaymentData(data: any[]): string {
    return data.map((payment: { code_paiment: any; libelle_paiment: any;
      type_reglement_espece:boolean;
      type_reglement_carte_credit:boolean;
      type_reglement_carte:boolean;
      type_reglement_credit:boolean;
      type_reglement_cheque:boolean;    
      type_reglement_offre:boolean;
      double_ticket:boolean;
      avoir_a_rendre:boolean;
      sans_a_rendre:boolean;
      espece_a_rendre:boolean;}) => {
      return `
      
      <div>
      <strong>Code de paiement:</strong> ${payment.code_paiment}<br>
      <strong>Libellé de paiement:</strong> ${payment.libelle_paiment}<br>
      <hr />
    </div>
      `;
    }).join('');
  }
  deletePayment(id: any) {
    this.paiment.deleleteData(id).subscribe({
      next: (response) => {
        console.log('Data deleted successfully:', response);
        // Additional logic after successful deletion, if necessary
      },
      error: (error) => {
        console.error('Error deleting data:', error);
        // You might want to handle errors, show user feedback, etc.
      }
    });
  }
  deletep(){
    Swal.fire({
      title: 'Voulez-vous supprimer ce paiement?',
      icon: 'warning',
      html: `<strong>Inserte ID:</strong>
      <input type="text" id="id" class="swal2-input" placeholder="ID">
      `,
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = (document.getElementById('id') as HTMLInputElement).value;
        this.deletePayment(id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paiement supprimé avec succès',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  updatePayment(id: any, newData: any) {
    this.paiment.updateData(id, newData).subscribe({
      next: (response) => {
        console.log('Data updated successfully:', response);
        // Additional logic after successful update, if necessary
      },
      error: (error) => {
        console.error('Error updating data:', error);
        // Error handling
      }
    });
  }
  
  updatep(){
    Swal.fire({
      title: 'Voulez-vous mettre à jour ce paiement?',
      icon: 'warning',
      html: `
        <strong>Inserte ID:</strong>
        <input type="text" id="id" class="swal2-input" placeholder="ID">
        <strong>Libellé de paiement:</strong>
        <input type="text" id="libelle_paiment" class="swal2-input" placeholder="Libellé de paiement">
        <strong>Type règlement en espèce:</strong>
        <input type="checkbox" id="type_reglement_espece" class="swal2-checkbox">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const id = (document.getElementById('id') as HTMLInputElement).value;
        const libelle_paiment = (document.getElementById('libelle_paiment') as HTMLInputElement).value;
        const type_reglement_espece = (document.getElementById('type_reglement_espece') as HTMLInputElement).checked;
        return { id, libelle_paiment, type_reglement_espece };
      },
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.updatePayment(result.value.id, {
          libelle_paiment: result.value.libelle_paiment,
          type_reglement_espece: result.value.type_reglement_espece
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paiement mis à jour avec succès',
          timer: 1500
        });
      }
    });
  }
  refresh(){
    location.reload();
  }
   
}