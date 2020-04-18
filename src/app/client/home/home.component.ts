import { PostData } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  lstPostsHot: PostData[];
  lstPostsRecentcomment: PostData[];

  constructor(private title: Title, private homeService: HomeService) { }

  ngOnInit(): void {
    this.title.setTitle("Mini Blog | Home")
    this.getPostsHot();
    this.getPostsRecentComment();
  }
  getPostsHot() {
    this.homeService.getPostsHot().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPostsHot = result.data;
      }
      else {
        console.log(result.message)
      }
    })
  }

  getPostsRecentComment() {
    this.homeService.getPostsRecentComment().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstPostsRecentcomment = result.data;
      }
      else {
        console.log(result.message)
      }
    })
  }

}
