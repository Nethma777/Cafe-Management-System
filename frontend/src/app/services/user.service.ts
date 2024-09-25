import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  signup(data: any):Observable<any>{ {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // Return the observable from the HTTP post request
    return this.httpClient.post(`${this.url}/user/signup`, data, { headers });
   // return this.httpClient.post(`${this.url+
    //  "/user/signup"}`, data),{
     //   headers:new HttpHeaders().set('Content-Type','application/json')
      }
  }

  forgotPassword(data: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.url}/user/forgotPassword`, data, { headers });
  }

  login(data: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.url}/user/login`, data, { headers });
  }

  checkToken(): Observable<any> {
    return this.httpClient.get(this.url + "/user/checkToken");
  }
  
}
