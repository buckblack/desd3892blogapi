import { CategoryDataOnly } from './category.service';
import { SubCategoryData } from 'src/app/services/category.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

export interface userData {
  Id: string;
  fullName: string;
  pathAvatar: string;
  description: string;
}

export interface guestData {
  Id: string;
  email: string;
  fullName: string;
}

export interface PostData {
  Id: string;
  postTitle: string;
  summaryContent: string;
  detailContent: string;
  dateCreate: Date;
  pathThumbnail: string;
  status: number;
  subCategoriesId: number;
  userId: number;
  fullName: string;
  subCateName: string;
  subCategories:SubCategoryData;
  user:userData;
  comments:CommentData[];
}

export interface PostDataUpdate {
  IdUd: string;
  postTitleUd: string;
  summaryContentUd: string;
  detailContentUd: string;
  pathThumbnailUd: string;
  statusUd: number;
  subCategoriesIdUd: number;
}

export interface CommentData {
  Id: string;
  contentComment: string;
  dateCreate: Date;
  guest:guestData;
}

export interface PostsRespone {
  errorCode: number;
  message: string;
  data: PostData[]
  totalPage:number;
  currentPage:number;
  totalRecords:number;
}

export interface PostDetailRespone {
  errorCode: number;
  message: string;
  data: PostData
  userPathImg: string;
  category:CategoryDataOnly;
}

export interface SubmitCommentRespone {
  errorCode: number;
  message: string;
}

export interface PostDetailCommentRespone {
  errorCode: number;
  message: string;
  data: CommentData[]
}

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private api: ApiService, private http: HttpClient) { }
  public getPostsHot(): Observable<PostsRespone> {
    return this.http.get<PostsRespone>(this.api.apiUrl.postHot);
  }

  public getPostsRelated(param): Observable<PostsRespone> {
    return this.http.get<PostsRespone>(this.api.apiUrl.postRelated,{params:param});
  }

  public getPostsSearch(param): Observable<PostsRespone> {
    return this.http.get<PostsRespone>(this.api.apiUrl.postSearch,{params:param});
  }

  public submitComment(data):Observable<SubmitCommentRespone>{
    return this.http.post<SubmitCommentRespone>(this.api.apiUrl.submitComment,data);
  }

  public submitSubscriber(data):Observable<SubmitCommentRespone>{
    return this.http.post<SubmitCommentRespone>(this.api.apiUrl.submitSubscriber,data);
  }
}
