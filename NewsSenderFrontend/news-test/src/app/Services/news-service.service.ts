import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { News } from '../interfaces/News';

@Injectable({
  providedIn: 'root',
})
export class NewsServiceService {
  private hubConnection: signalR.HubConnection;
  private newsUrl = 'http://localhost:5000/api/News';
 private signalEndpoint = 'http://localhost:5000/newshub';

 //private signalEndpoint = '/newshub';
  private newsUpdated = new Subject<News>();

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.signalEndpoint)
      .build();

    this.hubConnection.on('ReceiveNews', (news: News) => {
      this.newsUpdated.next(news);
    });

    this.hubConnection
      .start()
      .catch((err) => console.error('Error while starting connection: ' + err));
  }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl);
  }

  getNewsUpdateListener(): Observable<News> {
    return this.newsUpdated.asObservable();
  }
}
