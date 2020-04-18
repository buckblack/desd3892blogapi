import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubCategoryData } from './../../services/subcategory.service';
import { CategoryData } from 'src/app/services/category.service';
import { ContentService } from './../../services/admin/content.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html'
})
export class AdmincategoryComponent implements OnInit {

  slCategory: number = 0;
  slSubCategory: number = 0;
  slCategoryUpdate: number;
  lstCategoryOption: CategoryData[];
  lstSubCategoryOption: SubCategoryData[];
  lstTableCategory: CategoryData[];
  lstTableSubCategory: SubCategoryData[];
  lstCategoryOptionUpdate: CategoryData[];
  lstSubCategoryOptionUpdate: SubCategoryData[];
  tableCategory: boolean = true;
  cateOrSubCate: boolean;//true is modal category
  cateIdNewSubcate: string;
  cateNameNew: string;
  subCateNameNew: string;
  formNew: FormGroup;
  imgNew: string;
  imgUpdate: string;
  updateCategoryName: string;
  updateSubCategoryName: string;
  idRemove: string;
  nameRemove: string;
  categoryUpdate: CategoryData = {} as CategoryData;
  subCategoryUpdate: SubCategoryData = {} as SubCategoryData;
  @ViewChild('fileNameNew') fileNameNew: ElementRef;
  @ViewChild('fileNameUpdate') fileNameUpdate: ElementRef;
  @ViewChild('modalNew') modalNew: ModalDirective;
  @ViewChild('modalUpdate') modalUpdate: ModalDirective;
  @ViewChild('modalConfirmDelete') modalConfirmDelete: ModalDirective;
  constructor(private title: Title, private contentService: ContentService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.title.setTitle("Category | Content | Admin | Mini Blog");
    this.loadOptionCategorySort();
  }

