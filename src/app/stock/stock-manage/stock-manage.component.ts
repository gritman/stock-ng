import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {

  private stocks: Array<Stock>;

  constructor() {
  }

  ngOnInit() {
    this.stocks = [
      new Stock(1, '股票名1', 1.99, 3.5, '股票说明1', ['饮料', '食品']),
      new Stock(2, '股票名2', 5.37, 4.5, '股票说明2', ['IT', '互联网']),
      new Stock(3, '股票名3', 3.37, 2.5, '股票说明3', ['制造', '互联网']),
      new Stock(4, '股票名4', 4.37, 3.5, '股票说明4', ['IT', '消费']),
      new Stock(5, '股票名5', 5.37, 4.5, '股票说明5', ['金融', '互联网']),
      new Stock(6, '股票名6', 6.37, 2.0, '股票说明6', ['金融', '消费']),
      new Stock(7, '股票名7', 7.37, 4.0, '股票说明7', ['IT', '互联网']),
      new Stock(8, '股票名8', 8.37, 3.0, '股票说明8', ['制造', '食品']),
    ];
  }

}

export class Stock {
  constructor(public id: number,
              public name: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {

  }
}
