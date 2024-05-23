// ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
 // Import the Ticket interface

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url = 'http://localhost:7000/api/ticket'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.url, ticket); // Specify the type of the response as Observable<Ticket>
  }

  getTickets(): Observable<Ticket[]> { // Specify the type of the response as Observable<Ticket[]>
    return this.http.get<Ticket[]>(this.url); // Specify the type of the response as Observable<Ticket[]>
  }
}
