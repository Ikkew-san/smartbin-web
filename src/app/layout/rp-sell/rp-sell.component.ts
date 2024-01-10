import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared';
import { API_URL } from 'src/app/shared/api-url';

export class Query {
  from: Date
  to: Date
}

@Component({
  selector: 'app-rp-sell',
  templateUrl: './rp-sell.component.html',
  styleUrls: ['./rp-sell.component.scss']
})
export class RpSellComponent implements OnInit {
  query = new Query();
  dataRpSell: any;
  weight: any;
  money: any;
  constructor(private service: ReportService) { }

  ngOnInit() {
  }

  getReportSell() {
    if (this.query.from != null && this.query.to != null) {
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to,
      }
      this.weight = 0;
      this.money = 0;
      this.service.reportSellGarbage(params).subscribe(res => {
        this.dataRpSell = res
        for (let i = 0; i < this.dataRpSell.length; i++) {
          this.weight = this.weight + this.dataRpSell[i]['sell_weight'];
          this.money = this.money + this.dataRpSell[i]['sell_money'];
        }
      }, err => console.log(err));
    }
  }

  updateFromDate(source) {
    this.query.from = source.target.value;
    this.getReportSell()
  }

  updateToDate(source) {
    this.query.to = source.target.value;
    this.getReportSell()
  }
  downloadPDF() {
    window.open(`${API_URL}/PDFreportSellGarbage?dateFrom=${this.query.from}&dateTo=${this.query.to}`);
  }
}
