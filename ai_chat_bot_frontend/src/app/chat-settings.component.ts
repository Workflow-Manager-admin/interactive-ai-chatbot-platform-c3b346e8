import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-chat-settings',
  standalone: true,
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css'],
  imports: [CommonModule]
})
export class ChatSettingsComponent {}
