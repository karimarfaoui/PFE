import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FicheparamService {

  constructor(private http : HttpClient) { }
  private url: string = "http://localhost:7000/api/ficheparam";
  fetchData(){
    return this.http.get<any>(this.url);
  }
  create(data: any){
    return this.http.post<any>(this.url,data);
  }
  getOne(id: any){
    return this.http.get<any>(this.url + '/' + id);
  }

}
