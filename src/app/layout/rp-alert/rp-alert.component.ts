import { Component, OnInit } from "@angular/core";
import { ReportService, API_URL } from "../../shared";

export class Query {
  from: Date;
  to: Date;
}

@Component({
  selector: "app-rp-alert",
  templateUrl: "./rp-alert.component.html",
  styleUrls: ["./rp-alert.component.scss"]
})
export class RpAlertComponent implements OnInit {
  query = new Query();
  dataRpAlert: any;
  amount: number = 0;

  constructor(private service: ReportService) {}

  ngOnInit() {}

  getReportAlert() {
    if (this.query.from != null && this.query.to != null) {
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to
      };

      this.amount = 0;
      this.service.reportAlertSmartbin(params).subscribe(
        res => {
          this.dataRpAlert = res;
          for (let i = 0; i < this.dataRpAlert.length; i++) {
            this.amount = this.amount + parseInt(this.dataRpAlert[i]['alert_amount']);
          }
        },
        err => console.log(err)
      );
    }
  }

  updateFromDate(source) {
    this.query.from = source.target.value;
    this.getReportAlert();
  }

  updateToDate(source) {
    this.query.to = source.target.value;
    this.getReportAlert();
  }

  downloadPDF() {
    window.open(
      `${API_URL}/PDFreportAlertSmartbin?dateFrom=${this.query.from}&dateTo=${
        this.query.to
      }`
    );
  }
}
