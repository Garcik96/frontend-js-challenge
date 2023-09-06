import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import { selectIsOpenState } from 'src/app/store/selectors';

@Component({
  selector: 'app-sidebar',
  template: `
    <p-sidebar
      styleClass="trend__sidebar"
      position="right"
      [(visible)]="isOpen"
      (onHide)="onHide()">
      <ng-container [ngTemplateOutlet]="trendEditTemplate"></ng-container>

      <ng-template #trendEditTemplate>
        <app-trend-edit></app-trend-edit>
      </ng-template>
    </p-sidebar>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private isOpen$ = this.store.select(selectIsOpenState);
  private subscription!: Subscription;

  public isOpen!: boolean;

  constructor(private store: Store) {}

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
