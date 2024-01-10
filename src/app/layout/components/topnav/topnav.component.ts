import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SystemService } from "src/app/shared/services/system.service";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"]
})
export class TopnavComponent implements OnInit {
  dataUser: any;
  dataAlert: any;
  amountAlert = 0;
  image_url: any = "../assets/images/system/avatar.svg";

  constructor(public router: Router, private services: SystemService) {
    if (localStorage.getItem("logged_profile")) {
      this.dataUser = JSON.parse(localStorage.getItem("logged_profile"));
      if (this.dataUser["image"] != null) {
        this.image_url = this.dataUser["image"];
      }
    }
    this.getAlertSmartbin()
  }

  ngOnInit() { }

  getAlertSmartbin() {
    setInterval(() => {
      this.services.getAlertSmartbin().subscribe(res => {
        this.dataAlert = res
        this.amountAlert = this.dataAlert.length
      }, err => console.log(err));
    }, 1500)
  }

  onLoggedout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("logged_profile");
    this.router.navigate(["/login"]);
  }
}
