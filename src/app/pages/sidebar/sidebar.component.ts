import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AccesService } from '../../@services/acces.service';
import { Acces } from '../../models/acces.model';
import { HttpClientModule } from '@angular/common/http';
import { RefreshService } from '../../@services/refresh.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, HttpClientModule, HomeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isLoggedIn: boolean = false;
  areItemsVisible: boolean = false;
  areItemsVisible2: boolean = false;
  encaissement:boolean = false;

  constructor(private acces: AccesService,private refreshService: RefreshService) { }
   user:any={
    encaissement : false,

   };
   ngOnInit() {
    this.refreshService.getRefreshNeeded().subscribe(refresh => {
      if (refresh) {
    this.initializeUserFromLocalStorage();
    this.refreshService.resetRefresh(); // Optionally reset after handling
  }
});
  }
  authentification() {
    
    this.areItemsVisible = !this.areItemsVisible;
    console.log(this.areItemsVisible);
  }
  authentification2() {
    this.areItemsVisible2 = !this.areItemsVisible2;
    console.log(this.areItemsVisible2);
  }
  initializeUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.isLoggedIn = true; // Assuming presence in local storage means logged in
    } else {
      console.error('No user data available in local storage.');
    }
  }

  resetUserState() {
    this.isLoggedIn = false;
    this.user = null;
    this.encaissement = false;
  }
  
  
}
