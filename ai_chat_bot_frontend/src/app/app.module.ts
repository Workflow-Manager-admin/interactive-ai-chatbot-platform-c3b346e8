import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatWindowComponent } from './chat-window.component';
import { MessageHistoryComponent } from './message-history.component';
import { ChatSettingsComponent } from './chat-settings.component';
import { BotStatusIndicatorComponent } from './bot-status-indicator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    MessageHistoryComponent,
    ChatSettingsComponent,
    BotStatusIndicatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
