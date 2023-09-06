import { createAction, props } from '@ngrx/store';

import { Trend } from 'src/app/trends/models/trend.model';
import { NewTrend } from 'src/app/trends/models/new-trend.model';

export const createTrend = createAction(
  '[Trend Edit Page] Create New Trend',
  props<{ newTrend: NewTrend }>()
);

export const editTrend = createAction(
  '[Trend Edit Page] Update Trend',
  props<{ trendToUpdate: Trend }>()
);

export const deleteTrend = createAction(
  '[Trend Edit Page] Delete Trend',
  props<{ trendIdToDelete: string }>()
);
