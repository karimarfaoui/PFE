import { LoginService } from './../../login.service';
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
  isLoggedIn: boolean = false;
  areItemsVisible: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getLoggedIn().subscribe(() => {
      this.isLoggedIn = true;
    });
  }

  authentification() {
    this.areItemsVisible = !this.areItemsVisible;
    console.log(this.areItemsVisible);
  }
}
