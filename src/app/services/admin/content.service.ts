import { PostsRespone, CommentData, PostDetailRespone } from './../post.service';
import { SubCategoryResponse } from './../subcategory.service';
import { Observable } from 'rxjs';
import { CategoriesResponse } from './../category.service';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubCategoryDataResponse } from '../subcategory.service';

export interface CommentResponse{
  errorCode:number;
  message:string;
  data:CommentData[]
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private api: ApiService, private http:HttpClient) { }

  //***********************************//
  //start category content
  public getCategorySort():Observable<CategoriesResponse>
  {
    return this.http.get<CategoriesResponse>(this.api.apiUrl.contentCategorySort);
  }

  public getSubcategorySort(cateId):Observable<SubCategoryDataResponse>{
    return this.http.get<SubCategoryDataResponse>(this.api.apiUrl.contentSubCategorySort+'/'+cateId);
  }

  public getTableCategory():Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(this.api.apiUrl.contentTableSubCategory+'/'+null);
  }

  public getTableSubCategory(cateId):Observable<SubCategoryDataResponse>{
    return this.http.get<SubCategoryDataResponse>(this.api.apiUrl.contentTableSubCategory+'/'+cateId);
  }

  public createCategory(param):Observable<CategoriesResponse>{
    return this.http.post<CategoriesResponse>(this.api.apiUrl.contentCreateCategory,param);
  }

  public updateCategory(param):Observable<CategoriesResponse>{
    return this.http.post<CategoriesResponse>(this.api.apiUrl.contentUpdateCategory,param);
  }

  public deleteCategory(cateId):Observable<CategoriesResponse>{
    return this.http.delete<CategoriesResponse>(this.api.apiUrl.contentdeleteCategory+'/'+cateId);
  }

  public createSubCategory(param):Observable<SubCategoryResponse>{
    return this.http.post<SubCategoryResponse>(this.api.apiUrl.contentCreateSubCategory,param);
  }

  public updateSubCategory(param):Observable<SubCategoryResponse>{
    return this.http.post<SubCategoryResponse>(this.api.apiUrl.contentUpdateSubCategory,param);
  }

  public deleteSubCategory(subCateId):Observable<SubCategoryResponse>{
    return this.http.delete<SubCategoryResponse>(this.api.apiUrl.contentdeleteSubCategory+'/'+subCateId);
  }

  //end category content
  //*******************************//

  //***************************************//
  //start comment content
  public searchPostsComment(param):Observable<PostsRespone>{
    return this.http.post<PostsRespone>(this.api.apiUrl.contentSearchPostComment,param);
  }

  public getComments(param):Observable<CommentResponse>{
    return this.http.post<CommentResponse>(this.api.apiUrl.contentGetComments,param);
  }

  public submitRemoveComment(param):Observable<CommentResponse>{
    return this.http.post<CommentResponse>(this.api.apiUrl.contentRemoveComments,param);
  }

  //end comment content
  //*******************************//

  //***************************************//
  //start post content
  public getAllCategoryForPost():Observable<CategoriesResponse>
  {
    return this.http.get<CategoriesResponse>(this.api.apiUrl.contentPostGetCategory);
  }

  public getSubcategoryForPost(cateId):Observable<SubCategoryDataResponse>{
    return this.http.get<SubCategoryDataResponse>(this.api.apiUrl.contentPostGetSubCategory+'/'+cateId);
  }

  public getPostBySubCateId(cateId):Observable<PostsRespone>{
    return this.http.get<PostsRespone>(this.api.apiUrl.contentPostGetBySubCateId+'/'+cateId);
  }

  public addNewPost(param):Observable<PostsRespone>{
    return this.http.post<PostsRespone>(this.api.apiUrl.contentAddNewPost,param);
  }

  public addImageMoreUpdate(param):Observable<PostDetailRespone>{
    return this.http.post<PostDetailRespone>(this.api.apiUrl.contentAddImgMoreUpdate,param);
  }

  public searchPostById(param):Observable<PostsRespone>{
    return this.http.post<PostsRespone>(this.api.apiUrl.contentPostSearch,param);
  }

  public getPostDetailUpdate(param):Observable<PostDetailRespone>{
    return this.http.post<PostDetailRespone>(this.api.apiUrl.contentPostDetail,param);
  }

  public UpdatePost(param):Observable<PostsRespone>{
    return this.http.post<PostsRespone>(this.api.apiUrl.contentUpdatePost,param);
  }

  public UpdateStatusPost(param):Observable<PostsRespone>{
    return this.http.post<PostsRespone>(this.api.apiUrl.contentUpdateStatusPost,param);
  }

  public RemoveTrashImageContent(param):Observable<PostsRespone>{
    return this.http.get<PostsRespone>(this.api.apiUrl.contentRemoveTrashImagePost+'/'+param);
  }
    //end post content
  //*******************************//
}
