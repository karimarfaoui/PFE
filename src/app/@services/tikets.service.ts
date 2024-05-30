import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiketsService {
  private url = 'http://localhost:7000/api/ticket';

  constructor(private http : HttpClient) { }

getticket(): Observable<any[]> {
  return this.http.get<any[]>(this.url);  
}
  setTicket(ticket: any): Observable<any> {
    return this.http.post<any>(this.url, ticket); // Specify the type of the response as Observable<Ticket>
  }
  showTicket(): Observable<Ticket[]> { // Specify the type of the response as Observable<Ticket[]>
    return this.http.get<Ticket[]>(this.url); // Specify the type of the response as Observable<Ticket[]>
  }
  getTotalsByIsActive(): Observable<any> {
    return this.http.get(this.url+'/calculate');
  } 
  getTotalsByIsActiveAndCaissier(): Observable<any> {
    return this.http.get(this.url+'/caissier');
  }
}
