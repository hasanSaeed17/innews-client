import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,        // keep your existing appConfig providers/config
  providers: [
    ...(appConfig.providers || []), // preserve existing providers from appConfig
    provideHttpClient()             // add HttpClient provider
  ]
})
.catch((err) => console.error(err));
