import {Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  private rating = 0;

  @Input()
  readonly = true;

  @Output()
  ratingChange: EventEmitter<number> = new EventEmitter();

  private stars: boolean[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // true代表是空心星星,false代表实心星星
    // this.stars = [false, true, false, false, false];
    this.stars = []; // 必须先初始化
    for (let i = 1; i <= 5; ++i) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
