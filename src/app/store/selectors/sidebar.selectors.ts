import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSidebarReducer from '../reducers/sidebar.reducer';

export const selectSidebarState =
  createFeatureSelector<fromSidebarReducer.State>('sidebar');

export const selectIsOpenState = createSelector(
  selectSidebarState,
  fromSidebarReducer.selectIsOpenState
);
