import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        // 什么时候发射下一个元素
        this.ws.onmessage = (event) => observer.next(event.data);
        // 什么时候抛出异常
        this.ws.onerror = (event) => observer.error(event);
        // 什么时候发出流结束的信号
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }
}
