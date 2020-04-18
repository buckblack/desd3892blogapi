import { AuthInterceptor } from './services/admin/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './client/home/home.component';
import { SubscribeComponent } from './client/subscribe/subscribe.component';
import { FooterComponent } from './client/footer/footer.component';
import { HeaderComponent } from './client/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { SliderComponent } from './admin/slider/slider.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { CategoryComponent } from './client/category/category.component';
import { SubcategoryComponent } from './client/subcategory/subcategory.component';
import { DetailComponent } from './client/detail/detail.component';
import { SearchComponent } from './client/search/search.component';
import { AboutComponent } from './client/about/about.component';
import { ContactComponent } from './client/contact/contact.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostpagingComponent } from './client/home/postpaging/postpaging.component';
import { PostComponent } from './admin/post/post.component';
import { AdmincategoryComponent } from './admin/admincategory/admincategory.component';
import { AdmincommentComponent } from './admin/admincomment/admincomment.component';
import { AdminstatispostComponent } from './admin/adminstatispost/adminstatispost.component';
import { AdminstatiscommentComponent } from './admin/adminstatiscomment/adminstatiscomment.component';
import { AdminnotifyComponent } from './admin/adminnotify/adminnotify.component';
import { AdminmessageComponent } from './admin/adminmessage/adminmessage.component';
import { RoleComponent } from './admin/role/role.component';
import { UserComponent } from './admin/user/user.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { GuestComponent } from './admin/guest/guest.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';
import { AdminstatisuserComponent } from './admin/adminstatisuser/adminstatisuser.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HomeComponent,
    SubscribeComponent,
    FooterComponent,
    HeaderComponent,
    AdminComponent,
    NavbarComponent,
    SliderComponent,
    DashboardComponent,
    AdminFooterComponent,
    CategoryComponent,
    SubcategoryComponent,
    DetailComponent,
    SearchComponent,
    AboutComponent,
    ContactComponent,
    NotfoundComponent,
    PostpagingComponent,
    PostComponent,
    AdmincategoryComponent,
    AdmincommentComponent,
    AdminstatispostComponent,
    AdminstatiscommentComponent,
    AdminnotifyComponent,
    AdminmessageComponent,
    RoleComponent,
    UserComponent,
    LoginComponent,
    ResetpasswordComponent,
    GuestComponent,
    ForbiddenComponent,
    UnauthorizeComponent,
    AdminstatisuserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
