import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';

import { updateSidebarState } from 'src/app/store/actions/sidebar.actions';
import * as TrendEditPageActions from 'src/app/trends/store/actions/trend-edit-page.actions';
import * as TrendsApiActions from 'src/app/trends/store/actions/trends-api.actions';
import * as TrendsListPageActions from 'src/app/trends/store/actions/trends-list-page.actions';

import { TrendService } from 'src/app/trends/trend.service';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map(trends => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map(trend => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  createOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendEditPageActions.createTrend),
      switchMap(({ newTrend }) =>
        this.trendService.createOne(newTrend).pipe(
          map(newTrend => {
            this.store.dispatch(updateSidebarState({ isOpen: false }));
            return TrendsApiActions.createTrendSuccess({ newTrend });
          }),
          catchError(() => of())
        )
      )
    );
  });

  updateOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendEditPageActions.editTrend),
      switchMap(({ trendToUpdate }) =>
        this.trendService.updateOne(trendToUpdate).pipe(
          map(hasUpdated =>
            hasUpdated
              ? TrendsApiActions.updateTrendSuccess({ trendToUpdate })
              : { type: 'NO ACTION' }
          ),
          tap(() => this.store.dispatch(updateSidebarState({ isOpen: false }))),
          catchError(() => of())
        )
      )
    );
  });

  deleteOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendEditPageActions.deleteTrend),
      switchMap(({ trendIdToDelete }) =>
        this.trendService.deleteOne(trendIdToDelete).pipe(
          map(hasDeleted =>
            hasDeleted
              ? TrendsApiActions.deleteTrendSuccess({ trendIdToDelete })
              : { type: 'NO ACTION' }
          ),
          tap(() => this.router.navigate([''])),
          catchError(() => of())
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private trendService: TrendService,
    private store: Store,
    private router: Router
  ) {}
}
