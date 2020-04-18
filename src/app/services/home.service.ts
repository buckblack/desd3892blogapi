import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { PostData } from './post.service';

export interface HomePostsHotResponse{
  errorCode:number;
  message:string;
  data:PostData[];
}

export interface HomePostsRecentResponse{
  errorCode:number;
  message:string;
  data:PostData[];
  totalPage:number;
  currentPage:number;
  totalRecords:number;
}

export interface HomePostsRecentCommentResponse{
  errorCode:number;
  message:string;
  data:PostData[];
}

@Injectable({
  providedIn: 'root'
})


export class HomeService {

  constructor(private api:ApiService,private http:HttpClient) { }
  public getPostsHot():Observable<HomePostsHotResponse>{
    return this.http.get<HomePostsHotResponse>(this.api.apiUrl.postHot);
  }

  public getPostsRecent(param):Observable<HomePostsRecentResponse>{
    return this.http.get<HomePostsRecentResponse>(this.api.apiUrl.postRecent,{params:param});
  }

  public getPostsRecentComment():Observable<HomePostsRecentCommentResponse>{
    return this.http.get<HomePostsRecentCommentResponse>(this.api.apiUrl.postRecentComment);
  }
}
