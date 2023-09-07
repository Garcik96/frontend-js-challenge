import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import { deleteTrend } from '../store/actions/trend-edit-page.actions';
import { selectSelectedTrend } from '../store/selectors';

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button
            type="button"
            class="app-button app-button--primary-light"
            (click)="editTrend()">
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button
            type="button"
            class="app-button app-button--primary-light"
            (click)="deleteTrend(trend.id)">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img
          *ngIf="trend.image"
          class="trend__image"
          [src]="trend.image"
          alt="trend.title" />
        <img
          *ngIf="!trend.image"
          class="trend__image trend__image--default"
          src="assets/Logos/avantio.svg"
          alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  constructor(private store: Store) {}

  public editTrend(): void {
    this.store.dispatch(updateSidebarState({ isOpen: true }));
  }

  public deleteTrend(trendIdToDelete: string): void {
    console.log(trendIdToDelete);
    this.store.dispatch(deleteTrend({ trendIdToDelete }));
  }
}
