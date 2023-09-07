import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Trend } from 'src/app/trends/models/trend.model';
import * as TrendsApiActions from 'src/app/trends/store/actions/trends-api.actions';
import { resetSelectedTrend } from '../actions/trends-list-page.actions';

export const trendsFeatureKey = 'trends';

export interface State extends EntityState<Trend> {
  selectedTrend: Trend | null;
}

export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
});

export const trendsReducer = createReducer(
  initialState,
  on(TrendsApiActions.loadTrendsSuccess, (state, { trends }) => {
    return adapter.setAll(trends, state);
  }),
  on(TrendsApiActions.loadTrendsError, state => {
    return adapter.removeAll(state);
  }),
  on(
    TrendsApiActions.loadOneTrendSuccess,
    (state, { trend: selectedTrend }): State => {
      return { ...state, selectedTrend };
    }
  ),
  on(TrendsApiActions.loadOneTrendError, (state): State => {
    return { ...state, selectedTrend: null };
  }),
  on(TrendsApiActions.createTrendSuccess, (state, { newTrend }): State => {
    return adapter.addOne(newTrend, state);
  }),
  on(TrendsApiActions.updateTrendSuccess, (state, { trendToUpdate }): State => {
    return { ...state, selectedTrend: trendToUpdate };
  }),
  on(TrendsApiActions.deleteTrendSuccess, (state, { trendIdToDelete }) => {
    return adapter.removeOne(trendIdToDelete, state);
  }),
  on(resetSelectedTrend, (state): State => {
    return { ...state, selectedTrend: null };
  })
);

export const selectSelectedTrend = (state: State) => state.selectedTrend;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of trend ids
export const selectTrendIds = selectIds;

// select the dictionary of trend entities
export const selectTrendEntities = selectEntities;

// select the array of trends
export const selectAllTrends = selectAll;

// select the total trend count
export const selectTrendTotal = selectTotal;
