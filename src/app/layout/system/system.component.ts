import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SystemService } from 'src/app/shared';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var $: any;

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  @ViewChild("f") systemForm: NgForm;
  imageChangedEvent: any = null;
  fileImage: File = null;
  croppedImage: any = null;  
  model: any = {};
  image_url: any;

  constructor(private services: SystemService) { }

  ngOnInit() {
    this.getSystem()
  }

  getSystem() {
    this.services.getSystem().subscribe(
      res => {
        this.systemForm.resetForm();
        this.systemForm.controls["name"].setValue(res["system_name"])
        this.systemForm.controls["address"].setValue(res["system_address"])
        this.systemForm.controls["telephone"].setValue(res["system_telephone"])
        this.systemForm.controls["points"].setValue(res["system_points"])
        this.image_url = res["image_url"]
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    let params = new FormData();
    params.append("name", this.systemForm.value.name);
    params.append("address", this.systemForm.value.address);
    params.append("telephone", this.systemForm.value.telephone);
    params.append("points", this.systemForm.value.points);
    if (this.fileImage != null) {
      params.append("image", this.fileImage, this.systemForm.value.image);
    }
    this.services.putSystem(params).subscribe(
      (res) => {
        console.log(res);
        
        this.getSystem()
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
    this.image_url = this.croppedImage;
    this.imageChangedEvent = null;
    this.croppedImage = null;
    $("#croppedImage").modal("hide");
  }

  cancelCropped() {
    this.systemForm.controls["image"].reset();   
    $("#croppedImage").modal("hide");
  }

}
