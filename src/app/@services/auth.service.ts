import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // This ensures that the service is available application-wide
})
export class AuthService {
    constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    console.log('Token:', token);
    return !!token; // Ensure this logic correctly reflects your auth state
  }

  checkLocalStorage(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/home']);
    }
  }
}