import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { PostData } from './post.service';

export interface CategoryData {
  Id: string;
  cateName: string;
  subCategories: SubCategoryData[];
}

export interface CategoryDataOnly {
  Id: string;
  cateName: string;
}

export interface SubCategoryData {
  Id: string;
  subCateName: string;
}

export interface CategoriesResponse {
  errorCode: number;
  message: string;
  data: CategoryData[];
}

export interface CategoryPostResponse {
  errorCode: number;
  message: string;
  data: PostData[];
  totalPage:number;
  currentPage:number;
  totalRecords:number;
}

export interface CategorySubResponse {
  errorCode: number;
  message: string;
  data: SubCategoryData[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAll(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.api.apiUrl.category)
  }

  public getAllSubcategory(param): Observable<CategoryPostResponse> {
    return this.http.get<CategoryPostResponse>(this.api.apiUrl.categorySub,{params:param})
  }
  public getAllPosts(param):Observable<CategoryPostResponse>{
    return this.http.get<CategoryPostResponse>(this.api.apiUrl.categoryPost,{params:param})
  }
}
