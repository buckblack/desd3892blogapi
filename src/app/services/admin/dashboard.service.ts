import { SubCategoryDataResponse } from './../subcategory.service';
import { PostData, CommentData } from './../post.service';
import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DashboardResponse{
  countPost:string;
  countCategory:string;
  countGuest:string;
  countMember:string;
  lstPostNew:PostData[];
  lstPostHot:PostData[];
  lstCommentNew:CommentData[];
  message:string;
  errorCode:number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private apiService:ApiService) { }

  public LoadDashboard():Observable<DashboardResponse>{
    return this.http.get<DashboardResponse>(this.apiService.apiUrl.dashBoard);
  }

  public LoadDashboardChart():Observable<SubCategoryDataResponse>{
    return this.http.get<SubCategoryDataResponse>(this.apiService.apiUrl.dashBoardChart);
  }

}
