import { AdminstatisuserComponent } from './admin/adminstatisuser/adminstatisuser.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserComponent } from './admin/user/user.component';
import { RoleComponent } from './admin/role/role.component';
import { AdminmessageComponent } from './admin/adminmessage/adminmessage.component';
import { AdminnotifyComponent } from './admin/adminnotify/adminnotify.component';
import { AdminstatiscommentComponent } from './admin/adminstatiscomment/adminstatiscomment.component';
import { AdminstatispostComponent } from './admin/adminstatispost/adminstatispost.component';
import { AdmincommentComponent } from './admin/admincomment/admincomment.component';
import { AdmincategoryComponent } from './admin/admincategory/admincategory.component';
import { PostComponent } from './admin/post/post.component';
import { PostpagingComponent } from './client/home/postpaging/postpaging.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailComponent } from './client/detail/detail.component';
import { SearchComponent } from './client/search/search.component';
import { AboutComponent } from './client/about/about.component';
import { ContactComponent } from './client/contact/contact.component';
import { SubcategoryComponent } from './client/subcategory/subcategory.component';
import { CategoryComponent } from './client/category/category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './client/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './admin/guest/guest.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category/:cateid',
        component: CategoryComponent,
      },
      {
        path:'Detail/:postid',
        component: DetailComponent,
      },
      {
        path:'subcategory/:subcateid',
        component: SubcategoryComponent,
      },
      {
        path:'search/:key',
        component: SearchComponent,
      },
      {
        path:'about',
        component: AboutComponent,
      },
      {
        path:'contact',
        component: ContactComponent,
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'post',
        component: PostComponent,
      },
      {
        path: 'category',
        component: AdmincategoryComponent,
      },
      {
        path: 'comment',
        component: AdmincommentComponent,
      },
      {
        path: 'statispost',
        component: AdminstatispostComponent,
      },
      {
        path: 'statiscomment',
        component: AdminstatiscommentComponent,
      },
      {
        path: 'statisuser',
        component: AdminstatisuserComponent,
      },
      {
        path: 'notify',
        component: AdminnotifyComponent,
      },
      {
        path: 'message',
        component: AdminmessageComponent,
      },
      {
        path: 'role',
        component: RoleComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'guest',
        component: GuestComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: '401',
    component: UnauthorizeComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path:'**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
