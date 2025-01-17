import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Import the AppComponent class

window.addEventListener('beforeunload', () => {
  localStorage.clear();
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  window.addEventListener('beforeunload', () => {
    localStorage.clear();
  });