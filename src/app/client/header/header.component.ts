import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService, CategoryData } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  keySearch: string;
  keySearchMobile: string;
  message: string;
  lstCategory: CategoryData[];
  activeForm: boolean;
  @ViewChild('toggleButton', { static: true }) toggleButton: ElementRef;
  constructor(private categoryservice: CategoryService, private route: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.categoryservice.getAll().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstCategory = result.data;
      }
      else {
        this.message = result.message;
      }
    })
  }

  search() {
    //check key must more 3 character
    if (this.keySearch === undefined || this.keySearch.trim().length < 3) {
      this.toast.info("Please enter more 3 character!");
      return;
    }
    //
    this.activeForm = !this.activeForm;
    this.route.navigate(['/search', this.keySearch.trim()]);
    this.toggleButton.nativeElement.click();
  }

  activeFormSearch() {
    this.activeForm = !this.activeForm;
  }

}
