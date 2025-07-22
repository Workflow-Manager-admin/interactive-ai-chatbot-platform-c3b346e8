import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-bot-status-indicator',
  template: `
    <span class="bot-status-indicator">
      <span class="status-dot" [ngClass]="online ? 'on' : 'off'"></span>
      <span class="status-label">{{ online ? 'Bot online' : 'Bot offline' }}</span>
    </span>
  `,
  styleUrls: ['./bot-status-indicator.component.css']
})
export class BotStatusIndicatorComponent {
  online: boolean = false;
}
