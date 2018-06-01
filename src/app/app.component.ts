import {Component} from '@angular/core';

@Component({
  selector: 'omni-app',
  template: `<router-outlet></router-outlet>`
  + `<omni-progress-spinner></omni-progress-spinner>`,
})
export class AppComponent {
}
