import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import * as fromLoaderReducer from './loader.reducer';
import * as fromSidebarReducer from './sidebar.reducer';

export interface State {
  loader: fromLoaderReducer.State;
  sidebar: fromSidebarReducer.State;
  router: RouterState;
}

export const reducers: ActionReducerMap<State> = {
  loader: fromLoaderReducer.reducer,
  sidebar: fromSidebarReducer.reducer,
  router: routerReducer,
};
