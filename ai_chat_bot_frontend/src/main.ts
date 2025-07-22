import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Bootstrap standalone AppComponent for Angular 14+ standalone
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
