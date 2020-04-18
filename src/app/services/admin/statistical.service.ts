import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface StatisticalComment{
  Id:number;
  postTitle:string;
  sumComment:number;
}

export interface StatisticalCommentResponse{
  errorCode:number;
  message:string;
  data:StatisticalComment[];
}

export interface StatisticalPost{
  Id:number;
  subCateName:string;
  pathThumbnail:string;
  categoryId:number;
  sumPost:number;
}

export interface StatisticalPostResponse{
  errorCode:number;
  message:string;
  data:StatisticalPost[];
}

export interface StatisticalUser{
  Id:number;
  pathAvatar:string;
  fullName:string;
  sumPost:number;
}

export interface StatisticalUserResponse{
  errorCode:number;
  message:string;
  data:StatisticalUser[];
}

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  constructor(private http:HttpClient, private api:ApiService) { }

  public LoadPostChartAllTime():Observable<StatisticalPostResponse>{
    return this.http.get<StatisticalPostResponse>(this.api.apiUrl.adminStatisticalPostAllTime);
  }

  public LoadPostChartByTime(param):Observable<StatisticalPostResponse>{
    return this.http.post<StatisticalPostResponse>(this.api.apiUrl.adminStatisticalPostByTime,param);
  }

  public LoadCommentChartAllTime():Observable<StatisticalCommentResponse>{
    return this.http.get<StatisticalCommentResponse>(this.api.apiUrl.adminStatisticalCommentAllTime);
  }

  public LoadCommentChartByTime(param):Observable<StatisticalCommentResponse>{
    return this.http.post<StatisticalCommentResponse>(this.api.apiUrl.adminStatisticalCommentByTime,param);
  }

  public LoadUserChartAllTime():Observable<StatisticalUserResponse>{
    return this.http.get<StatisticalUserResponse>(this.api.apiUrl.adminStatisticalUserAllTime);
  }

  public LoadUserChartByTime(param):Observable<StatisticalUserResponse>{
    return this.http.post<StatisticalUserResponse>(this.api.apiUrl.adminStatisticalUserByTime,param);
  }
}
