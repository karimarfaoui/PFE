import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isLoggedIn: boolean = true;
  areItemsVisible: boolean = false;
  areItemsVisible2: boolean = false;


 
  authentification() {
    this.areItemsVisible = !this.areItemsVisible;
    console.log(this.areItemsVisible);
  }
  authentification2() {
    this.areItemsVisible2 = !this.areItemsVisible2;
    console.log(this.areItemsVisible2);
  }
}
