import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  [x: string]: any;
  private url = 'http://localhost:7000/api/article';
  constructor(private http: HttpClient) {}
  fetchData(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url, article);
  }
  findAllBySousGroupe(sousGroupe: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + '/' + sousGroupe);
  }
  findById(id: number): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + '/findOne/' + id);
  }
 
  delete(code_pro:any):Observable<any>{
    return this.http.delete(this.url+'/'+code_pro);
  }
  find(code_pro:any):Observable<any>{
    return this.http.get(this.url+'/'+code_pro);
  }
  update():Observable<any>{
    return this.http.put(this.url+'/', {});
  }
  updateData(code_pro:any, newData:any):Observable<any>{
    return this.http.put(this.url+'/'+code_pro, newData);
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/');
  }
}
