import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ChatService, ChatMessage } from './core/chat.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
/**
 * Main chat window with scrolling message area and input.
 * Handles sending/receiving messages, scrolls to bottom on new messages.
 */
export class ChatWindowComponent implements OnInit {
  /** Chat message history */
  messages: ChatMessage[] = [];
  /** Current user message (HTML string) */
  userInput: string = '';
  /** Loading state for bot's reply */
  isBotTyping: boolean = false;
  /** Keep reference to chat scroll container */
  @ViewChild('scrollContainer') scrollContainer?: ElementRef;

  ngOnInit() {
    // @ts-ignore
    setTimeout(() => this.scrollToBottom(), 0);
    // Subscribe for new messages and bot typing state here as appropriate,
    // If unused, remove these variables and subscriptions.
  }

  sendMessage() {
    const msg = (this.userInput ?? '').trim();
    if (msg) {
      // Send message via global ChatService (should be injected by parent/module)
      this.userInput = '';
      // @ts-ignore
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  scrollToBottom() {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  onInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
