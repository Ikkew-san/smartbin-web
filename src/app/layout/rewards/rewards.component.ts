import { Component, OnInit, ViewChild } from '@angular/core';
import { RewardsService } from "../../shared/services/rewards.service";
import { NgForm } from "@angular/forms";
import { ImageCroppedEvent } from "ngx-image-cropper";

declare var $: any;@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  @ViewChild("f") rewardsForm: NgForm;
  imageChangedEvent: any = null;
  fileImage: File = null;
  croppedImage: any = null;
  previewImage: any = "../assets/images/system/image.svg";
  dataRewards: any;
  searchText: any;
  rewardsModal: any;
  model: any = {};

  constructor(private service: RewardsService) { }

  ngOnInit() {
    this.getRewards();
  }

  getRewards() {
    this.service.getRewards().subscribe(
      res => {
        this.dataRewards = res;
      },
      err => console.log(err)
    );
  }

  setStatus(id: number) {
    let param = {
      id: id
    };
    this.service.putRewardsStatus(param).subscribe(
      () => {
        this.getRewards();
      },
      err => console.log(err)
    );
  }

  deleteRewards(id: number) {
    this.service.deleteRewards(id).subscribe(
      () => {
        this.getRewards();
      },
      err => console.log(err)
    );
  }

  onSubmitRewards() {
    let params = new FormData();
    params.append("name", this.rewardsForm.value.name);
    params.append("price", this.rewardsForm.value.price);
    params.append("points", this.rewardsForm.value.points);
    params.append("image", this.fileImage, this.rewardsForm.value.image);

    if (this.rewardsModal == 0) {
      this.service.setRewards(params).subscribe(
        () => {
          this.getRewards();
          $("#rewardsModal").modal("hide");
        },
        err => console.log(err)
      );
    } else if (this.rewardsModal == 1) {
      this.service.putRewards(this.rewardsForm.value.id, params).subscribe(
        () => {
          $("#rewardsModal").modal("hide");
          $("#name").removeAttr("disabled");
          this.rewardsForm.reset();
          this.previewImage = "../assets/images/system/image.svg";
          this.getRewards();
        },
        err => console.log(err)
      );
    } else {
      return false;
    }
  }

  openModalEdit(id: number) {
    this.rewardsModal = 1;
    this.service.findRewards(id).subscribe(
      res => {
        $("#name").attr("disabled", "disabled");
        this.rewardsForm.controls["id"].setValue(res["rewards_id"]);
        this.rewardsForm.controls["name"].setValue(res["rewards_name"]);
        this.rewardsForm.controls["price"].setValue(res["rewards_price"]);
        this.rewardsForm.controls["points"].setValue(res["rewards_points"]);
        this.previewImage = res["image_url"];
      },
      err => console.log(err)
    );
  }

  closeModal() {
    $("#rewardsModal").modal("hide");
    $("#name").removeAttr("disabled");
    this.resetForm();
  }

  onFileChanged(event) {
    this.imageChangedEvent = event;
  }

  imageLoaded() {
    $("#croppedImage").modal({ backdrop: "static", keyboard: false }, "show");
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileImage = <File>event.file;
    console.log(event);
  }

  submitCropped() {
    this.previewImage = this.croppedImage;
    this.imageChangedEvent = null;
    this.croppedImage = null;
    $("#croppedImage").modal("hide");
  }

  cancelCropped() {
    this.imageChangedEvent = null;
    this.fileImage = null;
    this.croppedImage = null;
    this.rewardsForm.controls["image"].reset();
    $("#croppedImage").modal("hide");
  }

  resetForm() {
    this.rewardsForm.reset();
    this.imageChangedEvent = null;
    this.fileImage = null;
    this.croppedImage = null;
    this.previewImage = "../assets/images/system/image.svg";
  }
}
