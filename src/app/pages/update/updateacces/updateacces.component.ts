import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { KeyboardComponent } from '../../../keyboard/keyboard.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AccesService } from '../../../@services/acces.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-acces',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule,RouterLink,CheckboxModule,NgFor,HttpClientModule,KeyboardComponent],
  templateUrl: './updateacces.component.html',
  styleUrl: './updateacces.component.css'
})
export class UpdateaccesComponent {
  keyboardVisible : boolean = false;
  clicker=false;
  id=0;
  caissier="";
  password="";
  encaissement = false;
  rapport = false;
  raz = false;
  rap_period = false;
  configuration = false;
  annul_art = false;
  annul_tick = false;
  prelevement = false;
  liste_tick = false;
  remise = false;
  pay_offre = false;
  sc = false;
  admin:boolean=false;
  caissierr:boolean=false;
 
  
  

constructor(public dialog: MatDialog, private acces: AccesService) { } 

ngOnInit() : void{
}



newData = {
  id:this.id,
  caissier: this.caissier,
  password: this.password,
  encaissement: this.encaissement,
  rapport: this.rapport,
  raz: this.raz,
  rap_period: this.rap_period,
  configuration: this.configuration,
  annul_art: this.annul_art,
  annul_tick: this.annul_tick,
  prelevement: this.prelevement,
  liste_tick: this.liste_tick,
  remise: this.remise,
  pay_offre: this.pay_offre,
  sc: this.sc,
  admin: this.admin,
  caissierr: this.caissierr,
 
};

create(){
  this.acces.create(this.newData).subscribe({
   next : (response) => {
    console.log('data created', response);
    Swal.fire({
      title: 'Data saved successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  },
  error: (error) => {
    console.error('Error creating data:', error.error.message);
    Swal.fire({
      title: 'Error',
      text: error.error.message,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    });
  }
});
}
checked : boolean = false;
selectAll(event: Event): void{
  const checked = (event.target as HTMLInputElement).checked;
  this.newData.encaissement = this.newData.rapport = this.newData.raz = this.newData.rap_period= this.newData.configuration=this.newData.annul_art=this.newData.annul_tick =this.newData.prelevement= this.newData.liste_tick=this.newData.remise= this.newData.pay_offre = this.newData.sc = checked;
console.log(this.encaissement, "this.encaissement");
}
fetchData(){
  this.acces.fetchAcces().subscribe(posts =>{
    console.log(posts);
  });
}
showTableInSwal() {
  this.acces.fetchAcces().subscribe({
    next: (data) => {
      Swal.fire({
        title: 'Détails du acces',
        html: this.formatPaymentData(data),
        icon: 'info',
        width: '60%',
        confirmButtonText: 'Fermer',
       
      });
    },
    error: (error) => {
      console.error('There was an error!', error);
    }
  });
}
 formatPaymentData(data: any[]): string {
  return `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom Caissier</th>
          <th>Admin</th>
          <th>Caissier</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((acces: { 
          id:any;
          caissier: any; 
          password: any; 
          encaissement: any;
          rapport: any;
          raz: any;
          rap_period: any;
          configuration: any;
          annul_art: any;
          annul_tick: any;
          prelevement: any;
          liste_tick: any;
          remise: any;
          pay_offre: any;
          sc: any;
          admin: any;
          caissierr: any;
     
        }) => {

          return `
            <tr>
            <td>${acces.id}</td>
              <td>${acces.caissier}</td>
              <td>${acces.admin}</td>
              <td>${acces.caissierr}</td>
         
              
            </tr>
           
          `;
          
        }).join('')}
      </tbody>
    </table>
  `;
  
}

deleteAcces(id: number) {
  this.acces.delete(id).subscribe({
    next: (response) => {
      console.log('Data deleted:', response);
      Swal.fire({
        title: 'Data deleted successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    },
    error: (error) => {
      console.error('Error deleting data:', error.error.message);
      Swal.fire({
        title: 'Error',
        text: error.error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}
deleteButton() {
  Swal.fire({
    title: 'Are you sure you want to delete this data?',
    icon: 'warning',
    html:`<strong>Inserte ID:</strong>
    <input type="text" id="id" class="swal2-input" placeholder="ID">
    `,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d'
  }).then((result) => {
    const id = Number((document.getElementById('id') as HTMLInputElement).value);

    if (result.isConfirmed && !isNaN(id)) {
      this.deleteAcces(id);
    }
  });
} 
findAcees(id: number) {
  this.acces.findOne(id).subscribe(data => {
    console.log(data);
    if (data == null) {
      Swal.fire('Acces n\'existe pas');
    }
  });
}
updateOneAcces(){
  this.acces.updateData(this.newData.id, this.newData).subscribe({
    next: (response) => {
      console.log('Data updated successfully:', response);
      console.log( response);
      Swal.fire({
        title: 'Data updated successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    },
    error: (error) => {
      console.error('Error updating data:', error.error.message);
      Swal.fire({
        title: 'Error',
        text: error.error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}

// openDialog() {
//   this.dialog.open(DeletComponent);
  
// }
// openDialog1() {
//   this.dialog.open(GetAccesComponent);
  
// }
fermerButton(){
  location.reload();
}
}