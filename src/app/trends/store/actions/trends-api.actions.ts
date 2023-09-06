import { createAction, props } from '@ngrx/store';

import { Trend } from 'src/app/trends/models/trend.model';

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const createTrendSuccess = createAction(
  '[Trends/API] Create One Trend Success',
  props<{ newTrend: Trend }>()
);

export const updateTrendSuccess = createAction(
  '[Trends/API] Update One Trend Success',
  props<{ trendToUpdate: Trend }>()
);

export const deleteTrendSuccess = createAction(
  '[Trends/API] Delete One Trend Success',
  props<{ trendIdToDelete: string }>()
);
