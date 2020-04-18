import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginRequest{
  email:string;
  password:string;
}

export interface LoginResponse{
  token:string;
  errorCode:number;
  pathAvatar:string;
  fullName:string;
  role:string;
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public timeCookie:number=(0.5/24);//30 min
  constructor(private api:ApiService,private http:HttpClient,private cookieService:CookieService,private route:Router) { }

  public login(param):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.api.apiUrl.authLogin,param);
  }

  public ChangePassword(param):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.api.apiUrl.authChangePW,param);
  }

  public ResetPassword(param):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.api.apiUrl.authResetPW,param);
  }

  public IsLogin():boolean
  {
    if(this.cookieService.get("token") == undefined || this.cookieService.get("token")=='')
    {
      return false;
    }
    return true;
  }

  public Logout()
  {
    this.cookieService.deleteAll();
    this.route.navigate(['/login']);
  }

}
