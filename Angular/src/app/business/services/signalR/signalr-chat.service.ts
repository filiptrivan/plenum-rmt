import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SendMessageSaveBody } from '../../entities/business-entities.generated';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRChatService {
  private hubConnection: HubConnection;

  constructor(
    private config: ConfigService
  ) {
    this.hubConnection = new HubConnectionBuilder()
        // .configureLogging(LogLevel.Trace)  // add this for diagnostic clues
        .withUrl(`${config.apiUrl}/messages`) // SignalR hub URL
        .build();
  }

  startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }

  async closeConnection() {
    await this.hubConnection.stop();
  }

  receiveMessage(): Observable<SendMessageSaveBody> {
    return new Observable<SendMessageSaveBody>((observer) => {
      this.hubConnection.on('ReceiveMessage', (message: SendMessageSaveBody) => {
        observer.next(message);
      });
    });
  }

  sendMessage(message: SendMessageSaveBody): void {
    this.hubConnection.invoke('SendMessage', message);
  }
}