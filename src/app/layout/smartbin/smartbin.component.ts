import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SmartbinService } from '../../shared';
declare var $: any;

@Component({
  selector: 'app-smartbin',
  templateUrl: './smartbin.component.html',
  styleUrls: ['./smartbin.component.scss']
})
export class SmartbinComponent implements OnInit {
  @ViewChild("f") smartbinForm: NgForm;
  @ViewChild("s") statusForm: NgForm;
  dataSmartbin: any;
  actionModal: any;
  searchText: any;
  qrData = null;

  constructor(private services: SmartbinService) { }

  ngOnInit() {
    this.getSmartbin()
  }

  getSmartbin() {
    this.services.getSmartbin().subscribe(res => {
      this.dataSmartbin = res
    }, err => console.log(err));
  }

  findSmartbin() {
    this.services.findSmartbin(this.smartbinForm.value.id).subscribe(
      res => {
        this.smartbinForm.controls["id"].setValue(res["smartbin_id"]);
        this.smartbinForm.controls["hostname"].setValue(res["smartbin_hostname"]);
        this.smartbinForm.controls["ipaddress"].setValue(res["smartbin_ipaddress"]);
        this.smartbinForm.controls["address"].setValue(res["smartbin_address"]);
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    let params = {
      hostname: this.smartbinForm.value.hostname,
      ipaddress: this.smartbinForm.value.ipaddress,
      address: this.smartbinForm.value.address
    };

    if (this.actionModal == "edit") {
      params["id"] = this.smartbinForm.value.id;
      console.log(params);

      this.services.putSmartbin(params).subscribe(
        () => {
          $("#smartbinModal").modal("hide");
          this.smartbinForm.resetForm();
          this.actionModal = "";
          this.getSmartbin();
        },
        err => console.log(err)
      );
    } else if (this.actionModal == "add") {
      this.services.setSmartbin(params).subscribe(
        () => {
          $("#smartbinModal").modal("hide");
          this.actionModal = "";
          this.getSmartbin();
        },
        err => console.log(err)
      );
    }
  }

  putStatus(arr, id) {
    let params = {
      id: id,
      status: this.statusForm.value.status
    }

    this.services.putSmartbinStatus(params).subscribe(
      res => {
        this.dataSmartbin[arr]["smartbin_status"] = res;
        this.statusForm.controls["status"].setValue(res);
      },
      err => console.log(err)
    );
  }

  editModel(id) {
    this.services.findSmartbin(id).subscribe(
      res => {
        this.actionModal = "edit";
        this.smartbinForm.controls["id"].setValue(res["smartbin_id"]);
        this.smartbinForm.controls["hostname"].setValue(res["smartbin_hostname"]);
        this.smartbinForm.controls["ipaddress"].setValue(res["smartbin_ipaddress"]);
        this.smartbinForm.controls["address"].setValue(res["smartbin_address"]);
        $("#smartbinModal").modal("show");
      },
      err => console.log(err)
    );
  }

  deleteBin(id) {
    this.services.deleteSmartbin(id).subscribe(
      () => {
        this.getSmartbin();
      },
      err => console.log(err)
    );
  }

  printQrcode() {
    let printContents, popupWin;
    printContents = document.getElementById('qrcode').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <body class="text-center" onload="window.print();window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();
  }

  closeModel() {
    $("#smartbinModal").modal("hide");
    this.actionModal = "";
    this.smartbinForm.resetForm();
  }
}
