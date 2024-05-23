
import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Keyboard, { SimpleKeyboard } from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import Swal from 'sweetalert2';

@Component({

  selector: 'app-home',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule,RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Update the path to the correct CSS file
})

export class HomeComponent implements OnInit{
  value = '';
  logIn = false;

  @ViewChild('keyboardRef', { static: true }) keyboardRef: ElementRef | undefined;
  inputValue: string = '';
  keyboard: any;
  LoginService: any;

  ngOnInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp}"],
        show: ["{show } ) +", "{bksp}"

        ]
      },
      theme: "hg-theme-default"
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.inputValue = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  onSubmit() { 
    if (this.inputValue === '1') {
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        showConfirmButton: false,
        timer: 1500      });
        this.LoginService.setLoggedIn(true);

    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password is incorrect!',
      });
    }
  }

}