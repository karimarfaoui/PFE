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
      type_ancien_solde: this.type_ancien_solde,*/