import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  private apiUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2025-02-20&sortBy=publishedAt&apiKey=9be5c52bc1ae4ecc8add5e1f8cd029e9';
  private apiUr2 = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getautor(){
    return this.http.get<any>(this.apiUr2);

  }
}
