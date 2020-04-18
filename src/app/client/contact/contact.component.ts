import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Contact | Mini Blog");
  }

}
