import { Component, OnInit } from '@angular/core';
import { ReportService, API_URL } from 'src/app/shared';

export class Query {
  from: Date
  to: Date
  status: any
  user: any
}

@Component({
  selector: 'app-rp-pay',
  templateUrl: './rp-pay.component.html',
  styleUrls: ['./rp-pay.component.scss']
})
export class RpPayComponent implements OnInit {
  query = new Query();
  textStatus: any = { "3": "ยังไม่จ่าย", "4": "จ่ายแล้ว" }
  dataRpPay: any;
  username: any;
  amount: any;

  constructor(private services: ReportService) { }

  ngOnInit() {
  }

  getReportPay() {
    if (this.query.from != null && this.query.to != null && this.query.status != null && this.query.user != null) {
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to,
        status: this.query.status,
        user: this.query.user
      }

      this.services.reportPay(params).subscribe(res => {
        this.dataRpPay = res
        this.amount = 0;

        for (let i = 0; i < this.dataRpPay.length; i++) {
          this.amount = this.amount + parseFloat(this.dataRpPay[i]['exchangelist_amount'])
        }
      }, err => console.log(err));
    }
  }

  getUsername() {
    if (this.query.from != null && this.query.to != null && this.query.status != null) {
      let params = {
        dateFrom: this.query.from,
        dateTo: this.query.to,
        status: this.query.status,
      }
      this.services.getUsernameInReportPay(params).subscribe(res => {
        this.username = res;
      }, err => console.log(err));
    } 
    else {
      this.username = null
    }
  }

  updateFromDate(source) {
    this.query.from = source.target.value;
    this.getUsername()
    this.getReportPay()
  }
  
  updateToDate(source) {
    this.query.to = source.target.value;
    this.getUsername()
    this.getReportPay()
  }
  
  updateStatus(source) {
    this.query.status = source;
    this.getUsername()
    this.getReportPay()
  }
  
  updateSelected(source) {
    this.query.user = source.target.value;
    this.getReportPay()
  }


  downloadPDF() {
    window.open(`${API_URL}/PDFreportPay?dateFrom=${this.query.from}&dateTo=${this.query.to}&status=${this.query.status}&user=${this.query.user}`);
  }

}
