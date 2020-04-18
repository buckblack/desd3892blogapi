import { userData } from './../post.service';
import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface NotifyDetailResponse{
  data:NotifyData;
  errorCode:number;
  message:string;
}

export interface NotifyData{
  Id:number,
  contentNotify:string;
  dateCreate:Date;
  user:userData;
  errorCode:number;
  message:string;
}

export interface NotifyResponse{
  errorCode:number;
  message:string;
  data:NotifyData[];
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http:HttpClient, private api:ApiService) { }

  public SubmitNotify(param):Observable<NotifyResponse>
  {
    return this.http.post<NotifyResponse>(this.api.apiUrl.adminNotify,param);
  }

  public GetNotifyNav():Observable<NotifyResponse>
  {
    return this.http.get<NotifyResponse>(this.api.apiUrl.adminGetNotifyNav);
  }

  public GetNotify():Observable<NotifyResponse>
  {
    return this.http.get<NotifyResponse>(this.api.apiUrl.adminGetNotify);
  }

  public GetNotifyDetail(notifyId):Observable<NotifyDetailResponse>
  {
    return this.http.get<NotifyDetailResponse>(this.api.apiUrl.adminGetNotifyDetail + '/' +notifyId);
  }

  public DeleteNotify(param):Observable<NotifyResponse>
  {
    return this.http.delete<NotifyResponse>(this.api.apiUrl.adminDeleteNotify+'/'+param);
  }
}
