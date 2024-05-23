import { Component, EventEmitter, Output } from '@angular/core';
import { KeyboardValueService } from '../@services/keyboard-value.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
[x: string]: any;  displayValue: string = ''; // This holds the text shown in the display.
buttons = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
chars: string[] = []; // This array holds all characters for the displayValue.

constructor(
  private dialogRef: MatDialogRef<KeyboardComponent>,
  private sharedData: KeyboardValueService
) {}

// Method to add a character to the chars array and update the display.
addChar(char: string): void {
  this.chars.push(char);
  this.updateDisplayValue();
}

// Method to remove the last character from the chars array and update the display.
deleteChar(): void {
  this.chars.pop();
  this.updateDisplayValue();
}

// Method to add a space to the chars array and update the display.
addSpace(): void {
  this.chars.push(' ');
  this.updateDisplayValue();
}

// Method to toggle the case of all buttons between upper and lower case.
toggleCase(): void {
  this.buttons = this.buttons.map(button => 
    button === button.toUpperCase() ? button.toLowerCase() : button.toUpperCase()
  );
}

// Helper method to update the displayValue from the chars array.
private updateDisplayValue(): void {
  this.displayValue = this.chars.join('');
  this.sharedData.updateDisplayValue(this.displayValue);
}

// Method to close the dialog and return the current value
closeKeyboard(): void {
  this.dialogRef.close(this.displayValue);
}
}