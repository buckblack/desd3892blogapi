import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/admin/auth.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  email: string;
  checked: boolean;//true is cheched
  @ViewChild('modalLoading') modalLoading: ModalDirective;
  constructor(private title: Title, private authService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.title.setTitle("Reset password");
  }

  SubmitResetPassword() {
    this.modalLoading.show();
    //create parameters
    const param: FormData = new FormData();
    param.append("email", this.email);
    //submit reset password
    this.authService.ResetPassword(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.modalLoading.hide();
        this.toast.success(result.message)
      }
      else {
        this.modalLoading.hide();
        this.toast.error(result.message);
      }
    })

  }

}
