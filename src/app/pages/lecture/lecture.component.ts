import { TicketService } from './../../@services/ticket.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit,} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Keyboard, { SimpleKeyboard } from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import { CheckboxModule } from 'primeng/checkbox';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TiketsService } from '../../@services/tikets.service';

@Component({
  selector: 'app-lecture',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './lecture.component.html',
  styleUrl: './lecture.component.css'
})
export class LectureComponent implements OnInit{
  cash = 0;
  tpe = 0;
  bonAchat = 0;
  total = 0;

  constructor(private ticketService: TiketsService) { }

  ngOnInit(): void {
 
  }
  fetchAndDisplayTotals(): void {
    this.ticketService.getTotalsByIsActive().subscribe(
      data => {
        this.displayTotals(data);
      },
      error => {
        console.error('Error fetching totals:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching totals!'
        });
      }
    );
  }

  

  displayTotals(totals: any[]): void {
    let htmlContent = '<table border="1" style="width:100%; border-collapse: collapse;"><thead><tr>';
    
    // Add dynamic headers based on isActive values
    totals.forEach(total => {
      htmlContent += `<th>${total.isActive}</th>`;
    });
    
    htmlContent += '</tr></thead><tbody><tr>';
    
    // Add the totalSum values
    totals.forEach(total => {
      htmlContent += `<td>${total.totalSum}</td>`;
    });
    
    htmlContent += '</tr></tbody></table>';
    
    // Add print button
    htmlContent += '<br><button class="btn btn-primary payment-button" onclick="window.print()">Imprimer</button>';
  
    Swal.fire({
      title: 'Totals by isActive',
      html: htmlContent,
      icon: 'info',
      customClass: {
        popup: 'swal2-custom-popup'
      }
    });
  }
  
  showTicketTotals(): void {
    this.ticketService.getTotalsByIsActiveAndCaissier().subscribe(results => {
      let totalOfTotals = results.reduce((acc: number, result: { totalSum: string; }) => acc + parseFloat(result.totalSum), 0);
  
      let htmlContent = `
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
            color: #333;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
        <table>
          <thead>
            <tr>
              <th>Caissier</th>
              <th>Mode de paiement</th>
              <th>Total Sum</th>
            </tr>
          </thead>
          <tbody>
      `;
      results.forEach((result: { caissier: any; isActive: any; totalSum: any; }) => {
        htmlContent += `
          <tr>
            <td>${result.caissier}</td>
            <td>${result.isActive}</td>
            <td>${result.totalSum}</td>
          </tr>
        `;
      });
      htmlContent += `
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="text-align: right;"><strong>Total:</strong></td>
              <td><strong>${totalOfTotals}</strong></td>
            </tr>
          </tfoot>
        </table>
        <button class="btn btn-primary payment-button" onclick="window.print()">Imprimer</button>
      `;
  
      Swal.fire({
        title: 'Ticket Totals',
        html: htmlContent,
        icon: 'info',
        width: '600px'
      });
    });
  }
  
  
  openDialog() {
    Swal.fire({
      title: 'Lecture des ventes par heure',
      html: `
        <table class="table">
          <thead>
            <tr>
              <th>Heure</th>
              <th>Montant</th>
              <th>Nombre de Client</th>
            
            </tr>
          </thead>
          <tbody>
            <td>09h->10h</td>
            <td>1750</td>
            <td>3</td>
          </tbody>
        </table>
      `,
      showCancelButton: true,
      confirmButtonText: 'Lecture',
      cancelButtonText: 'Imprimer',
      width: '800px',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        
      },
      buttonsStyling: false,
      preConfirm: () => {
        // Logic to handle data reading or manipulation here
      }
    });
  }
 openDialog2() {
  Swal.fire({
    title: 'Lecture des ventes par article',
    html: `
      <table class="table">
        <thead>
          <tr>
            <th>Code article</th>
            <th>Désignation</th>
            <th>Qté</th>
            <th>Prix.U </th>
            <th>Remise</th>
            <th>Prix.T</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
          <td>Article 1</td>
          <td>10</td>
          <td>100</td>
          <td>0</td>
          <td>1000</td>
          </tr>
          <tr>
          <td>2</td>
          <td>Article 2</td>
          <td>5</td>
          <td>100</td>
          <td>0</td>
          <td>500</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Total</th>
            
          </tr>
        </thead>
        <tbody>
          <td>1500</td>
        </tbody>
      </table>

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }

 openDialog3() {
  Swal.fire({
    title: 'Lecture des ventes par Client',
    html: `
      <table class="table">
        <thead>
          <tr>
            <th>Code Client</th>
            <th>Client</th>
            <th>Montant Accompte</th>
            <th>Montant Vente </th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
          <td>Aziz</td>
          <td>175</td>
          <td>200</td>
          </tr>
          <tr>
          <td>2</td>
          <td>Karim</td>
          <td>200</td>
          <td>250</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Total de Montant Accompte</th>
            <th>Total de Montant Vente</th>

          </tr>
        </thead>
        <tbody>
          <td>375</td>
          <td>450</td>
        </tbody>
      </table>

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }

 openDialog4() {
  Swal.fire({
    title: 'Lecture des ventes par groupe',
    html: `
      <table class="table">
        <thead>
          <tr>
            <th>Code article</th>
            <th>Groupe</th>
            <th>Qté</th>
            <th>Prix.U </th>
            <th>Remise</th>
            <th>Prix.T</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
          <td> Smartphone</td>
          <td>10</td>
          <td>100</td>
          <td>0</td>
          <td>1000</td>
          </tr>
          <tr>
          <td>2</td>
          <td> Smartphone</td>
          <td>5</td>
          <td>100</td>
          <td>0</td>
          <td>500</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            
            <th>Total</th>
            
          </tr>
        </thead>
        <tbody>
          <td>1500</td>
        </tbody>
      </table>

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }

 openDialog5() {
  Swal.fire({
    title: 'Lecture des ventes par retour par article',
    html: `
      <table class="table">
        <thead>
          <tr>
            <th>Caissier</th>
            <th>n° ticket</th>
            <th>Code article</th>
            <th>Désignation </th>
            <th>Qté</th>
            <th>Prix.U/th>
            <th>Prix.T</th>
          </tr>
        </thead>
        <tbody>
          <tr>
     
          <td>Aziz</td>
          <td>1</td>
          <td>1</td>
          <td>Article 1</td>
          <td>2</td>
          <td>100</td>
          <td>200</td>
          </tr>
          <tr>
          <td>Karim</td>
          <td>2</td>
          <td>2</td>
          <td>Article 2</td>
          <td>1</td>
          <td>100</td>
          <td>100</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Qte Total </th>
            <th>Total</th>

          </tr>
        </thead>
        <tbody>
          <td>3</td>
          <td>300</td>
        </tbody>
      </table>

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }

 openDialog6() {
  Swal.fire({
    title: 'Lecture des Rapport financier',
    html: `
      <table class="table">
        <thead>
          <tr>
            <th>Espece</th>
            <th>Tpe</th>
            <th>Bon D'achat</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
     
          <td>2500</td>
          <td>100</td>
          <td>600</td>
          <td>3400</td>
          </tr>
          
        </tbody>
      </table>
     

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }

 openDialog7() {
  Swal.fire({
    title: 'Lecture des Rapport caissier',
    html: `
      <table class="table">
        <thead>
          <tr>
            <th>Caissier</th>
            <th>Espece</th>
            <th>Chéque </th>
            <th>Tpe</th>
            <th>Bon D'achat</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>Aziz</td>
          <td>2500</td>
          <td>100</td>
          <td>600</td>
          <td>200</td>
          <td>3400</td>
          </tr>
          <tr>
          <td>karim</td>
          <td>1000</td>
          <td>500</td>
          <td>250</td>
          <td>250</td>
          <td>2000</td>
          </tr>
          
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          
          <td>5400</td>
         
          
        </tbody>
      </table>
      

     

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }

 openDialog8() {
  Swal.fire({
    title: 'Lecture des ventes par caissier/article',
    html: `
     <input type="text" class="form-control" placeholder="Code caissier">
      <table class="table">
        <thead>
          <tr>
            <th>Code article</th>
            <th>Groupe</th>
            <th>Qté</th>
            <th>Prix.U </th>
            <th>Remise</th>
            <th>Prix.T</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td></td>
          <td> </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
          <td></td>
          <td> </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
          <td></td>
          <td> </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
          <td></td>
          <td> </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            
            <th>Total</th>
            
          </tr>
        </thead>
        <tbody>
          <td></td>
        </tbody>
      </table>

    `,
    showCancelButton: true,
    confirmButtonText: 'Lecture',
    cancelButtonText: 'Imprimer',
    width: '800px',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    preConfirm: () => {
      // Logic to handle data reading or manipulation here
    }
  });
  

 }



}