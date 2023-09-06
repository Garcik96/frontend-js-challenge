import { createAction, props } from '@ngrx/store';

export const updateSidebarState = createAction(
  '[Sidebar] Update sidebar state',
  props<{ isOpen: boolean }>()
);
