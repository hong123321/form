import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions ={
  headers: new HttpHeaders({'conten-type':'application/JSON'})
}
@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  api:string= "https://61d7f81be6744d0017ba8879.mockapi.io/user/datausers?id=1"
  constructor(private http:HttpClient) { }
  getDatauser():Observable<any>{
    return this.http.get<any>(this.api)
  }
  updatUser(data:any):Observable<any>{
    return this.http.put<any>(this.api,data,httpOptions)
  }
}
