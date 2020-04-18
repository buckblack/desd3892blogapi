import { PostData, PostDataUpdate } from './../../services/post.service';
import { SubCategoryData } from './../../services/subcategory.service';
import { CategoryData } from './../../services/category.service';
import { ContentService } from './../../services/admin/content.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  categoryData: CategoryData = {} as CategoryData;
  subCategoryData: SubCategoryData = {} as SubCategoryData;
  lstCategory: CategoryData[] = [] as CategoryData[];
  lstSubCategory: SubCategoryData[] = [] as SubCategoryData[];
  lstSubCategoryUd: SubCategoryData[] = [] as SubCategoryData[];
  lstPost: PostData[];
  postNew: PostData = {} as PostData;
  postUpdate: PostData = {} as PostData;
  searchId: string;
  sl_category: string;
  sl_categoryUd: string;
  sl_subCategory: string;
  sl_subCategoryUd: string;
  checkValid: boolean;//true is checked
  newOrUpdate: boolean;//true is new
  disOrEnable: boolean;//disable is true
  addImageMore: string;
  @ViewChild('fileNameNew') fileNameNew: ElementRef;
  @ViewChild('fileNameUpdate') fileNameUpdate: ElementRef;
  @ViewChild('modalNew') modalNew: ModalDirective;
  @ViewChild('modalUpdate') modalUpdate: ModalDirective;
  @ViewChild('modalConfirm') modalConfirm: ModalDirective;
  @ViewChild('modalConfirmStatus') modalConfirmStatus: ModalDirective;
  @ViewChild('modalLoading') modalLoading: ModalDirective;
  @ViewChild('modalConfirmTrashImage') modalConfirmTrashImage: ModalDirective;
  constructor(private title: Title, private toast: ToastrService, private contentService: ContentService, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.title.setTitle("Post | Content | Admin | Mini Blog");
    this.loadCategory();
  }

  loadCategory() {
    this.contentService.getAllCategoryForPost().subscribe(result => {
      if (result.errorCode === 0) {
        if (result.data.length > 0) {
          this.lstCategory = result.data;
          this.sl_category = result.data[0]['id'];
          this.categoryData = result.data[0];
          this.loadSubcategory();
        }
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadSubcategory() {
    this.contentService.getSubcategoryForPost(this.sl_category).subscribe(result => {
      if (result.errorCode === 0) {
        if (result.data.length > 0) {
          this.lstSubCategory = result.data;
          this.sl_subCategory = result.data[0]['id'];
          this.subCategoryData = result.data[0];
          this.loadPost();
        }
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadPost() {
    //if list post is not null, datatable will be reset
    if (this.lstPost != undefined && this.lstPost.length > 0) {
      this.chRef.detectChanges();
      $('#tablePost').DataTable().destroy();
    }
    //call api load data
    this.contentService.getPostBySubCateId(this.sl_subCategory).subscribe(result => {
      if (result.errorCode === 0) {
        if (result.data.length > 0) {
          this.lstPost = result.data;
          this.chRef.detectChanges();
          $('#tablePost').DataTable();
        }
      }
      else {
        console.log(result.message);
      }
    });
  }

  handleUploadNew(event) {
    this.postNew.pathThumbnail = event.target.files[0];
    this.fileNameNew.nativeElement.innerHTML = event.target.files[0].name
  }


  sortById() {
    //check empty
    if (this.searchId.trim() != '') {
      this.modalLoading.show();
      //create parameters
      const param: FormData = new FormData();
      param.append("postId", this.searchId);
      //if list post is not null, datatable will be reset
      if (this.lstPost != undefined && this.lstPost.length > 0) {
        this.chRef.detectChanges();
        $('#tablePost').DataTable().destroy();
      }
      //callp api load data
      this.contentService.searchPostById(param).subscribe(result => {
        if (result.errorCode === 0) {
          if (result.data.length > 0) {
            this.lstPost = result.data;
          }
          else {
            this.toast.warning(result.message);
          }
          //add to datatable
          this.chRef.detectChanges();
          $('#tablePost').DataTable();
        }
        else {
          this.toast.error(result.message);
        }
        this.modalLoading.hide();
      });
    }
    else {
      this.toast.warning("Please enter post id");
    }
  }

  showNew() {
    this.newOrUpdate = true;
    this.categoryData = this.lstCategory.find(x => x['id'] == this.sl_category)
    this.subCategoryData = this.lstSubCategory.find(x => x['id'] == this.sl_subCategory)
    this.modalNew.show();
  }

  submitNew() {
    this.modalConfirm.hide();
    //create parameters
    const param: FormData = new FormData();
    param.append("subCateId", this.sl_subCategory);
    param.append("postTitle", this.postNew.postTitle);
    param.append("summaryContent", this.postNew.summaryContent);
    param.append("detailContent", this.postNew.detailContent);
    param.append("pathThumbnail", this.postNew.pathThumbnail);
    //call api add post
    this.contentService.addNewPost(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.loadPost();
        this.postNew = {} as PostData;
        this.modalNew.hide();
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message);
      }
    });
  }
  handleUploadUpdate(event) {
    this.postUpdate.pathThumbnail = event.target.files[0];
    this.fileNameUpdate.nativeElement.innerHTML = event.target.files[0].name
  }

  handleUploadMoreImageUpdate(event) {
    this.addImageMore = event.target.files[0];
    //create parameters
    const param: FormData = new FormData();
    param.append("postId", this.postUpdate['id']);
    param.append("pathThumbnailMore", this.addImageMore);
    param.append("summaryContent", this.postUpdate.summaryContent);
    //call api add image to content post
    this.contentService.addImageMoreUpdate(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.postUpdate.detailContent = result.data.detailContent;
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message);
      }
    })
  }

  loadSubCateGoryUpdate() {
    this.contentService.getSubcategoryForPost(this.sl_categoryUd).subscribe(result => {
      if (result.errorCode === 0) {
        if (result.data.length > 0) {
          this.lstSubCategoryUd = result.data;
          this.sl_subCategoryUd = result.data[0]['id'];
        }
      }
      else {
        console.log(result.message);
      }
    })
  }

  updatePost(postId) {
    this.modalLoading.show();
    this.newOrUpdate = false;
    //call new api if click view detail other post
    if (postId != this.postUpdate['id']) {
      this.lstSubCategoryUd = this.lstSubCategory;
      //create parameters
      const param: FormData = new FormData();
      param.append("postId", postId);
      //call api and get detail post
      this.contentService.getPostDetailUpdate(param).subscribe(result => {
        if (result.errorCode === 0) {
          this.postUpdate = result.data;
          this.sl_categoryUd = result.category['id'];
          this.sl_subCategoryUd = result.data.subCategories['id'];
          this.postUpdate.pathThumbnail = '';
          this.fileNameUpdate.nativeElement.innerHTML = "Choose file"
          this.modalLoading.hide();
          this.modalUpdate.show();
        }
        else {
          this.toast.error(result.message);
        }
      })
    }
    else {
      this.modalLoading.hide();
      this.modalUpdate.show();
    }
  }

  submitUpdate() {
    this.modalConfirm.hide();
    //create parameters
    const param: FormData = new FormData();
    param.append("postId", this.postUpdate['id']);
    param.append("subCateId", this.sl_subCategoryUd);
    param.append("postTitle", this.postUpdate.postTitle);
    param.append("summaryContent", this.postUpdate.summaryContent);
    param.append("detailContent", this.postUpdate.detailContent);
    param.append("pathThumbnail", this.postUpdate.pathThumbnail);
    //call api and update post
    this.contentService.UpdatePost(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.loadPost();
        this.postNew = {} as PostData;
        this.modalUpdate.hide();
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message);
      }
    });
  }

  disablePost(postId) {
    this.postNew.Id = postId
    this.disOrEnable = true;
    this.modalConfirmStatus.show();
  }

  enablePost(postId) {
    this.postNew.Id = postId
    this.disOrEnable = false;
    this.modalConfirmStatus.show();
  }

  submitStatus() {
    let status = 0;
    if (this.disOrEnable) {
      status = 1;
    }
    //create parameters
    const param: FormData = new FormData();
    param.append("postId", this.postNew.Id);
    param.append("status", status.toString());
    //call api and update status post
    this.contentService.UpdateStatusPost(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.loadPost();
        this.postNew = {} as PostData;
        this.modalConfirmStatus.hide();
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message);
      }
    });
  }

  RemoveTrashImage(postId) {
    this.postNew.Id = postId;
    this.modalConfirmTrashImage.show();
  }

  SubmitRemoveTrahImage() {
    this.modalLoading.show();
    this.contentService.RemoveTrashImageContent(this.postNew.Id).subscribe(result => {
      if (result.errorCode === 0) {
        this.modalConfirmTrashImage.hide();
        this.toast.success(result.message);
      }
      else {
        this.toast.error(result.message);
      }
      this.modalLoading.hide();
    });
  }

}
