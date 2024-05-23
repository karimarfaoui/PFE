import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaisseClient } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:7000/api/client';

  constructor(private http: HttpClient) { }

  // Method to fetch data from the server
  fetchData() {
    return this.http.get<any>(this.url);
  }

  // Method to create new data on the server
  create(data: any): Observable<any> {
  
    return this.http.post<any>(this.url, data);
  }
  getOne(id: any): Observable<CaisseClient> {
    return this.http.get<CaisseClient>(this.url + '/' + id);
  }
}
