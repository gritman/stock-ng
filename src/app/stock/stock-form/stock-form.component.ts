import {Component, OnInit} from '@angular/core';
import {Stock, StockService} from '../stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup; // 响应式表单

  categories = ['IT', '互联网', '金融'];

  stock: Stock;

  constructor(private routeInfo: ActivatedRoute,
              private stockService: StockService,
              private router: Router) {
  }

  ngOnInit() {
    const stockId = this.routeInfo.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);

    const fb = new FormBuilder();
    // 表单模型定义
    this.formModel = fb.group(
      {
        name: [this.stock.name, [Validators.required, Validators.minLength(3)]],
        price: [this.stock.price, Validators.required],
        // 股票星级自定义控件不能这样绑定
        desc: [this.stock.desc],
        categories: fb.array([
          new FormControl(this.stock.categories.indexOf(this.categories[0]) != -1),
          new FormControl(this.stock.categories.indexOf(this.categories[1]) != -1),
          new FormControl(this.stock.categories.indexOf(this.categories[2]) != -1)
        ])
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    const chineseCategories = [];
    var index = 0;
    for (var i = 0; i < 3; ++i) {
      if (this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value);
    // this.router.navigateByUrl('/stock');
  }
}
