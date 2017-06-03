import {Component, OnInit} from '@angular/core';
import {Stock, StockService} from '../stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup; // 响应式表单

  stock: Stock;

  constructor(private routeInfo: ActivatedRoute,
              private stockService: StockService,
              private router: Router) {
  }

  ngOnInit() {
    const stockId = this.routeInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    console.log(this.stock.rating);
    this.router.navigateByUrl('/stock');
  }
}
