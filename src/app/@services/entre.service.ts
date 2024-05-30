import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntreService {
  private url = 'http://localhost:7000/api/entre';
  constructor(private http: HttpClient) { }


   addEntrees(entrees: any[]): Observable<any> {
    return this.http.post(this.url, { entrees });
  }
    getEntre(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
}

    deleteAll(): Observable<any> {
      return this.http.delete(this.url);
    }      
}
