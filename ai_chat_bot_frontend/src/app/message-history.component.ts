import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatService } from './core/chat.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-message-history',
  standalone: true,
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css'],
  imports: [CommonModule],
  providers: [DatePipe]
})
export class MessageHistoryComponent {
  history$: typeof this.chatService.history$;

  constructor(private chatService: ChatService) {
    this.history$ = this.chatService.history$;
  }
}
