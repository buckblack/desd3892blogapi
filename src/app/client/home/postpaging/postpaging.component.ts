import { PostData } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-postpaging',
  templateUrl: './postpaging.component.html'
})
export class PostpagingComponent implements OnInit {

  currentPage:number=1;
  totalPage:number;
  lstPostsRecent:PostData[];
  constructor(private homeService: HomeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //create parameters
    let param=new HttpParams();
    param=param.append('page',this.currentPage.toString());
    //call api and set data
    this.loadPaging(param);
  }

  loadPaging(param)
  {
    this.homeService.getPostsRecent(param).subscribe(result=>{
      if(result.errorCode===0)
      {
        this.lstPostsRecent=result.data;
        this.totalPage=result.totalPage;
        this.currentPage=result.currentPage;
      }
      else
      {
        console.log(result.message)
      }
    })
  }
  loadNewPage(newPage)
  {
    if(typeof(newPage)===typeof(1))
    {
      //create parameters
      let param=new HttpParams();
      param=param.append('page',newPage);
      //call api and load data
      this.loadPaging(param);
    }
  }

}
