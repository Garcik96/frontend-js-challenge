import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTrends } from '../store/actions/trends-list-page.actions';
import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import { selectTrendsByProvider } from '../store/selectors';

@Component({
  selector: 'app-trends-list',
  template: `
    <section class="trend__container">
      <article class="trend" *ngFor="let trend of trends$ | async">
        <a class="trend__link" routerLink="/trends/{{ trend.id }}">
          <figure class="trend__figure">
            <img
              *ngIf="trend.image"
              class="trend__image"
              [src]="trend.image"
              [alt]="trend.title" />
            <img
              *ngIf="!trend.image"
              class="trend__image"
              src="assets/Iconos/Favicon/favicon_avantio.svg"
              [alt]="trend.title" />
            <figcaption class="trend__title">
              <h2>{{ trend.title }}</h2>
            </figcaption>
          </figure>
          <p class="trend__excerpt">{{ trend.body[0] }}</p>
        </a>
      </article>
    </section>
    <button
      class="app-button app-button--primary app-button--floating"
      (click)="openCreateTrendSidebar()">
      <img src="assets/Iconos/Actions/add.svg" alt="Añadir noticia" />
    </button>
  `,
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent implements OnInit {
  protected trends$ = this.store.select(selectTrendsByProvider);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTrends());
  }

  public openCreateTrendSidebar(): void {
    this.store.dispatch(updateSidebarState({ isOpen: true }));
  }
}
