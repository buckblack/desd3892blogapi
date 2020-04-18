import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { PostData } from './post.service';

export interface SubCategoryResponse{
  errorCode: number;
  message: string;
  data: PostData[];
  totalPage:number;
  currentPage:number;
  totalRecords:number;
  subCateName:string;
  cateName:string;
}

export interface SubCategoryData{
  Id: number;
  subCateName: string;
  pathThumbnail:string;
  countPost:number;
}

export interface SubCategoryDataResponse{
  errorCode: number;
  message: string;
  data: SubCategoryData[];
}

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private ApiService: ApiService,private http:HttpClient) { }
  
  public getAllPostBySubCateId(param):Observable<SubCategoryResponse>{
    return this.http.get<SubCategoryResponse>(this.ApiService.apiUrl.subcategory,{params:param});
  }

  public getAllSubCategory():Observable<SubCategoryDataResponse>{
    return this.http.get<SubCategoryDataResponse>(this.ApiService.apiUrl.getallsubcategory);
  }

}
