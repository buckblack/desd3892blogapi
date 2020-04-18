import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-unauthorize',
  templateUrl: './unauthorize.component.html',
  styleUrls: ['./unauthorize.component.css']
})
export class UnauthorizeComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("401 UNAUTHORIZE!")
  }

}
