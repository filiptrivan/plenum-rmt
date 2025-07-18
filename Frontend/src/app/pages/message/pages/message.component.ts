import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { SpiderlyFormControl } from 'spiderly';
import { ActivatedRoute, Router } from '@angular/router';
import { SendMessageSaveBody, User, UserMessage } from 'src/app/business/entities/business-entities.generated';
import { firstValueFrom, Subscription } from 'rxjs';
import { SignalRChatService } from 'src/app/business/services/signalR/signalr-chat.service';

@Component({
  templateUrl: './message.component.html',
  standalone: false,
})
export class MessageComponent implements OnInit, OnDestroy {
  chatSubscription: Subscription;

  currentUser: User;
  users: User[];
  messages: UserMessage[];
  correspondentId: number;

  messageFormControl = new SpiderlyFormControl<string>(null);

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private signalRChatService: SignalRChatService
  ) {}

  async ngOnInit() {    
    this.chatSubscription = this.signalRChatService.startConnection().subscribe(() => {
      this.signalRChatService.receiveMessage().subscribe((sendMessageSaveBody: SendMessageSaveBody) => {
        console.log('Is message received.')
        if (
          (sendMessageSaveBody.senderId == this.currentUser.id && sendMessageSaveBody.recipientId == this.correspondentId) || 
          (sendMessageSaveBody.senderId == this.correspondentId && sendMessageSaveBody.recipientId == this.currentUser.id) 
        ) {
          this.getMessages();
        }
      });
    });

    this.route.params.subscribe((params) => {
      this.correspondentId = +params['id'];

      if (this.correspondentId > 0) {
        this.openMessages(this.correspondentId)
      }
      else{
        this.messageFormControl.disable();
      }
    });

    this.currentUser = await firstValueFrom(this.authService.user$);

    this.apiService.getUserList().subscribe(users => {
      this.users = users.filter(x => x.id != this.currentUser.id);
     });
  }

  openMessages(correspondentId: number) {
    this.router.navigate([`messages/${correspondentId}`]);
    this.messageFormControl.enable();
    this.getMessages();
  }

  getMessages(){
    this.apiService.getMessages(this.correspondentId).subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    if (!this.messageFormControl.value)
      return;

    let sendMessageSaveBody = new SendMessageSaveBody({
      senderId: this.currentUser.id,
      recipientId: this.correspondentId, 
      messageText: this.messageFormControl.value,
    });
    
    this.apiService.sendMessage(sendMessageSaveBody).subscribe(() => {
      this.signalRChatService.sendMessage(sendMessageSaveBody);
      this.messageFormControl.setValue(null);
    });
  }

  ngOnDestroy(){
    this.chatSubscription.unsubscribe();
    this.signalRChatService.closeConnection();
  }

}
