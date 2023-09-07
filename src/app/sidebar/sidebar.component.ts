import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import { selectIsOpenState } from 'src/app/store/selectors';
import { CustomBreakpointObserver } from '../layout';

@Component({
  selector: 'app-sidebar',
  template: `
    <p-sidebar
      *ngIf="(isSmallScreen$ | async) === false"
      styleClass="trend__sidebar"
      position="right"
      [(visible)]="isOpen"
      (onHide)="onHide()">
      <ng-container [ngTemplateOutlet]="trendEditTemplate"></ng-container>
    </p-sidebar>

    <p-sidebar
      *ngIf="isSmallScreen$ | async"
      styleClass="trend__sidebar"
      [fullScreen]="true"
      [(visible)]="isOpen"
      (onHide)="onHide()">
      <ng-container [ngTemplateOutlet]="trendEditTemplate"></ng-container>
    </p-sidebar>

    <ng-template #trendEditTemplate>
      <app-trend-edit></app-trend-edit>
    </ng-template>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private isOpen$ = this.store.select(selectIsOpenState);

  public isSmallScreen$ = this.breakpointsObserver.isSmall$;
  public isOpen!: boolean;

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen ?? false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onHide(): void {
    this.store.dispatch(updateSidebarState({ isOpen: false }));
  }
}
