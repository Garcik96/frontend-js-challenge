import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendEditPageActions from '../actions/trend-edit-page.actions';
import { TrendService } from '../../trend.service';

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
        this.trendService.createOne(newTrend).pipe(catchError(() => of()))
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
              ? TrendsApiActions.loadOneTrendSuccess({ trend: trendToUpdate })
              : { type: 'NO ACTION' }
          ),

          catchError(() => of())
        )
      )
    );
  });

  deleteOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendEditPageActions.deleteTrend),
      switchMap(({ trendIdToDelete }) =>
        this.trendService
          .deleteOne(trendIdToDelete)
          .pipe(catchError(() => of()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private trendService: TrendService
  ) {}
}
