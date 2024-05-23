import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-cash',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './payment-cash.component.html',
  styleUrl: './payment-cash.component.css'
})
export class PaymentCashComponent {
  public constructor(private dialog : MatDialog) { }

  openDialog() {
    this.dialog.open(PaymentFormComponent);
  }
  orderNumber = 0;
  tipAmount = 0;
  totalAmount = 0;
  inputAmount = 0;
  paymentMethods = [
    new PaymentMethod('Cash', 'assets/cash-icon.png'),
    new PaymentMethod('Visa', 'assets/visa-icon.png'),
    new PaymentMethod('MasterCard', 'assets/mastercard-icon.png')
  ];
  numbers: (number | string)[] = Array.from<number, number | string>({length: 10}, (_, i) => i).concat(['.', '00']);

  selectMethod(method: PaymentMethod) {
    alert(`Payment method selected: ${method.name}`);
  }

  appendNumber(num: number | string) {
    this.inputAmount = parseFloat(`${this.inputAmount}${num}`);
  }

  clear() {
    this.inputAmount = 0;
  }

  backspace() {
    let inputStr = this.inputAmount.toString();
    if (inputStr !== '0' && inputStr.length > 1) {
      this.inputAmount = parseFloat(inputStr.slice(0, -1)) || 0;
    } else {
      this.inputAmount = 0;
    }
  }
  addAmount() {
    this.totalAmount += this.inputAmount;
    this.inputAmount = 0; // reset input amount after adding
  }
}

class PaymentMethod {
  constructor(public name: string, public icon: string) {}
}

