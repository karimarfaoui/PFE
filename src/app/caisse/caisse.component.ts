import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ClientService } from './../@services/client.service';
import { Component, EventEmitter, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../@services/article.service';
import { Article } from '../models/article.model';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { Ticket } from '../models/ticket.model';
import { TiketsService } from '../@services/tikets.service';
import { CaisseClient } from '../models/client.model';

@Component({
  selector: 'app-caisse',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.css',
})
export class CaisseComponent implements OnInit {
  discountType: 'percentage' | 'value' | null = null;  // Type of discount
  discountValue: number = 0;
 fontRecu : FLOAT = 0.0;
  quantities: number[] = [];
  constructor(
    
    private ClientService : ClientService,
    public dialog: MatDialog,
    private articleService: ArticleService,
    private TicketService: TiketsService
  ) {}

  displayValue: string = '';

  private prevValue: string = '';
  currValue: string = '';
  private operator: string = '';
  qty: number = 1;
  onButtonPress(symbol: string): void {
    if (['+', '-', '*', '/'].indexOf(symbol) > -1) {
      this.prevValue = this.currValue;
      this.currValue = '';
      this.operator = symbol;
    } else if (symbol === '=') {
      this.calculate();
    } else if (symbol === 'OK') {
      this.quantities.push(parseInt(this.displayValue));
      this.currValue = '';
    } else if (symbol === 'Annuler') {
      this.currValue = SlicePipe.prototype.transform(this.currValue, 0, -1);
    } else if (symbol === 'C') {
      this.clear();
    } else if (symbol === 'Cash') {
      this.submitPaymentMode(symbol);
    } else if (symbol === 'creditCard') {
      this.submitPaymentMode(symbol);
    } else if (symbol === 'TPE') {
      this.submitPaymentMode(symbol);
    } else if (symbol === 'BonAchat') {
      this.submitPaymentMode(symbol);
    } else if (symbol === 'PayPal') {
      this.submitPaymentMode(symbol);
    } else if (symbol === 'BankTransfer') {
      this.submitPaymentMode(symbol);
    } else {
      this.currValue += symbol;
    }
    this.updateDisplay();
  }

  private calculate(): void {
    const first = parseFloat(this.prevValue);
    const second = parseFloat(this.currValue);
    switch (this.operator) {
      case '+':
        this.currValue = (first + second).toString();
        break;
      case '-':
        this.currValue = (first - second).toString();
        break;
      case '*':
        this.currValue = (first * second).toString();
        break;
      case '/':
        this.currValue = (first / second).toString();
        break;
    }
    this.prevValue = '';
    this.operator = '';
  }

  private clear(): void {
    this.prevValue = '';
    this.currValue = '';
    this.operator = '';
  }

  private updateDisplay(): void {
    this.displayValue = this.currValue;
  }

  articles: Article[] = [];

  ngOnInit() {}
  smartphone: boolean = false;
  airpod: boolean = false;

  smartphoneClick() {
    this.smartphone = !this.smartphone;
    if (this.smartphone) {
      this.getArticlesBySousGroupe('Smartphones');
    }
    console.log(this.smartphone);
  }
  aripodClick() {
    this.airpod = !this.airpod;
    if (this.airpod) {
      this.getArticlesBySousGroupe('Accessoires');
    }
  }
  
  getArticlesBySousGroupe(sousGroupe: string): void {
    this.articleService.findAllBySousGroupe(sousGroupe).subscribe(
      (data) => {
        this.articles = data; // data should be an array
        console.log('Data received:', data);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  articlesID: Article[] = []; // Initialize the 'articlesID' property before using it

  getArticleById(id: number): void {
    this.articleService.findById(id).subscribe({
      next: (data) => {
        this.articlesID = this.articlesID.concat(data); // Wrapping single object in an array
        console.log('Article fetched:', data);
      },
      error: (error) => {
        console.error('Error fetching article:', error);
        this.articlesID = []; // Fallback to an empty array on error
      },
    });
  }
  addToCart(id: number) {
    console.log('Adding article with id:', id);
    this.getArticleById(id);
  }
  getTotalPrixDeVente1(i: number): number {
    if (this.currValue == '') {
      return (
        this.articlesID.reduce(
          (acc, article) => acc + article.prixDeVente1,
          0
        ) * this.quantities[i]
      );
    } else {
      this.quantities[i] = parseInt(this.currValue); // Parse the string to a number
      return (
        this.articlesID.reduce(
          (acc, article) => acc + article.prixDeVente1,
          0
        ) * this.quantities[i]
      );
    }
  }

  // ------ Create Ticket ------
  ticket: Ticket[] = [];
  createt(): void {
    const newTicket = {
      designation:
        this.articlesID.map((article) => article.designation).join(', ') ||
        'General Inquiry',
      clientName: this.client ? this.client.client_name : '',
      type_solde: this.client ? this.client.type_solde : 0, // Add null check
      quantity: this.quantities.join(', '),
      prix: this.articlesID.map((article) => article.prixDeVente1).join(', '),
      total: this.getTotalCost().toString(),
      isActive: this.activeButton,
    };

    // Push the new ticket to the tickets array
    this.ticket.push();

    // Send the last added ticket to the server
    this.TicketService.setTicket(newTicket).subscribe({
      next: () => {
        alert('Ticket created successfully!');
      },
      error: (error) => {
        console.error('Error creating ticket:', error);
        alert('Failed to create ticket.');
      },
    });
  }
  //----------getTicket----------
  getTicket(): void {
    this.TicketService.showTicket().subscribe({
      next: (tickets) => {
        this.ticket = tickets;
        this.showTicket(tickets);
        console.log('Tickets:', tickets);
      },
      error: (error) => {
        console.error('Error fetching tickets:', error);
      },
    });
  }
  //-----------------
  getTotalCost() {
    let total = 0;
    this.articlesID.forEach((article, index) => {
      total += this.quantities[index] * article.prixDeVente1;
      console.log('le font recur est "', this.fontRecu);
    });
    if (this.discountType === 'percentage') {
      // Apply a percentage-based discount
      total = total - (total * this.discountValue / 100);
    } else if (this.discountType === 'value') {
      // Subtract a fixed value from the total
      total = total - this.discountValue;
    }

    return total;
  }

  deleteItem(index: number): void {
    this.articlesID.splice(index, 1);
  }

  showReceipt() {
    if(this.activeButton == 'Cash' || this.activeButton == 'creditCard' || this.activeButton == 'TPE' || this.activeButton == 'BonAchat' || this.activeButton == 'PayPal' || this.activeButton == 'BankTransfer'){
    this.fontRecu += this.getTotalCost();
    const tableHTML = this.generateTableHTML();
    this.createt();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes print it',
    }).then((result) => {
      if (result.value) {
        this.printReceipt();
      }
    });
  }
  else{
    Swal.fire({
      title: 'Error',
      text: 'Please select a payment mode',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
  }
  generateTableHTML() {
    const total = this.calculateTotal();
    const dataHtml = `
      <div id="receipt">
        <div class="header">
          <h2>CASH RECEIPT</h2>
        </div>
        <div class="info">
          <p>Address: Lorem ipsum, Q10</p>
          <p>Tel: +01 0010010</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="items">
          <table>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${this.articlesID
              .map(
                (article, index) => `
              <tr>
                <td>${article.designation}</td>
                <td>${this.quantities[index]}</td>
                <td>${article.prixDeVente1.toFixed(2)}</td>
                <td>${(this.quantities[index] * article.prixDeVente1).toFixed(
                  2
                )}</td>
              </tr>
            `
              )
              .join('')}
          </table>
        </div>
        <div class="total">
          <strong>Total: $${total}</strong>
        </div>
        <div class="thanks">
          <p>THANK YOU!</p>
        </div>
      </div>
    `;
    return dataHtml;
  }

  // Function to print the receipt
  printReceipt() {
    const printContent = this.generateTableHTML();
    const printWindow = window.open('', '', 'height=650,width=900');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Receipt</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  calculateTotal() {
    let total = 0;
    this.articlesID.forEach((article, index) => {
      total += article.prixDeVente1 * this.quantities[index];
    });
    return total.toFixed(2);
  }
  resetTable() { 
    Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to reset the table?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
}).then((result) => {
    if (result.isConfirmed) {
        // Perform the reset action
        this.articlesID = []; // Vide le tableau des articles
        this.quantities = []; 
        this.discountType = null;
        this.discountValue = 0;
        Swal.fire(
            'Success!',
            'Table has been reset.',
            'success'
        );
    } else {
        // Do nothing if the user cancels
        Swal.fire(
            'Cancelled',
            'Table reset cancelled.',
            'info'
        );
    }
});
  }

  private createHtmlTable(data: any[]): string {
    let html =
      '<table style="width:100%; border-collapse: collapse;">' +
      '<thead>' +
      '<tr style="background-color: #007BFF; color: white;">' + // Use a nice blue header
      '<th style="padding: 10px; border: 1px solid #ddd;">Code Tikcet</th>' +
      '<th style="padding: 10px; border: 1px solid #ddd;">Designation</th>' +
      '<th style="padding: 10px; border: 1px solid #ddd;">Date</th>' +
      '<th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>' +
      '<th style="padding: 10px; border: 1px solid #ddd;">Price</th>' +
      '<th style="padding: 10px; border: 1px solid #ddd;">Total</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';
    data.forEach((item) => {
      html += `<tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.ticketId}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.designation}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.createdDate}</td>
                <td style="padding: 8px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">$${item.prix}</td>
                <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">$${item.total}</td>
               </tr>`;
    });
    html += '</tbody></table>';
    return html;
  }
  showTicket(data: any[]): void {
    const htmlTable = this.createHtmlTable(data);
    Swal.fire({
      title: 'Ticket Details',
      html: htmlTable,
      width: '150vh', // Adjusted width for better visibility
      customClass: {
        popup: 'formatted-swal',
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-primary', // Custom class for the implement button
      },
      buttonsStyling: false,
      confirmButtonText: 'Impremer le ticket', // Label for the implement button
      cancelButtonText: 'close', // Label for the implement button
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true, // Enable the implement button
      focusConfirm: false,
      padding: '1.5em',
      background: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        this.printTicket();
        console.log('Closed without implementation');
      }
    });
  }

  printTicket() {
    const printContent = this.createHtmlTable(this.ticket);
    const printWindow = window.open('', '', 'height=650,width=900');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Ticket</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  //--- show payment mode ----

  submitPaymentMode(paymentMode: string): void {
    // Implement your backend submission logic here
    console.log('Submit to backend:', paymentMode);
  }
  // here the shared of data with database --------

  activeButton: string = '';

  setActive(buttonId: string) {
    return (this.activeButton = buttonId);
  }

  //-----Client ------
  ClientPop() {
    const swalHtml = `
    <div data-mdb-input-init class="form-outline">
      <label class="form-label" for="client">Client code</label>
      <input type="text" id="client" class="form-control" />
    </div>
    `;
  
    Swal.fire({
      title: 'Enter Client Code',
      html: swalHtml,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Valider',
      confirmButtonColor: '#007BFF',
      preConfirm: () => {
        const clientCode = (Swal.getPopup()?.querySelector('#client') as HTMLInputElement).value;
        return clientCode;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const clientCode = result.value;
        if (clientCode) {
          this.getClientById(+clientCode);  // Convert string to number and fetch client
        } else {
          Swal.fire('Invalid Input!', 'Please enter a valid client code.', 'error');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = '/client';  // Navigate to the client details page
      }
    });
  }//
  //-----Client ------
  client: CaisseClient | null = null;
  getClientById(id: number): void {
    this.ClientService.getOne(id).subscribe({
      next: (data) => {
        if (data) {  // Assuming `data` will be empty or null if no client is found
          this.client = data;
          console.log('Client fetched:', data);
        } else {
          this.showNotFoundError();  // Show error if no client data is returned
        }
      },
      error: (error) => {
        console.error('Error fetching client:', error);
        this.showNotFoundError();  // Fallback to error method on network or server error
      }
    });
  }
  
  showNotFoundError() {
    Swal.fire({
      icon: 'error',
      title: 'No Client Found!',
      text: 'The client code entered does not match any existing client.',
      confirmButtonText: 'View Clients',
      confirmButtonColor: '#007BFF',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/client';  // Change this to use Angular routing if possible
      }
    });
  }
//-----------Retour Ticket -----------







//-----------Exist Caisse -----------

  // Add this method to handle the "Exist" button click
  checkExistence() {
    if (this.fontRecu > 0) {
      this.showTurnover();
    } else {
      // Update the dialog to include a navigation button
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Le font recu est 0.00, Please check for a problem?',
        confirmButtonText: 'Go Home',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/'; // Assuming '/' is your home route}

        }
      });
    }
  }

  private showTurnover() {
    Swal.fire({
      icon: 'info',
      title: 'Quittance de caisse',
      text: `Le font reçu est: $${this.fontRecu.toFixed(2)}`,
      confirmButtonText: 'Return Home',
      showCancelButton: true,
      cancelButtonText: 'Stay'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/'; // Assuming '/' is your home route}

      }
    });
  }
  


  // -----------Remise Ticket ------------
  openDiscountOptions() {
    Swal.fire({
      title: 'Select Discount Type',
      showDenyButton: true,
      confirmButtonText: 'Remise %',
      denyButtonText: `Remise Val`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.showPercentageInput();
      } else if (result.isDenied) {
        this.showValueInput();
      }
    });
  }

  showPercentageInput() {
    Swal.fire({
      title: 'Enter Percentage Discount',
      input: 'number',
      inputLabel: 'Percentage',
      inputPlaceholder: 'Enter discount percentage',
      confirmButtonText: 'Apply',
      preConfirm: (percentage) => {
        if (!percentage || percentage <= 0 || percentage > 100) {
          Swal.showValidationMessage(`Please enter a valid percentage`);
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.applyPercentageDiscount(result.value);
      }
    });
  }

  showValueInput() {
    Swal.fire({
      title: 'Enter Value Discount',
      input: 'number',
      inputLabel: 'Value',
      inputPlaceholder: 'Enter discount value',
      confirmButtonText: 'Apply',
      preConfirm: (value) => {
        if (!value || value <= 0) {
          Swal.showValidationMessage(`Please enter a valid discount value`);
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.applyValueDiscount(result.value);
      }
    });
  }

  applyPercentageDiscount(percentage: number) {
    this.discountType = 'percentage';
    this.discountValue = percentage;
    console.log('Discount percentage applied:', percentage);
  }
  
  applyValueDiscount(value: number) {
    this.discountType = 'value';
    this.discountValue = value;
    console.log('Discount value applied:', value);
  }
  //-------Sous total --------
  sousTotal: number = 0;
  calculateSubtotal(price: number, quantity: number): number {
    this.sousTotal = price * quantity;
    return price * quantity;
  }
  sousTotalDiscounted(){
    this.sousTotal = this.getTotalCost();
  }

}
