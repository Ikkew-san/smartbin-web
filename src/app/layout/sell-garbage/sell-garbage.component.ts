import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SellGarbageService } from '../../shared';
declare var $: any;

@Component({
  selector: 'app-sell-garbage',
  templateUrl: './sell-garbage.component.html',
  styleUrls: ['./sell-garbage.component.scss']
})
export class SellGarbageComponent implements OnInit {
  @ViewChild("f") sellForm: NgForm;
  dateSell: any;
  searchDate: any;

  constructor(private services: SellGarbageService) {
  }

  ngOnInit() {
    this.getSellGarbage();
  }

  getSellGarbage() {
    this.services.getSellGarbage().subscribe(
      res => {
        this.dateSell = res;
      },
      err => console.log(err)
    );
  }

  onSubmit() {
    let params = {
      weight: this.sellForm.value.weight,
      money: this.sellForm.value.money
    };

    let logged_profile = JSON.parse(localStorage.getItem("logged_profile"));
    let id = logged_profile["id"]
    this.services.setSellGarbage(id, params).subscribe(
      () => {
        $("#addModal").modal("hide");
        this.sellForm.resetForm()
        this.getSellGarbage();

      },
      err => console.log(err)
    );
  }
}
