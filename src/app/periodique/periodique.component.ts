import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodique',
  standalone: true,
  imports: [],
  templateUrl: './periodique.component.html',
  styleUrl: './periodique.component.css'
})
export class PeriodiqueComponent {

  lecture(){
    Swal.fire({
      title: 'Lecture des ventes par article',
      html: `
        <table class="table">
          <thead>
            <tr>
              <th>Code article</th>
              <th>Désignation</th>
              <th>Qté</th>
              <th>Valeur brut</th>
              <th>Remise</th>
              <th>Valeur net</th>
            </tr>
          </thead>
          <tbody>
            <td>1</td>
            <td>Article 1</td>
            <td>10</td>
            <td>1000</td>
            <td>100</td>
            <td>900</td>
          </tbody>
        </table>
      `,
      showCancelButton: true,
      confirmButtonText: 'Lecture',
      cancelButtonText: 'Fermer',
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
