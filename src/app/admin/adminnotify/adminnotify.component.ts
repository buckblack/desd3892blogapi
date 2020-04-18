import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifyService } from 'src/app/services/admin/notify.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adminnotify',
  templateUrl: './adminnotify.component.html'
})
export class AdminnotifyComponent implements OnInit {

  checked: boolean;//true is check
  content: string;
  title: string;
  @ViewChild("modalConfirm") modalConfirm: ModalDirective;
  constructor(private titleBrownser: Title, private notifyService: NotifyService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.titleBrownser.setTitle("Notify | Admin | Minin Blog");
  }

  SubmitNotify() {
    //create parameters
    const param: FormData = new FormData();
    param.append("content", this.content);
    param.append("title", this.title);
    //call api and create notify
    this.notifyService.SubmitNotify(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.content = '';
        this.title = '';
        this.toast.success(result.message);
        this.modalConfirm.hide();
      }
      else {
        this.toast.error(result.message);
      }
    });
  }

}
