import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KeyboardComponent } from '../../keyboard/keyboard.component';
import { ClientService } from '../../@services/client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [KeyboardComponent, ReactiveFormsModule, HttpClientModule,FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  // Properties initialization can be simplified
  clicker = false;
  code_client = 0; 
  client_name = "";
  client_address = "";
  client_ville = "";
  client_email = "";
  client_ob = "";
  client_tel = 0;
  client_fax = 0;
  client_mf = "";
  client_date = new Date();
  bloque = false;
  type_carte = false;
  type_fidelite = false;
  type_credit = false;
  type_prix2 = false;
  type_fidelete_point = false;
  type_type7 = false;
  type_type8 = false;
  type_vente = false;
  type_solde = 0;
  type_ancien_solde = 0;

  constructor(public dialog: MatDialog, private client: ClientService) { } // No need for @Inject here, normal DI is sufficient

  openDialog() {
    this.dialog.open(KeyboardComponent);
  }

  ngOnInit(): void {
    // Initial data fetching or other setup
  }

  fetchdata(){
    this.client.fetchData().subscribe(posts =>{
      console.log(posts);
    });
  } 
  newData = {
    code_client: this.code_client,
    client_name: this.client_name,
    client_address: this.client_address,
    client_ville: this.client_ville,
    client_email: this.client_email,
    client_ob: this.client_ob,
    client_tel: this.client_tel,
    client_fax: this.client_fax,
    client_mf: this.client_mf,
    client_date: this.client_date,
    bloque: this.bloque,
    type_carte: this.type_carte,
    type_fidelite: this.type_fidelite,
    type_credit: this.type_credit,
    type_prix2: this.type_prix2,
    type_fidelete_point: this.type_fidelete_point,
    type_type7: this.type_type7,
    type_type8: this.type_type8,
    type_vente: this.type_vente,
    type_solde: this.type_solde,
    type_ancien_solde: this.type_ancien_solde
  };

  create() {
    this.client.create(this.newData).subscribe({
      next: (response) => {
        console.log('Data created successfully:', response);
        Swal.fire({ 
          icon: 'success',
          title: 'Client ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle successful creation, maybe navigate or clear form
      },
      error: (error) => {
        console.error('Error creating data:', error);
        // Handle error, show user feedback
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'ajout du client',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  list(){
    
    this.client.fetchData().subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Détails du client',
          html: this.formatPaymentData(data),
          icon: 'info',
          width: '60%',
          confirmButtonText: 'Fermer'
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }private formatPaymentData(data: any[]): string {
    return `
      <table class="table">
        <thead>
          <tr>
            <th>Code de client</th>
            <th>Libellé de name</th>
            <th>Libellé de téléphone</th>
            <th>Type de Carte</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((payment: { 
            code_client: any; 
            client_name: any; 
            client_tel: any;
            type_carte: boolean;
            type_fidelite: boolean; 
            type_credit: boolean;  
            type_prix2: boolean;
            type_fidelete_point: boolean;
            type_type7: boolean;
            type_type8: boolean;
            type_vente: boolean;
          }) => {
            return `
              <tr>
                <td>${payment.code_client}</td>
                <td>${payment.client_name}</td>
                <td>${payment.client_tel}</td>
                <td>
                  ${payment.type_carte ? 'Sans Carte' : ''}
                  ${payment.type_fidelite ? 'Fidélité' : ''}
                  ${payment.type_credit ? 'Crédit' : ''}
                  ${payment.type_prix2 ? 'Prix2' : ''}
                  ${payment.type_fidelete_point ? 'Fidélité Point' : ''}
                  ${payment.type_type7 ? 'Type7' : ''}
                  ${payment.type_type8 ? 'Type8' : ''}
                  ${payment.type_vente ? 'Vente' : ''}
                </td>
              </tr>
             
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }
  
}

/*
      code_client: this.code_client,
      client_name: this.client_name,
      client_address: this.client_address,
      client_ville: this.client_ville,
      client_email: this.client_email,
      client_ob: this.client_ob,
      client_tel: this.client_tel,
      client_fax: this.client_fax,
      client_mf: this.client_mf,
      client_date: this.client_date,
      type_carte: this.type_carte,
      type_fidelite: this.type_fidelite,
      type_credit: this.type_credit,
      type_prix2: this.type_prix2,
      type_fidelete_point: this.type_fidelete_point,
      type_type7: this.type_type7,
      type_type8: this.type_type8,
      type_vente: this.type_vente,
      type_solde: this.type_solde,
      type_ancien_solde: this.type_ancien_solde,*//*  */