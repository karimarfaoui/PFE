
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit,} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Keyboard, { SimpleKeyboard } from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import Swal from 'sweetalert2';

@Component({

  selector: 'app-home',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Update the path to the correct CSS file
})

export class HomeComponent implements OnInit{
  keyboardVisible : boolean = false;
  logIn: boolean = false;
showKeyboard() {
  this.keyboardVisible = !this.keyboardVisible; 
  console.log(this.keyboardVisible);
}
  
  keyboard: Keyboard = {} as Keyboard;
  inputValue: string = '';

  ngOnInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange(input: string) {
    this.inputValue = input;
    console.log("Input changed", input);
  }

  onKeyPress(button: string) {
    this.inputValue = button;
    this.inputValue.slice(0, -1);
    if(this.inputValue === '{bksp}'){
      this.inputValue='';
    }
  }
  areItemsVisible :boolean = false;
  authentification() {
    this.areItemsVisible = !this.areItemsVisible;
    console.log(this.areItemsVisible);
  }
  onSubmit() { 
    if (this.inputValue === '1234') {
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        showConfirmButton: false,
        timer: 1500      });
        this.logIn = true;
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password is incorrect!',
      });
    }
  }

}