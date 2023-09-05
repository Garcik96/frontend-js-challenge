import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';

export const createTrend = createAction(
  '[Trend Edit Page] Create New Trend',
  props<{ newTrend: Trend }>()
);

export const editTrend = createAction(
  '[Trend Edit Page] Update Trend',
  props<{ trendToUpdate: Trend }>()
);

export const deleteTrend = createAction(
  '[Trend Edit Page] Delete Trend',
  props<{ trendIdToDelete: string }>()
);
