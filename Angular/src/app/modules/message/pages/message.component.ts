import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { TranslocoService } from '@jsverse/transloco';
import { SpiderFormControl, SpiderMessageService, User } from '@playerty/spider';
import { ActivatedRoute } from '@angular/router';
import { Message, SendMessageSaveBody, UserExtended } from 'src/app/business/entities/business-entities.generated';

@Component({
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  users: UserExtended[];
  recipient: UserExtended;
  messages: Message[];

  messageFormControl = new SpiderFormControl<string>(null);

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private translocoService: TranslocoService,
    private messageService: SpiderMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   this.apiService.getUserExtendedList().subscribe(res => {
    this.users = res;
   });
  }

  openMessages(sender: UserExtended) {
    this.apiService.getMessageList(sender.id).subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    if (!this.messageFormControl.value)
      return;

    let sendMessageSaveBody = new SendMessageSaveBody({
      recipientId: this.recipient.id, 
      messageText: this.messageFormControl.value,
    });

    this.apiService.sendMessage(sendMessageSaveBody).subscribe();
  }

}
