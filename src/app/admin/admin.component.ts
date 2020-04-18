import { AuthService } from './../services/admin/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  constructor(private cookieService: CookieService, private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    //check login or not
    if (!this.authService.IsLogin()) {
      this.route.navigate(['/login']);
    }
    //reload to load slider menu
    if (this.cookieService.get('loginFirst') == 'true') {
      this.cookieService.delete('loginFirst');
      location.reload();
    }
  }


}
