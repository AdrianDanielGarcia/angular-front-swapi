import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// hide splash screen
setTimeout( ()=> {
  const splahElement = document.querySelector('.splash-overlay');
  if (splahElement) {
    splahElement.classList.add('fade-away');
  }
}, 5000);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
