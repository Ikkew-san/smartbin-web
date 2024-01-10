import { Component, OnInit } from '@angular/core';
import { ReportService, API_URL } from 'src/app/shared';

export class Query {
  from: Date
  to: Date
}

@Component({
  selector: 'app-rp-cumulative',
  templateUrl: './rp-cumulative.component.html',
  styleUrls: ['./rp-cumulative.component.scss']
})
export class RpCumulativeComponent implements OnInit {
  query = new Query();
  dataRpCumulative: any;
  amount: number = 0;
  points: number = 0;

  constructor(private services: ReportService) { }

  ngOnInit() { }

  getReportCumulative() {
    if (this.query.from != null && this.query.to != null) {
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to,
      }
      this.amount = 0;
      this.points = 0;
      this.services.reportCumulative(params).subscribe(res => {
        this.dataRpCumulative = res
        for (let i = 0; i < this.dataRpCumulative.length; i++) {
          this.amount = this.amount + parseFloat(this.dataRpCumulative[i]['cumulative_amount'])
          this.points = this.points + parseFloat(this.dataRpCumulative[i]['cumulative_points'])
        }
      }, err => console.log(err));
    }
  }

  updateFromDate(source) {
    this.query.from = source.target.value;
    this.getReportCumulative()
  }

  updateToDate(source) {
    this.query.to = source.target.value;
    this.getReportCumulative()
  }

  downloadPDF() {
    window.open(`${API_URL}/PDFreportCumulative?dateFrom=${this.query.from}&dateTo=${this.query.to}`);
  }
}

