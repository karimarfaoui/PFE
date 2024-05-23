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
}
