import { ToastrService } from 'ngx-toastr';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html'
})
export class SubscribeComponent implements OnInit {

  email:string;
  constructor(private postService:PostService, private toast:ToastrService) { }

  ngOnInit(): void {
  }

  addSubscriber()
  {
    const param:FormData=new FormData();
    param.append("guestEmail",this.email);
    this.postService.submitSubscriber(param).subscribe(result=>{
      if(result.errorCode===0)
      {
        this.toast.success(result.message);
      }
      else{
        this.toast.error(result.message);
      }
    })
  }

}
