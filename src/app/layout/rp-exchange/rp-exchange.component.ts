import { Component, OnInit } from "@angular/core";
import { RewardsService, ReportService, API_URL } from "src/app/shared";

export class Query {
  from: Date;
  to: Date;
  rewards: any;
  status: any;
}

@Component({
  selector: "app-rp-exchange",
  templateUrl: "./rp-exchange.component.html",
  styleUrls: ["./rp-exchange.component.scss"]
})
export class RpExchangeComponent implements OnInit {
  query = new Query();
  textStatus = {
    "0": "ยกเลิก",
    "1": "ขอแลก",
    "2": "เตรียมของ",
    "3": "พร้อมจ่าย",
    "5": "ตัดสิทธิ์"
  };
  dataRpExchangelist: any;
  rewardsSelect: any;
  unit: number;

  constructor(
    private rewardsService: RewardsService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.getRewardsName();
  }

  getRewardsName() {
    this.rewardsService.getRewardsName().subscribe(
      res => {
        this.rewardsSelect = res;
      },
      err => console.log(err)
    );
  }

  getReportExchange() {
    if (
      this.query.from != null &&
      this.query.to != null &&
      this.query.status != null &&
      this.query.rewards != null
    ) {
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to,
        rewards: this.query.rewards,
        status: this.query.status
      };

      this.reportService.reportExchange(params).subscribe(
        res => {
          this.dataRpExchangelist = res;
          this.unit = 0;

          for (let i = 0; i < this.dataRpExchangelist.length; i++) {
            this.unit =
              this.unit +
              parseFloat(this.dataRpExchangelist[i]["exchangelist_unit"]);
            console.log(this.unit);
          }
        },
        err => console.log(err)
      );
    }
  }

  updateFromDate(source) {
    this.query.from = source.target.value;
    this.getReportExchange();
  }

  updateToDate(source) {
    this.query.to = source.target.value;
    this.getReportExchange();
  }

  updateStatus(source) {
    this.query.status = source;
    this.getReportExchange();
  }

  updateSelected(source) {
    this.query.rewards = source.target.value;
    this.getReportExchange();
  }

  downloadPDF() {
    window.open(
      `${API_URL}/PDFreportExchange?dateFrom=${this.query.from}&dateTo=${this.query.to}&status=${this.query.status}&rewards=${this.query.rewards}`
    );
  }
}
