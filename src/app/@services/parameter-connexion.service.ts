import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParameterConnexionService {
  private url ='http://localhost:7000/api/config'

  constructor(private http : HttpClient) { }
fetchData(){
  return this.http.get(this.url);
}
create(data:any){
  return this.http.post(this.url,data);
}


}
