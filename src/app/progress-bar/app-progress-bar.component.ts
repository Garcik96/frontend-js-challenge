import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  `,
  styleUrls: ['./app-progress-bar.component.scss'],
})
export class AppProgressBarComponent {}
