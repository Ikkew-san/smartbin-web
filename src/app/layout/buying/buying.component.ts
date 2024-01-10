import { Component, OnInit, ViewChild } from '@angular/core';
import { RewardsService } from '../../shared';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.scss']
})
export class BuyingComponent implements OnInit {
  @ViewChild("addBuying") buyingForm: NgForm;
  dataBuying: any;
  dataBuylist: any;
  dataBuylist_total: number = 0;
  detailBuying: any = [{}];
  rewardsName: any = [];
  removeRewards: any = [];
  valueForm: any = [];
  valueNet: number = 0;
  searchDate: any;
  btnAddBuying = true;

  constructor(private service: RewardsService) { }

  ngOnInit() {
    this.getBuying();
  }

  getBuying() {
    this.service.getBuying().subscribe(
      res => {
        this.dataBuying = res;
        this.searchDate = ""
      },
      err => console.log(err)
    );
  }

  getRewardsName() {
    this.service.getRewardsName().subscribe(
      res => {
        this.rewardsName = res;
      },
      err => console.log(err)
    );
  }

  getBuylist(id: number) {
    this.service.getBuylist(id).subscribe(
      res => {
        this.dataBuylist = res;
        
        for (let i = 0; i < this.dataBuylist.length; i++) {
          this.dataBuylist_total += this.dataBuylist[i]["buylist_total"];
        }
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    this.valueForm[this.valueForm.length] = {
      idRewards: this.buyingForm.value.name,
      name: this.rewardsName[this.buyingForm.value.name]["rewards_name"],
      amount: parseInt(this.buyingForm.value.amount),
      price: parseFloat(this.buyingForm.value.price)
    };
    this.valueNet = parseInt(this.buyingForm.value.amount) * parseFloat(this.buyingForm.value.price) + this.valueNet;

    this.removeRewards[this.removeRewards.length] = this.rewardsName[this.buyingForm.value.name];
    this.rewardsName.splice(this.buyingForm.value.name, 1);
    this.btnAddBuying = false;
    this.buyingForm.reset();
  }

  setBuylist() {
    let params = this.valueForm;
    let id = null;
    if (localStorage.getItem("isLoggedin")) {
      let logged_profile = JSON.parse(localStorage.getItem("logged_profile"));
      id = logged_profile["id"]
    } else if (sessionStorage.getItem("isLoggedin")) {
      let logged_profile = JSON.parse(sessionStorage.getItem("logged_profile"));
      id = logged_profile["id"]
    }

    this.service.setBuying(id, params).subscribe(
      () => {
        $("#addBuying").modal("hide");
        this.valueForm = [];
        this.removeRewards = [];
        this.valueNet = 0;
        this.buyingForm.reset();
        this.getBuying();
      },
      err => console.log(err)
    );
  }

  removeBuylist(num) {
    let total = this.valueForm[num]["price"] * this.valueForm[num]["amount"]
    this.rewardsName[this.rewardsName.length] = this.removeRewards[num];
    this.removeRewards.splice(num, 1);
    this.valueForm.splice(num, 1);
    this.valueNet = this.valueNet - total;
    if (this.valueForm == "") {
      this.btnAddBuying = true;
    }
  }

  closeModalBuying() {
    $("#addBuying").modal("hide");
    this.valueForm = [];
    this.removeRewards = [];
    this.valueNet = 0;
    this.buyingForm.reset();
  }
}
