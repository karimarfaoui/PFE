import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './@services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.isAuthenticated()) {
      // Redirect and stop further processing
      this.router.navigate(['/login']);
      return EMPTY; // Use EMPTY to immediately complete the observable sequence
    }

    const authToken = localStorage.getItem('authToken');
    const authReq = authToken ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    }) : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']);
          return EMPTY; // Prevent further processing if an error occurs after the request is sent
        }
        return throwError(() => error);
      })
    );
  }
}
