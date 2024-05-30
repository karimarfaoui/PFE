import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { Acces } from '../models/acces.model';

@Injectable({
  providedIn: 'root'
})
export class AccesService {
  private url = 'http://localhost:7000/api/acess';
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) { }
  fetchAcces(): Observable<Acces[]> {
    return this.http.get<Acces[]>(this.url)
  }
  create(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
  login(password: number): Observable<any> {
    return this.http.post(this.url + '/login', { password });
  }
  updateUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user)); // Update local storage with new user data
    console.log('User updated:', user);
  }
  updateData(id: number, newData: any): Observable<any> {
    return this.http.put(this.url + '/' + id, newData);
  }
  findOne(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/' + id);
  }
}