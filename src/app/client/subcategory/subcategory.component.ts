import { SubcategoryService } from './../../services/subcategory.service';
import { Component, OnInit } from '@angular/core';
import { PostData } from 'src/app/services/post.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html'
})
export class SubcategoryComponent implements OnInit {

  subCateName: string;
  cateName: string;
  lstPostSubCategory: PostData[];
  currentPage: number = 1;
  totalPage: number;
  constructor(private title: Title, private subCategoryService: SubcategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPosts(this.currentPage.toString());
  }

  loadPosts(page) {
    //create parameters
    let param = new HttpParams();
    param = param.append('subCateId', this.route.snapshot.paramMap.get('subcateid'));
    param = param.append('page', page);
    //call api and set data
    this.subCategoryService.getAllPostBySubCateId(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.title.setTitle(result.cateName + " -" + result.subCateName + " | Mini Blog")
        this.subCateName = result.subCateName;
        this.lstPostSubCategory = result.data;
        this.totalPage = result.totalPage;
        this.currentPage = result.currentPage;
        this.cateName = result.cateName;
      }
      else {
        console.log(result.message);
      }
    })
  }

  //scroll to href
  loadNewPage(newPage) {
    if (typeof (newPage) === typeof (1)) {
      this.loadPosts(newPage);
      let x = document.querySelector("#subcategory");
      if (x) {
        x.scrollIntoView();
      }
    }
  }

}
