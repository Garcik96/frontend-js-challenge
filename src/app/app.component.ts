import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';

@Component({
  selector: 'app-root',
  template: `
    <app-progress-bar
      *ngIf="isLoading$ | async"
      class="app__progress-bar"></app-progress-bar>
    <header class="app__header">
      <a routerLink="/">
        <img
          *ngIf="isSmallScreen$ | async"
          class="app__logo"
          src="assets/Logos/aTrendsPRO.svg"
          alt="Logo Avantio Trends PRO" />
      </a>
      <div class="app__current-date">
        <span>{{ currentDate | date: 'dd MMMM yyyy' }}</span>
      </div>
    </header>
    <nav class="app__navigation">
      <app-menu-small *ngIf="isSmallScreen$ | async"></app-menu-small>
      <app-menu-medium *ngIf="isMediumScreen$ | async"></app-menu-medium>
      <app-menu-large *ngIf="isLargeScreen$ | async"></app-menu-large>
    </nav>
    <main class="app__main-content">
      <router-outlet></router-outlet>
      <app-sidebar></app-sidebar>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDate = Date.now();

  isSmallScreen$ = this.breakpointsObserver.isSmall$;
  isMediumScreen$ = this.breakpointsObserver.isMedium$;
  isLargeScreen$ = this.breakpointsObserver.isLarge$;

  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store
  ) {}
}
