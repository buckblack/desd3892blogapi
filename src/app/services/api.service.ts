import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'http://buckblack-001-site1.ctempurl.com/api/';
  apiUrl = {
    postHot: this.baseUrl + 'post/getpostshot',
    postRelated: this.baseUrl + 'post/getpostsrelated',
    postSearch: this.baseUrl + 'post/search',
    postDetail: this.baseUrl + 'post/detail',
    postComment: this.baseUrl + 'post/comment',
    postRecent: this.baseUrl + 'post/getpostsrecent',
    postRecentComment: this.baseUrl + 'post/getpostsrecentcomment',
    category: this.baseUrl + 'category/getall',
    categorySub: this.baseUrl + 'category/getallsubcategory',
    categoryPost: this.baseUrl + 'category/getpostsbycateid',
    subcategory:this.baseUrl+'subcategory/getallpostsbysubcateid',
    getallsubcategory:this.baseUrl+'subcategory/getallsubcategory',
    submitComment: this.baseUrl + 'post/submitcomment',
    submitSubscriber: this.baseUrl + 'post/addnewsubscriber',
    contentCategorySort: this.baseUrl + 'admincontent/getcategoryoptionsort',
    contentSubCategorySort: this.baseUrl + 'admincontent/getsubcategoryoptionsort',
    contentTableSubCategory: this.baseUrl + 'admincontent/getsortresultcategorybycateid',
    contentCreateCategory: this.baseUrl + 'admincontent/createcategory',
    contentUpdateCategory: this.baseUrl + 'admincontent/updatecategory',
    contentdeleteCategory: this.baseUrl + 'admincontent/deletecategory',
    contentCreateSubCategory: this.baseUrl + 'admincontent/createsubcategory',
    contentUpdateSubCategory: this.baseUrl + 'admincontent/updatesubcategory',
    contentdeleteSubCategory: this.baseUrl + 'admincontent/deletesubcategory',

    contentSearchPostComment: this.baseUrl + 'admincontent/searchpostscomment',
    contentGetComments: this.baseUrl + 'admincontent/getcomments',
    contentRemoveComments: this.baseUrl + 'admincontent/removecomment',

    roleGetAll: this.baseUrl + 'adminuser/getallrole',
    roleAddNew: this.baseUrl + 'adminuser/addnewrole',
    roleEdit: this.baseUrl + 'adminuser/editrole',
    roleRemove: this.baseUrl + 'adminuser/removerole',

    guestGetAll: this.baseUrl + 'adminuser/getallguest',

    userGetAll: this.baseUrl + 'adminuser/getalluser',
    userAddNew: this.baseUrl + 'adminuser/addnewuser',
    userUpdate: this.baseUrl + 'adminuser/updateuser',
    userUpdateStatus: this.baseUrl + 'adminuser/updatestatususer',

    contentPostGetCategory: this.baseUrl + 'admincontent/getallcategoryforpost',
    contentPostGetSubCategory: this.baseUrl + 'admincontent/getsubcategoryforpost',
    contentPostGetBySubCateId: this.baseUrl + 'admincontent/getpostbysubcateid',
    contentPostDetail: this.baseUrl + 'admincontent/detail',
    contentPostSearch: this.baseUrl + 'admincontent/searchpost',
    contentAddNewPost: this.baseUrl + 'admincontent/addnewpost',
    contentAddImgMoreUpdate: this.baseUrl + 'admincontent/addmoreimageupdate',
    contentUpdatePost: this.baseUrl + 'admincontent/updatepost',
    contentUpdateStatusPost: this.baseUrl + 'admincontent/updatestatuspost',
    contentRemoveTrashImagePost: this.baseUrl + 'admincontent/removetrashimagecontent',

    authLogin: this.baseUrl + 'adminauth/login',
    authChangePW: this.baseUrl + 'adminauth/changepassword',
    authResetPW: this.baseUrl + 'adminauth/resetpassword',

    dashBoard: this.baseUrl + 'admindashboard/dashboard',
    dashBoardChart: this.baseUrl + 'admindashboard/dashboardchart',

    adminNotify: this.baseUrl + 'adminnotify/submitnotify',
    adminGetNotifyNav: this.baseUrl + 'adminnotify/getnotifynav',
    adminGetNotify: this.baseUrl + 'adminnotify/getnotify',
    adminGetNotifyDetail: this.baseUrl + 'adminnotify/getnotifydetail',
    adminDeleteNotify: this.baseUrl + 'adminnotify/deletenotify',
    
    adminStatisticalPostAllTime: this.baseUrl + 'adminstatistical/getpostchartalltime',
    adminStatisticalPostByTime: this.baseUrl + 'adminstatistical/getpostchartbytime',
    adminStatisticalCommentAllTime: this.baseUrl + 'adminstatistical/getcommentchartalltime',
    adminStatisticalCommentByTime: this.baseUrl + 'adminstatistical/getcommentchartbytime',
    adminStatisticalUserAllTime: this.baseUrl + 'adminstatistical/getuserchartalltime',
    adminStatisticalUserByTime: this.baseUrl + 'adminstatistical/getuserchartbytime',
  }
}
