import { Router } from '@angular/router';
import { PostData } from 'src/app/services/post.service';
import { PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  lstPostsSearch: PostData[] = [] as PostData[];
  currentPage: number = 1;
  totalPage: number;
  key: string = '';
  constructor(private title: Title, private route: ActivatedRoute, private router: Router, private postService: PostService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.title.setTitle("Search | Mini Blog");
    this.key = this.route.snapshot.paramMap.get('key');
    this.loadPostsSearch(this.currentPage);
  }

  //key must more 3 charater
  checkKey() {
    if (this.key.trim().length < 3) {
      return;
    }
  }

  loadPostsSearch(page) {
    this.checkKey();
    //create parameters
    let param = new HttpParams();
    param = param.append('searchKey', this.route.snapshot.paramMap.get('key'));
    param = param.append('page', page);
    //call api and set data
    this.postService.getPostsSearch(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPostsSearch = result.data;
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
      //load data new page
      this.loadPostsSearch(newPage);
      //scroll to href
      let x = document.querySelector("#search");
      if (x) {
        x.scrollIntoView();
      }
    }
  }

}
