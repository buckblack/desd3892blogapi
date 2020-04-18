import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {

  userName: string;
  roleName: string;
  pathAvatar: string;
  @ViewChild('dashboard') dashboard: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('statistical') statistical: ElementRef;
  @ViewChild('notify') notify: ElementRef;
  @ViewChild('users') users: ElementRef;
  arrElement: ElementRef[] = [] as ElementRef[];
  addClass: boolean;
  adminCheck: boolean = false;//true is admin
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.pathAvatar = this.cookieService.get('pathAvatar');
    this.userName = this.cookieService.get('fullName');
    this.roleName = this.cookieService.get('role');
    if (this.roleName == 'Admin') {
      this.adminCheck = true;
    }
  }

  //add active link slider menu
  activeLink(key) {
    if (key === 'content') {
      this.content.nativeElement.classList.add('active');
      this.statistical.nativeElement.classList.remove('active');
      this.notify.nativeElement.classList.remove('active');
      this.users.nativeElement.classList.remove('active');
      this.dashboard.nativeElement.classList.remove('active');
    }
    else if (key === 'statistical') {
      this.statistical.nativeElement.classList.add('active');
      this.content.nativeElement.classList.remove('active');
      this.notify.nativeElement.classList.remove('active');
      this.users.nativeElement.classList.remove('active');
      this.dashboard.nativeElement.classList.remove('active');
    }
    else if (key === 'notify') {
      this.notify.nativeElement.classList.add('active');
      this.content.nativeElement.classList.remove('active');
      this.statistical.nativeElement.classList.remove('active');
      this.users.nativeElement.classList.remove('active');
      this.dashboard.nativeElement.classList.remove('active');
    }
    else if (key === 'users') {
      this.users.nativeElement.classList.add('active');
      this.content.nativeElement.classList.remove('active');
      this.statistical.nativeElement.classList.remove('active');
      this.notify.nativeElement.classList.remove('active');
      this.dashboard.nativeElement.classList.remove('active');
    }
    else {
      this.dashboard.nativeElement.classList.add('active');
      this.content.nativeElement.classList.remove('active');
      this.statistical.nativeElement.classList.remove('active');
      this.notify.nativeElement.classList.remove('active');
      this.users.nativeElement.classList.remove('active');
    }
  }

}
