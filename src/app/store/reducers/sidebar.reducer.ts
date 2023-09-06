import { createReducer, on } from '@ngrx/store';

import * as SidebarActions from '../actions/sidebar.actions';

export interface State {
  isOpen: boolean | null;
}

export const initialState: State = {
  isOpen: false,
};

export const reducer = createReducer(
  initialState,
  on(
    SidebarActions.updateSidebarState,
    (state, { isOpen }): State => ({ ...state, isOpen })
  )
);

export const selectIsOpenState = (state: State) => state.isOpen;
