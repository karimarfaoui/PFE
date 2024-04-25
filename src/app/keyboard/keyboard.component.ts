import { Component } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {

  buttons = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  chars: string[] = [];

  addChar(char: string) {
    this.chars.push(char);
  }

  deleteChar() {
    this.chars.pop();
  }

  addSpace() {
    this.chars.push(' ');
  }

  toggleCase() {
    this.buttons = this.buttons.map(button => button === button.toUpperCase() ? button.toLowerCase() : button.toUpperCase());
  }

}
