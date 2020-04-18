import { CommentData } from './../post.service';
import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface userData {
  Id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  pathAvatar: string;
  address: string;
  description: string;
  roleId:string;
  password:string;
  status:number;
  role:RoleData[]
}

export interface userResponse{
  errorCode:number;
  message:string;
  data:userData[];
}

export interface guestData {
  Id: string;
  email: string;
  fullName: string;
  comment:CommentData[]
}

export interface guestResponse{
  errorCode:number;
  message:string;
  data:guestData[];
}

export interface RoleData{
  Id:number;
  roleName:string;
  users:userData[];
}

export interface RoleResponse{
  errorCode:number;
  message:string;
  data:RoleData[];
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService,private http:HttpClient) { }

  public getAllRole():Observable<RoleResponse>
  {
    return this.http.get<RoleResponse>(this.api.apiUrl.roleGetAll)
  }

  public AddNewRole(param):Observable<RoleResponse>
  {
    return this.http.post<RoleResponse>(this.api.apiUrl.roleAddNew,param)
  }

  public EditRole(param):Observable<RoleResponse>
  {
    return this.http.post<RoleResponse>(this.api.apiUrl.roleEdit,param)
  }

  public RemoveRole(param):Observable<RoleResponse>
  {
    return this.http.delete<RoleResponse>(this.api.apiUrl.roleRemove+'/'+param)
  }

  public getAllGuest():Observable<guestResponse>
  {
    return this.http.get<guestResponse>(this.api.apiUrl.guestGetAll)
  }

  public getAllUser():Observable<userResponse>
  {
    return this.http.get<userResponse>(this.api.apiUrl.userGetAll)
  }

  public AddNewUser(param):Observable<userResponse>
  {
    return this.http.post<userResponse>(this.api.apiUrl.userAddNew,param)
  }

  public UpdateUser(param):Observable<userResponse>
  {
    return this.http.post<userResponse>(this.api.apiUrl.userUpdate,param)
  }

  public UpdateStatusUser(param):Observable<userResponse>
  {
    return this.http.post<userResponse>(this.api.apiUrl.userUpdateStatus,param)
  }
}
