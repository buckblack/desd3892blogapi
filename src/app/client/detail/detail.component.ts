import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SubcategoryService, SubCategoryData } from './../../services/subcategory.service';
import { CommentData, PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './../../services/detail.service';
import { Component, OnInit, Input } from '@angular/core';
import { PostData, userData } from 'src/app/services/post.service';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input()
  pageComment: number = 1;
  ngStyle: { [klass: string]: any; }
  postDetail: PostData = {} as PostData;
  lstPostPopular: PostData[];
  lstPostRelated: PostData[];
  lstSubCategory: SubCategoryData[];
  lstComment: CommentData[] = [] as CommentData[];
  userAvatarPath: string = '';
  currentPage: number = 1;
  totalPage: number;
  formComment: FormGroup;
  message: string;
  submitted: boolean = false;
  constructor(private title: Title,
    private detailService: DetailService,
    private subCategoryService: SubcategoryService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.postDetail.user = {} as userData;
    this.loadDetail();
    this.loadComment();
    this.loadPostPopular();
    this.loadSubCategory();
    this.loadPostRelated(this.currentPage);
    this.formComment = new FormGroup({
      postId: new FormControl(''),
      guestName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      guestEmail: new FormControl('', [Validators.required, Validators.email]),
      contentComment: new FormControl('', [Validators.required, Validators.minLength(50)]),
    });
  }

  loadDetail() {
    //create parameters
    let param = new HttpParams();
    param = param.append('postId', this.route.snapshot.paramMap.get('postid'));
    //call api and load data
    this.detailService.getPostDetail(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.title.setTitle("Detail | Mini Blo | " + result.data.postTitle);
        this.postDetail = result.data;
        this.userAvatarPath = result.userPathImg;
        document.getElementById("detail").style.backgroundImage = "url('" + result.data.pathThumbnail + "')";
      }
      else {
        console.log(result.message);
      }
    });
  }

  loadPostPopular() {
    this.postService.getPostsHot().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPostPopular = result.data;
      }
      else {
        console.log(result.message)
      }
    })
  }

  loadSubCategory() {
    this.subCategoryService.getAllSubCategory().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstSubCategory = result.data;
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadComment() {
    //create parameters
    let param = new HttpParams();
    param = param.append('postId', this.route.snapshot.paramMap.get('postid'));
    //call api and load data
    this.detailService.getPostDetailComment(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstComment = result.data;
      }
      else {
        console.log(result.message);
      }
    });
  }

  loadPostRelated(page) {
    //create parameters
    let param = new HttpParams();
    param = param.append('postId', this.route.snapshot.paramMap.get('postid'));
    param = param.append('page', page);
    //all api and load data
    this.postService.getPostsRelated(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPostRelated = result.data;
        this.totalPage = result.totalPage;
        this.currentPage = result.currentPage;
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadNewPagePostRelated(newPage) {
    if (typeof (newPage) === typeof (1)) {
      //load data
      this.loadPostRelated(newPage);
      //scroll to href
      let x = document.querySelector("#detailpopular");
      if (x) {
        x.scrollIntoView();
      }
    }
  }

  //scroll to id #detail
  scrollTop() {
    let x = document.querySelector("#detail");
    if (x) {
      x.scrollIntoView();
    }
  }

  submitComment() {
    this.submitted = true;
    // set value form
    this.formComment.patchValue({ postId: this.postDetail['id'] });
    //call api and load data
    if (this.formComment.invalid === FormControl.prototype.valid) {
      this.submitted = false;
      this.postService.submitComment(this.formComment.value).subscribe(result => {
        if (result.errorCode === 0) {
          this.loadComment();
          //reset form
          this.formComment.reset();
          this.message = result.message;
          //scroll to href
          document.querySelector("#comment").scrollIntoView();
          this.toast.success(result.message);
        }
        else {
          this.message = result.message;
        }
      })

    }

  }

}
