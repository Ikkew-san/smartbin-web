import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared';
import { NgForm } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild("f") adminForm: NgForm;
  @ViewChild("e") editAdminForm: NgForm;
  imageChangedEvent: any = null;
  fileImage: File = null;
  croppedImage: any = null;
  previewImage: any = "../assets/images/system/avatar.svg";
  imageDetail: any = "../assets/images/system/avatar.svg";
  searchText: any;
  dataTable: any;
  detailUser: any;

  private addModal = false;
  private detailModal = false;
  private editData = false;

  constructor(private services: UserService) { }

  ngOnInit() {
    this.getUser();
    $("#edit input").prop("disabled", true);

  }

  getUser() {
    let param = { position: 1 };
    this.services.getUser(param).subscribe(
      res => {
        this.dataTable = res;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    if (this.addModal == true) {
      let params = new FormData();
      params.append("firstname", this.adminForm.value.firstname);
      params.append("lastname", this.adminForm.value.lastname);
      params.append("birthday", this.adminForm.value.birthday);
      params.append("gender", this.adminForm.value.gender);
      params.append("email", this.adminForm.value.email);
      params.append("telephone", this.adminForm.value.telephone);
      params.append("username", this.adminForm.value.username);
      params.append("password", this.adminForm.value.password);
      if (this.fileImage != null) {
        params.append("image", this.fileImage, this.adminForm.value.image);
      }
      params.append("position", "1");
      this.services.setUser(params).subscribe(
        res => {
          if (res == "username") {
            alert("ชื่อผู้ใช้นี้มีผู้อื่นใช้แล้ว")
          } else if (res == "email") {
            alert("อีเมลนี้มีผู้อื่นใช้แล้ว")
          } else {
            this.addModal = false;
            $("#addModal").modal("hide");
            this.getUser();
          }
        },
        err => console.log(err)
      );
    } else if (this.detailModal == true && this.editData == true) {
      let params = new FormData();
      params.append("firstname", this.editAdminForm.value.firstname);
      params.append("lastname", this.editAdminForm.value.lastname);
      params.append("birthday", this.editAdminForm.value.birthday);
      params.append("gender", this.editAdminForm.value.gender);
      params.append("email", this.editAdminForm.value.email);
      params.append("telephone", this.editAdminForm.value.telephone);
      params.append("password", this.editAdminForm.value.password);
      if (this.fileImage != null) {
        params.append("image", this.fileImage, this.editAdminForm.value.image);
      }
      params.append("position", "1");
      params.append("id", this.detailUser["user_id"]);

      this.services.putUser(params).subscribe(
        res => {
          this.getUser();
          this.getDetailuser(this.detailUser["user_id"]);
          this.editData = false;
          $("#e-image").hide();
          $("#edit input").prop("disabled", true);
        },
        err => console.log(err)
      );
    }
  }

  getDetailuser(id: number) {
    this.imageDetail = "../assets/images/system/avatar.svg";

    this.services.findUser(id).subscribe(
      res => {
        this.detailUser = res;
        this.editAdminForm.controls["firstname"].setValue(
          this.detailUser["user_firstname"]
        );
        this.editAdminForm.controls["lastname"].setValue(
          this.detailUser["user_lastname"]
        );
        this.editAdminForm.controls["birthday"].setValue(
          this.detailUser["user_birthday"]
        );
        this.editAdminForm.controls["gender"].setValue(
          this.detailUser["user_gender"]
        );
        this.editAdminForm.controls["email"].setValue(this.detailUser["user_email"]);
        this.editAdminForm.controls["telephone"].setValue(
          this.detailUser["user_telephone"]
        );
        this.editAdminForm.controls["password"].setValue(
          this.detailUser["user_password"]
        );
        if (this.detailUser["image_url"] != null) {
          this.imageDetail = this.detailUser["image_url"];
        }
      },
      err => console.log(err)
    );
  }

  closeDetailModal() {
    this.previewImage = "../assets/images/system/avatar.svg";
    this.detailModal = false;
    this.editData = false;
  }

  openEdit() {
    this.editData = true;
    $("#e-image").show();
    $("#edit input").prop("disabled", false);
  }

  closeEdit(id: number) {
    this.editData = false;
    this.resetFormImage();
    this.editAdminForm.resetForm();
    $("#e-image").hide();
    $("#edit input").prop("disabled", true);
    this.getDetailuser(id);
  }

  setStatus(id: number) {
    if (this.detailUser["user_status"] == 1) {
      let param = {
        status: 0
      };
      this.services.putStatus(id, param).subscribe(
        () => {
          this.getUser();
          this.getDetailuser(id);
        },
        err => console.log(err)
      );
    } else {
      let param = {
        status: 1
      };
      this.services.putStatus(id, param).subscribe(
        () => {
          this.getUser();
          this.getDetailuser(id);
        },
        err => console.log(err)
      );
    }
  }

  deleteUser(id: number) {
    this.services.deleteUser(id).subscribe(
      res => {
        if (res == 0) {
          alert("ไม่สามารถลบผู้ใช้นี้ได้")
        } else {
          $("#detailModal").modal("hide");
          this.getUser();
        }
      },
      err => console.log(err)
    );
  }

  onFileChanged(event) {
    this.imageChangedEvent = event;
  }

  imageLoaded() {
    $("#croppedImage")
      .modal({ backdrop: "static", keyboard: false })
      .show();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileImage = <File>event.file;
  }

  submitCropped() {
    if (this.editData == true) {
      this.imageDetail = this.croppedImage;
    } else if (this.addModal == true) {
      this.previewImage = this.croppedImage;
    }
    this.imageChangedEvent = null;
    this.croppedImage = null;
    $("#croppedImage").modal("hide");
  }

  cancelCropped() {
    this.resetFormImage();
    $("#croppedImage").modal("hide");
  }

  resetFormImage() {
    if (this.addModal == true) {
      this.adminForm.controls["image"].reset();
    }
    else if (this.detailModal == true && this.editData == true) {
      this.editAdminForm.controls["image"].reset();
    }
    this.imageChangedEvent = null;
    this.fileImage = null;
    this.croppedImage = null;
  }
}
