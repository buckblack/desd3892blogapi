import { FormControl } from '@angular/forms';
import { userData, RoleData } from './../../services/admin/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/admin/user.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  lstUser: userData[];
  lstRole: RoleData[];
  userInfoId: string;
  userInfoRoleId: string;
  userInfoFullName: string;
  userInfoPhoneNumber: string;
  userInfoEmail: string;
  userInfoPassword: string;
  userInfoAddress: string;
  userInfoDescription: string;
  userStatus: number;
  userCheck: boolean = false;//true is new
  newOrUpdate: boolean;// true is new
  imgAvatar: string = null;
  imgTmp: string = null;//hold value file
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('modalConfirm') modalConfirm: ModalDirective;
  @ViewChild('modalConfirmStatus') modalConfirmStatus: ModalDirective;
  userFullName: FormControl;
  constructor(private title: Title, private userService: UserService, private toast: ToastrService, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title.setTitle("User | Admin | Mini Blog");
    this.loadAllUser();
    this.loadRole();
  }

  loadAllUser() {
    this.userService.getAllUser().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstUser = result.data;
        //add datatable
        this.chRef.detectChanges();
        $('#tableUser').DataTable();
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadRole() {
    this.userService.getAllRole().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstRole = result.data;
      }
      else {
        console.log(result.message);
      }
    })
  }

  showUpdate(userId) {
    const userInfo: userData = this.lstUser.find(x => x['id'] == userId);
    this.userInfoId = userInfo['id'];
    this.userInfoRoleId = userInfo.roleId;
    this.userInfoFullName = userInfo.fullName;
    this.userInfoPhoneNumber = userInfo.phoneNumber;
    this.userInfoEmail = userInfo.email;
    this.userInfoPassword = userInfo.password;
    this.userInfoAddress = userInfo.address;
    this.userInfoDescription = userInfo.description;
    document.querySelector('#userInfo').scrollIntoView();
  }

  reset() {
    this.userInfoId = ''
    this.userInfoRoleId = '';
    this.userInfoFullName = '';
    this.userInfoPhoneNumber = '';
    this.userInfoEmail = '';
    this.userInfoPassword = '';
    this.userInfoAddress = '';
    this.userInfoDescription = '';
  }

  handleUpload(event) {
    this.imgAvatar = event.target.files[0];
    this.fileUpload.nativeElement.innerHTML = event.target.files[0].name
  }

  checkUpdate() {
    this.userCheck = true;
  }

  submitChange() {
    //create parameters
    const param: FormData = new FormData()
    param.append("userId", this.userInfoId)
    param.append("userRoleId", this.userInfoRoleId)
    param.append("userFullName", this.userInfoFullName)
    param.append("userPhone", this.userInfoPhoneNumber)
    param.append("userEmail", this.userInfoEmail)
    param.append("userPassword", this.userInfoPassword)
    param.append("userAddress", this.userInfoAddress)
    param.append("userDescription", this.userInfoDescription)
    param.append("userPathAvatar", this.imgAvatar)
    if (this.newOrUpdate) {
      //create new
      this.userService.AddNewUser(param).subscribe(result => {
        if (result.errorCode === 0) {
          //reset datatable
          this.chRef.detectChanges();
          $('#tableUser').DataTable().destroy();
          //load data
          this.loadAllUser();
          this.reset();
          this.toast.success(result.message);
          this.modalConfirm.hide();
        }
        else {
          this.toast.error(result.message);
        }
      })
    }
    else {
      //update
      this.userService.UpdateUser(param).subscribe(result => {
        if (result.errorCode === 0) {
          //reset datatable
          this.chRef.detectChanges();
          $('#tableUser').DataTable().destroy();
          //load data
          this.loadAllUser();
          this.reset();
          this.toast.success(result.message);
          this.modalConfirm.hide();
        }
        else {
          this.toast.error(result.message);
        }
      })
    }
  }

  updateSatusUser() {
    //create parameters
    const param: FormData = new FormData()
    param.append("userId", this.userInfoId)
    param.append("userRoleId", this.userInfoRoleId)
    param.append("status", this.userStatus.toString())
    //call api update user
    this.userService.UpdateStatusUser(param).subscribe(result => {
      if (result.errorCode === 0) {
        //reset datatable
        this.chRef.detectChanges();
        $('#tableUser').DataTable().destroy();
        //load data
        this.loadAllUser();
        this.reset();
        this.toast.success(result.message);
        this.modalConfirmStatus.hide();
      }
      else {
        this.toast.error(result.message);
      }
    })
  }

}
