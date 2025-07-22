import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // fix plural property
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