  //start category
  public loadOptionCategorySort() {
    this.contentService.getCategorySort().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstCategoryOption = result.data;
        this.loadTableResult();
      }
      else {
        console.log(result.message);
      }
    })
  }

  public loadOptionSubCategorySort() {
    this.contentService.getSubcategorySort(this.slCategory).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstSubCategoryOption = result.data;
        if (this.lstSubCategoryOption.length > 0) {
          this.slSubCategory = this.lstSubCategoryOption[0]['id'];
        }
      }
      else {
        console.log(result.message);
      }
    })
  }

  public loadTableResult() {
    if (this.slCategory.toString() == '0') {
      //load table category
      this.tableCategory = true;
      this.contentService.getTableCategory().subscribe(result => {
        if (result.errorCode === 0) {
          this.lstTableCategory = result.data;
        }
        else {
          console.log(result.message);
        }
      })
    }
    else {
      //load table sub-category
      this.contentService.getTableSubCategory(this.slCategory).subscribe(result => {
        this.tableCategory = false;
        if (result.errorCode === 0) {
          this.lstTableSubCategory = result.data;
        }
        else {
          console.log(result.message);
        }
      })
    }
  }

  public changeSubcategory() {
    this.loadOptionSubCategorySort();
    this.loadTableResult();
  }

  public addNewCategory() {
    this.cateNameNew = '';
    this.cateOrSubCate = true;
    this.modalNew.show();
  }

  public addNewSubcategory() {
    //check category id
    if (this.slCategory.toString() == '0') {
      this.toast.info("Please select category", "Notify")
      return;
    }
    this.cateNameNew = this.lstCategoryOption.find(x => x['id'] == this.slCategory).cateName
    this.cateOrSubCate = false;
    this.modalNew.show();
  }

  handleUploadNew(event) {
    this.imgNew = event.target.files[0];
    this.fileNameNew.nativeElement.innerHTML = event.target.files[0].name
  }

  handleUploadUpdate(event) {
    this.imgUpdate = event.target.files[0];
    this.fileNameUpdate.nativeElement.innerHTML = event.target.files[0].name
  }


  public submitNew() {
    if (this.cateOrSubCate) {
      //create parameters
      const formData: FormData = new FormData();
      formData.append('cateName', this.cateNameNew);
      //call api and create category
      this.contentService.createCategory(formData).subscribe(result => {
        if (result.errorCode === 0) {
          this.loadOptionCategorySort();
          this.toast.success(result.message, "Create successful")
          this.modalNew.hide();
        }
        else {
          this.toast.error(result.message, "Create Fail")
        }
      })

    }
    else {
      //create parameters
      const formData: FormData = new FormData();
      formData.append('cateId', this.slCategory.toString());
      formData.append('subCateName', this.subCateNameNew);
      formData.append('thumbnailSubCate', this.imgNew);
      //call api and create sub-category
      this.contentService.createSubCategory(formData).subscribe(result => {
        if (result.errorCode === 0) {
          this.loadOptionSubCategorySort();
          this.loadTableResult();
          this.toast.success(result.message, "Create Successful");
          this.modalNew.hide();
        }
        else {
          this.toast.error(result.message, "Create Fail")
        }
      })
    }
  }

  public updateCategory(cateId) {
    this.cateOrSubCate = true;
    this.categoryUpdate = this.lstTableCategory.find(x => x['id'] == cateId);
    this.updateCategoryName = this.categoryUpdate.cateName;
    this.modalUpdate.show();
  }

  public updateSubCategory(subCateId) {
    this.cateOrSubCate = false;
    this.lstCategoryOptionUpdate = this.lstCategoryOption.filter(x => x['id'] != '0')
    this.slCategoryUpdate = this.slCategory;
    this.subCategoryUpdate = this.lstTableSubCategory.find(x => x['id'] == subCateId);
    this.updateSubCategoryName = this.subCategoryUpdate.subCateName;
    this.modalUpdate.show();
  }

  public submitUpdate() {
    if (this.cateOrSubCate) {
      //create parameters
      const formData: FormData = new FormData();
      formData.append('cateId', this.categoryUpdate['id']);
      formData.append('cateName', this.updateCategoryName);
      //call api and update category
      this.contentService.updateCategory(formData).subscribe(result => {
        if (result.errorCode === 0) {
          this.loadOptionCategorySort();
          this.toast.success(result.message, "Update successfull")
          this.modalUpdate.hide();
        }
        else {
          this.toast.error(result.message, "Update Fail")
        }
      })

    }
    else {
      //create parameters
      const formData: FormData = new FormData();
      formData.append('cateId', this.slCategoryUpdate.toString());
      formData.append('subCateId', this.subCategoryUpdate['id']);
      formData.append('subCateName', this.updateSubCategoryName);
      formData.append('thumbnailSubCate', this.imgUpdate);
      //call api ad update sub-category
      this.contentService.updateSubCategory(formData).subscribe(result => {
        if (result.errorCode === 0) {
          this.loadOptionSubCategorySort();
          this.loadTableResult();
          this.toast.success(result.message, "Update Successful");
          this.modalUpdate.hide();
        }
        else {
          this.toast.error(result.message, "Update Fail")
        }
      })
    }
  }

  removeConfirm(id, name, cateOrSub) {
    this.cateOrSubCate = cateOrSub;
    this.modalConfirmDelete.show();
    this.idRemove = id;
    this.nameRemove = name;
  }

  deleteCategory() {
    this.contentService.deleteCategory(this.idRemove).subscribe(result => {
      if (result.errorCode === 0) {
        this.modalConfirmDelete.hide();
        this.toast.success(result.message, "Delete Successful");
        this.loadTableResult();
        this.loadOptionCategorySort();
        this.slCategory = 0;
      }
      else {
        this.toast.error(result.message, "Delete Fail")
      }
    })
  }

  deleteSubCategory() {
    this.contentService.deleteSubCategory(this.idRemove).subscribe(result => {
      if (result.errorCode === 0) {
        this.modalConfirmDelete.hide();
        this.toast.success(result.message, "Delete Successful");
        this.loadTableResult();
        this.loadOptionSubCategorySort();
      }
      else {
        this.toast.error(result.message, "Delete Fail")
      }
    })
  }
  //*********************************************
  //end category


}
