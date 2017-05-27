import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  private pageTitle = '';
  private pageDesc = '';

  constructor(public router: Router) {
    // 监听路由结束事件,根据路由的不同,显示不同的页面标题
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (event.url == '/dashboard') {
          this.pageTitle = '这里是首页';
          this.pageDesc = '首页描述';
        } else if (event.url.startsWith('/stock')) {
          this.pageTitle = '股票信息管理';
          this.pageDesc = '进行股票基本信息增删改查';
        }
      });
  }

  ngOnInit() {
  }

}
