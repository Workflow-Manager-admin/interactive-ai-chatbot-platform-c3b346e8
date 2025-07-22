import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageHistoryComponent } from './message-history.component';
import { ChatSettingsComponent } from './chat-settings.component';
import { BotStatusIndicatorComponent } from './bot-status-indicator.component';
import { ChatWindowComponent } from './chat-window.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    MessageHistoryComponent,
    ChatSettingsComponent,
    BotStatusIndicatorComponent,
    ChatWindowComponent
  ]
})
/**
 * Root app component for the AI Chat Bot frontend.
 * Renders the sidebar, header, and main chat interface, and provides overall layout.
 */
export class AppComponent {
  /** Used in header for app title */
  title = 'AI Chat Bot';

  /** Sidebar tab selection */
  selectedTab: string = 'chat';
}
