import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryData, SubCategoryData } from 'src/app/services/category.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { PostData } from 'src/app/services/post.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  lstSubCategory: SubCategoryData[];
  lstPost: PostData[];
  currentPage: number = 1;
  totalPage: number;
  constructor(private title: Title,private categoryservice: CategoryService,private router:Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.loadSubcategory();
    this.loadPosts(this.currentPage.toString());
  }

  loadSubcategory() {
    //create parameters
    let param = new HttpParams();
    param = param.append('cateId', this.route.snapshot.paramMap.get('cateid'));
    //call api and load data
    this.categoryservice.getAllSubcategory(param).subscribe(result => {
      if (result.errorCode === 0) {
        console.log(result);
        
        this.title.setTitle("Category | Mini Blog");
        this.lstSubCategory = result.data;
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadPosts(page) {
    //create parameters
    let param = new HttpParams();
    param = param.append('cateId', this.route.snapshot.paramMap.get('cateid'));
    param = param.append('page', page);
    //call api and load data
    this.categoryservice.getAllPosts(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPost = result.data;
        this.totalPage = result.totalPage;
        this.currentPage = result.currentPage;
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadNewPage(newPage) {
    if (typeof (newPage) === typeof (1)) {
      //load data
      this.loadPosts(newPage);
      //scroll to href
      let x = document.querySelector("#category");
      if (x) {
        x.scrollIntoView();
      }
    }
  }

}
