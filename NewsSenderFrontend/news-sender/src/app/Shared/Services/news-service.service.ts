import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject, map } from 'rxjs';
import { News } from '../../interfaces/News';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsServiceService {
  private hubConnection: signalR.HubConnection;
  private newsUrl = 'http://localhost:5000/api/News';
  private signalEndpoint = '/newshub';
  private newsUpdated = new Subject<News>();

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.newsUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection.start().catch((e) => console.log(e));
    /*this.hubConnection.on('ReceiveNews', (news: News) => {
      this.newsUpdated.next(news);
    });*/
  }
  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl);
  }

  getNewsUpdateListener(): Observable<News> {
    // return this.newsUpdated.asObservable();

    return new Observable<News>((observer) => {
      this.hubConnection.on('ReceiveNews', (news: News) => {
        observer.next(news);
      });
    });
  }
}
