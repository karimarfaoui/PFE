import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private url = 'http://localhost:7000/api/paiment';

  constructor(private http:HttpClient) { }
  fetchdata(){
    return this.http.get(this.url);
  }
  createData(data:any):Observable<any>{
    return this.http.post(this.url,data);
  }
  deleleteData(id:any):Observable<any>{
    return this.http.delete(this.url+'/'+id);
  }
  updateData(id:any,newData:any):Observable<any>{
    return this.http.put(this.url+'/'+id,newData);
  }
}
