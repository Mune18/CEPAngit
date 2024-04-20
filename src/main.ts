import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app/app.component';

// Bootstrap the AppComponent directly with appConfig
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
