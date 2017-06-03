import {Component, OnInit} from '@angular/core';
import {Stock, StockService} from '../stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup; // 响应式表单

  categories = ['IT', '互联网', '金融'];

  // 要赋初始值,避免stock是空的情况
  stock: Stock = new Stock(0, '', 0, 0, '', []);

  constructor(private routeInfo: ActivatedRoute,
              private stockService: StockService,
              private router: Router) {
  }

  ngOnInit() {
    const stockId = this.routeInfo.snapshot.params['id'];

    const fb = new FormBuilder();
    // 表单模型定义
    this.formModel = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', Validators.required],
        // 股票星级自定义控件不能这样绑定
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], this.categoriesSelectValidation)
      }
    );

    // 异步拿到的stock数据,可能没拿到就去渲染页面了,就会出现很多undefine
    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        // 拿到数据后,再更新formModel,把股票的数据填上
        this.formModel.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categories: [
            data.categories.indexOf(this.categories[0]) !== -1,
            data.categories.indexOf(this.categories[1]) !== -1,
            data.categories.indexOf(this.categories[2]) !== -1
          ]
        });
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    const chineseCategories = [];
    let index = 0;
    for (let i = 0; i < 3; ++i) {
      if (this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value);
    this.router.navigateByUrl('/stock');
  }

  // 验证器:必须选一个复选框
  categoriesSelectValidation(control: FormArray) {
    let valid = false;
    control.controls.forEach(elem => {
      if (elem.value) {
        valid = true;
      }
    });
    if (valid) {
      return null;
    } else {
      return {categoriesLength: true};
    }
  }
}
