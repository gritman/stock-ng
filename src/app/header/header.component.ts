import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../shared/web-socket.service';
import {environment} from '../../environments/environment'; // 记住,要引用environment.ts,而不是environment.prod.ts

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  messageCount = 0;
  title = environment.appTitle;

  constructor(public websocketService: WebSocketService) {

  }

  ngOnInit() {
    this.websocketService.createObservableSocket('ws://localhost:8085')
      .map(event => JSON.parse(event))
      .subscribe(
        event => this.messageCount = event.messageCount
      );
  }
}
