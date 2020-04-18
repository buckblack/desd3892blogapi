import { ModalDirective } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NotifyService, NotifyData } from 'src/app/services/admin/notify.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adminmessage',
  templateUrl: './adminmessage.component.html'
})
export class AdminmessageComponent implements OnInit {

  lstNotify: NotifyData[];
  notifyDetail: NotifyData = {} as NotifyData;
  content: string;
  adminCheck: boolean = false;
  @ViewChild('modalConfirm') modalConfirm: ModalDirective;
  constructor(private title: Title, private notifyService: NotifyService, private toast: ToastrService, private cookieService: CookieService, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title.setTitle("Message | Admin | Mini Blog");
    this.LoadNotify();
    if (this.cookieService.get('role') == 'Admin') {
      this.adminCheck = true;
    }
  }

  LoadNotify() {
    this.notifyService.GetNotify().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstNotify = result.data;
        //add to datatable
        this.chRef.detectChanges();
        $('#tableNotify').DataTable();
      }
    })
  }

  ConfirmDelete(notifyId) {
    this.notifyDetail['id'] = parseInt(notifyId);
    this.modalConfirm.show();
  }

  SubmitDelete() {
    this.notifyService.DeleteNotify(this.notifyDetail['id']).subscribe(result => {
      if (result.errorCode === 0) {
        this.modalConfirm.hide();
        //reset datatabel
        this.chRef.detectChanges();
        $('#tableNotify').DataTable().destroy();
        this.LoadNotify();
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message)
      }
    })
  }

}
