import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
  
  //responseType: 'text' as 'json'
};



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "/api/";
  private signInUrl = "user/signIn";


  constructor(private _http:HttpClient) { }

  signIn(credentials:object):Observable<any>{

    return this._http.post(this.baseUrl + this.signInUrl, credentials, httpOptions);
  }

  getData(endPoint:string):Observable<any>{
    return this._http.get(this.baseUrl + endPoint);
  }
}
