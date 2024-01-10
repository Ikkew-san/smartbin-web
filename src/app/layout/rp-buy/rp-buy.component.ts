import { Component, OnInit } from '@angular/core';
import { ReportService, API_URL } from 'src/app/shared';

export class Query {
  from: Date
  to: Date
}

@Component({
  selector: 'app-rp-buy',
  templateUrl: './rp-buy.component.html',
  styleUrls: ['./rp-buy.component.scss']
})
export class RpBuyComponent implements OnInit {
  query = new Query();
  dataRpBuy: any;
  amount: any
  total: any

  constructor(private service: ReportService) { }

  ngOnInit() {
  }

  getReportBuy() {
    if (this.query.from != null && this.query.to != null) {
      this.amount = 0
      this.total = 0
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to
      }
      
      this.service.reportBuy(params).subscribe(res => {
        this.dataRpBuy = res
        for (let i = 0; i < this.dataRpBuy.length; i++) {
          this.amount = this.amount + parseInt(this.dataRpBuy[i]['buy_amount']);
          this.total = this.total + parseFloat(this.dataRpBuy[i]['buy_total']);
        }
      }, err => console.log(err));
    }
  }

  updateFromDate(source) {
    this.query.from = source.target.value;
    this.getReportBuy()
  }

  updateToDate(source) {
    this.query.to = source.target.value;
    this.getReportBuy()
  }

  downloadPDF() {
    window.open(`${API_URL}/PDFreportBuy?dateFrom=${this.query.from}&dateTo=${this.query.to}`);
  }
}
