import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthService } from './../../services/admin/auth.service';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { NotifyService, NotifyData } from 'src/app/services/admin/notify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  lstNotify: NotifyData[];
  notifyDetail: NotifyData = {} as NotifyData;
  password: string;
  newPW: string;
  confirmPW: string;
  @ViewChild('modalNotifyDetail') modalNotifyDetail: ModalDirective;
  @ViewChild('modalChangePassword') modalChangePassword: ModalDirective;
  constructor(private authService: AuthService, private toast: ToastrService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.notifyDetail.user = {} as any;
    this.LoadNotify();
  }

  ChangePassword() {
    //create parameters
    const param: FormData = new FormData();
    param.append("password", this.password);
    param.append("newPassword", this.newPW);
    param.append("confirmPassword", this.confirmPW);
    //call api and change password
    this.authService.ChangePassword(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.modalChangePassword.hide();
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message);
      }
    })
  }

  Logout() {
    this.authService.Logout();
  }

  LoadNotify() {
    this.notifyService.GetNotifyNav().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstNotify = result.data;
      }
      else {
        console.log(result.message);
      }
    });
  }

  showDetailNotify(notifyId) {
    this.notifyService.GetNotifyDetail(notifyId).subscribe(result => {
      if (result.errorCode === 0) {
        this.notifyDetail = result.data;
        this.modalNotifyDetail.show();
      }
      else {
        this.toast.error(result.message);
      }
    });
  }

}
