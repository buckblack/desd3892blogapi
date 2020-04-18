import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleData, UserService } from 'src/app/services/admin/user.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {

  lstRole: RoleData[];
  roleName: string;
  roleView: RoleData = {} as RoleData;
  @ViewChild('modalEditView') modalEditView: ModalDirective;
  @ViewChild('modalConfirmRemove') modalConfirmRemove: ModalDirective;
  constructor(private title:Title,private userService: UserService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.title.setTitle("Role | Admin | Mini Blog");
    this.loadAllRole();
  }

  loadAllRole() {
    this.userService.getAllRole().subscribe(result => {
      if (result.errorCode === 0) {
        this.lstRole = result.data;
      }
      else {
        console.log(result.message);
      }
    })
  }

  addNewRole() {
    //create parameters
    const param = { "roleName": this.roleName };
    //call api add role
    this.userService.AddNewRole(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.toast.success(result.message);
        this.loadAllRole();
      }
      else {
        this.toast.error(result.message);
      }
    })
  }

  viewEdit(roleId, roleName) {
    this.roleView.Id = roleId;
    this.roleView.roleName = roleName;
    this.modalEditView.show();
  }

  viewRemove(roleId, roleName) {
    this.roleView.Id = roleId;
    this.roleView.roleName = roleName;
    this.modalConfirmRemove.show();
  }

  submitEdit() {
    //create parameters
    const param = { 
      "roleName": this.roleView.roleName,
      "roleId":this.roleView.Id.toString(),
    };
    //call api update role
    this.userService.EditRole(param).subscribe(result => {
      if (result.errorCode === 0) {
        this.toast.success(result.message);
        this.loadAllRole();
        this.modalEditView.hide();
      }
      else {
        this.toast.error(result.message);
      }
    })
  }

  submitRemove() {
    this.userService.RemoveRole(this.roleView.Id.toString()).subscribe(result => {
      if (result.errorCode === 0) {
        this.toast.success(result.message);
        this.loadAllRole();
        this.modalConfirmRemove.hide();
      }
      else {
        this.toast.error(result.message);
      }
    })
  }

}
