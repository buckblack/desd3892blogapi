import { CommentData } from './../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from './../../services/admin/content.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PostData } from 'src/app/services/post.service';
import { ModalDirective } from 'ngx-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admincomment',
  templateUrl: './admincomment.component.html',
  styleUrls: ['./admincomment.component.css']
})
export class AdmincommentComponent implements OnInit {
  key: string;
  lstPostsComment: PostData[];
  lstComments: CommentData[];
  keyId: string;
  commentId: string;
  guestName: string;
  @ViewChild('modalConfirmRemove') modalConfirmRemove: ModalDirective
  constructor(private title: Title, private contentService: ContentService, private toast: ToastrService, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title.setTitle("Comment | Content | Admin | Mini Blog");
  }

  search() {
    //check key null
    if (this.key == undefined || this.key.trim() == '') {
      this.toast.warning("Please enter key word");
      return;
    }
    //create parameters
    const param: FormData = new FormData();
    param.append("key", this.key);
    //call api and load data
    this.contentService.searchPostsComment(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPostsComment = result.data;
        //add to datatable
        this.chRef.detectChanges();
        $('#tablePost').DataTable();
      }
      else {
        this.toast.error(result.message, "Error")
      }
    })
  }

  showComment(postId) {
    this.keyId = postId;
    //create parameters
    const param: FormData = new FormData();
    param.append("postId", postId);
    //call api and load data
    this.contentService.getComments(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstComments = result.data;
        //add to datatable
        this.chRef.detectChanges();
        $('#tableComment').DataTable();
        //scroll to href
        document.querySelector("#comment").scrollIntoView();
      }
      else {
        this.toast.error(result.message, "Error")
      }
    })
  }

  removeCommentConfirm(commentId, guestName) {
    this.commentId = commentId;
    this.guestName = guestName;
    this.modalConfirmRemove.show();
  }

  submitRemoveComment() {
    //create parameters
    const param: FormData = new FormData();
    param.append("commentId", this.commentId);
    //call api and remove comment
    this.contentService.submitRemoveComment(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.showComment(this.keyId);
        this.modalConfirmRemove.hide();
        this.toast.success(result.message)
        //reset datatable
        this.chRef.detectChanges();
        $('#tableComment').DataTable().destroy();
      }
      else {
        this.toast.error(result.message, "Error")
      }
    })
  }

}
