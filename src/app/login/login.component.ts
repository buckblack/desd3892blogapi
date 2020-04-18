import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, LoginRequest } from './../services/admin/auth.service';
import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginInfo: LoginRequest = {} as LoginRequest;
  @ViewChild('modalLoading') modalLoading: ModalDirective;
  constructor(private title: Title, private authService: AuthService,
    private toast: ToastrService, private cookieService: CookieService, private route: Router) { }

  ngOnInit(): void {
    this.title.setTitle("Login");
  }

  LoginSystem() {
    //check empty email
    if (this.loginInfo.email == undefined || this.loginInfo.email.trim() == '') {
      this.toast.warning("Email cannot empty");
      return;
    }
    //check empty password
    if (this.loginInfo.password == undefined || this.loginInfo.password.trim() == '') {
      this.toast.warning("Password cannot empty");
      return;
    }
    //create parameter
    const param: FormData = new FormData();
    param.append("email", this.loginInfo.email);
    param.append("password", this.loginInfo.password);
    //
    this.modalLoading.show();
    //submit login
    this.authService.login(param).subscribe(result => {
      if (result.errorCode === 0) {
        //delete old cookie
        this.cookieService.delete("token");
        this.cookieService.delete("role");
        this.cookieService.delete("fullName");
        this.cookieService.delete("pathAvatar");
        this.cookieService.delete("loginFirst");
        //set new cookie
        this.cookieService.set("loginFirst", 'true');
        this.cookieService.set("token", result.token, this.authService.timeCookie);
        this.cookieService.set("role", result.role, this.authService.timeCookie);
        this.cookieService.set("fullName", result.fullName, this.authService.timeCookie);
        this.cookieService.set("pathAvatar", result.pathAvatar, this.authService.timeCookie);
        this.modalLoading.hide();
        this.route.navigate(['/admin']);
      }
      else {
        this.toast.error(result.message);
        this.modalLoading.hide();
      }
    })
  }

}
