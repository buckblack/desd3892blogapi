import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { PostDetailRespone, PostDetailCommentRespone } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private ApiService: ApiService,private http:HttpClient) { }
  
  public getPostDetail(param):Observable<PostDetailRespone>{
    return this.http.get<PostDetailRespone>(this.ApiService.apiUrl.postDetail,{params:param});
  }

  public getPostDetailComment(param):Observable<PostDetailCommentRespone>{
    return this.http.get<PostDetailCommentRespone>(this.ApiService.apiUrl.postComment,{params:param});
  }
}
