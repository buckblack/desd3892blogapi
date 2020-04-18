import { guestData, UserService } from './../../services/admin/user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {

  lstGuest: guestData[];
  constructor(private title: Title, private userService: UserService, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title.setTitle("Guest | Admin | Mini Blog");
    this.userService.getAllGuest().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstGuest = result.data;
        //add to datatable
        this.chRef.detectChanges();
        $('#tableUser').DataTable();
      }
      else {
        console.log(result.message);
      }
    })
  }

}
