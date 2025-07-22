import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// Chat message shape
export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Message history for sidebar (user msg, time)
export interface HistoryItem {
  userMsg: string;
  time: Date;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
/**
 * ChatService handles chat interactions, state, history,
 * and communication with backend via REST API /messages and /status.
 */
export class ChatService {
  private readonly apiUrl = '/api'; // fallback to /api; customize as needed

  // Chat message stream
  private _messages = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this._messages.asObservable();

  // Message history (up to 10 recent)
  private _history = new BehaviorSubject<HistoryItem[]>([]);
  history$ = this._history.asObservable();

  // Bot status
  private _isOnline = new BehaviorSubject<boolean>(false);
  isOnline$ = this._isOnline.asObservable();

  // Bot typing indicator
  private _isBotTyping = new BehaviorSubject<boolean>(false);
  isBotTyping$ = this._isBotTyping.asObservable();

  constructor(http: HttpClient) {
    this.pollStatusRegularly();
    this.http = http;
  }
  private http: HttpClient;

  // PUBLIC_INTERFACE
  /**
   * Sends user message to bot, fetches reply, and manages state.
   */
  sendMessage(userMsg: string) {
    const now = new Date();
    const userMessage: ChatMessage = { role: 'user', content: userMsg, timestamp: now };

    this.appendMessage(userMessage);
    this._isBotTyping.next(true);

    this.http.post<{ reply: string }>(`${this.apiUrl}/messages`, { message: userMsg })
      .pipe(
        tap(() => {}, () => this._isBotTyping.next(false)),
        catchError(() => { 
          this.appendMessage({ role: 'bot', content: '⚠️ Sorry, could not reach the AI bot.', timestamp: new Date() });
          this._isBotTyping.next(false);
          return of({ reply: '' });
        })
      )
      .subscribe((res: { reply: string }) => {
        this._isBotTyping.next(false);
        const replyMsg: ChatMessage = { role: 'bot', content: res.reply ?? '', timestamp: new Date() };
        this.appendMessage(replyMsg);

        // Add to sidebar history
        this.addToHistory(userMsg, now);
      });
  }

  private appendMessage(msg: ChatMessage) {
    const msgs = [...this._messages.value, msg];
    this._messages.next(msgs);
  }

  private addToHistory(userMsg: string, time: Date) {
    const hist = [{ userMsg, time }, ...this._history.value].slice(0, 10);
    this._history.next(hist);
  }

  /**
   * Polls /status on backend every 5 secs to get bot status.
   */
  private pollStatusRegularly() {
    timer(0, 5000)
      .pipe(
        switchMap(() => this.http.get<{ online: boolean }>(`${this.apiUrl}/status`)
          .pipe(
            catchError(() => of({ online: false }))
          )
        )
      )
      .subscribe(res => {
        this._isOnline.next(res.online);
      });
  }
}
