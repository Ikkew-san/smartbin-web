import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../shared';
declare var $: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  dataExchange: any;
  dataExchangelist: any;
  dataNotFinish: any;
  status = ["ยกเลิก", "ขอแลก", "เตรียมของ", "พร้อมจ่าย", "เรียบร้อย", "ตัดสิทธิ์"];
  exchangelistStatus = ["ยกเลิก", "ยังไม่พร้อม", "พร้อมแล้ว"];
  exchangeStatus: any;

  constructor(private services: ExchangeService) {
  }

  ngOnInit() {
    this.getExchange();
    this.getExchangeNotFinish();
  }

  getExchange() {
    this.services.getExchange().subscribe(
      res => {
        this.dataExchange = res;
      },
      err => console.log(err)
    );
  }

  getExchangelist(id) {
    this.services.getExchangelist(id).subscribe(
      res => {
        this.dataExchangelist = res;
        this.exchangeStatus = res[(this.dataExchangelist.length - 1)]
        this.dataExchangelist.splice((this.dataExchangelist.length - 1), 1);

        for (let i = 0; i < this.dataExchangelist.length; i++) {
          if (this.dataExchangelist[i]["exchangelist_status"] == 1) {
            this.dataExchangelist[i]["disabled"] = false;
          } else {
            this.dataExchangelist[i]["disabled"] = true;
          }
        }
      },
      err => console.log(err)
    );
  }

  getExchangeNotFinish() {
    this.services.getExchangeNotFinish().subscribe(
      res => {
        this.dataNotFinish = res;
        for (let i = 0; i < this.dataNotFinish.length; i++) {
          if (this.dataNotFinish[i]["exchange_status"] == 2 && this.dataNotFinish[i]["exchangelist"] != 0) {
            this.dataNotFinish[i]["disabled"] = true;
          } else {
            this.dataNotFinish[i]["disabled"] = false;
          }
        }
      },
      err => console.log(err)
    );
  }

  statusExchange(id) {
    let param = { exchange: id, user: 2 };
    this.services.putExchangeStatus(param).subscribe(
      () => {
        this.ngOnInit();
      },
      err => console.log(err)
    );
  }

  statusExchangelist(exchangelist_id, exchange_id) {
    let param = { exchangelist: exchangelist_id };
    this.services.putExchangelistStatus(param).subscribe(
      () => {
        this.getExchangelist(exchange_id);
      },
      err => console.log(err)
    );
  }

  closeModal() {
    $('#exchangelistModal').modal('hide');
    this.ngOnInit();
  }

  cancelExchange(id) {
    let param = { id: id };
    this.services.cancelExchange(param).subscribe(
      () => {
        this.ngOnInit();
      },
      err => console.log(err)
    );
  }

  cancelExchangelist(exchangelist_id, exchange_id) {
    let param = { id: exchangelist_id };
    this.services.cancelExchangelist(param).subscribe(
      () => {
        this.getExchangelist(exchange_id);
      },
      err => console.log(err)
    );
  }
}
