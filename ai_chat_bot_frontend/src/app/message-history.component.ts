import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatService } from './core/chat.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css'],
  providers: [DatePipe]
})
export class MessageHistoryComponent {
  // Remove unused variables
}
