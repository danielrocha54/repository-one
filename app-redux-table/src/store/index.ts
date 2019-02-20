import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../environments/environment';
import * as fromAppData from './reducers/data.reducer';

export interface AppState {
	appState: fromAppData.State
}

export const reducers: ActionReducerMap<AppState> = {
	appState: fromAppData.reducer
}

export const selectAppData = (state: AppState) => state.appState;

export const selectCounter = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.counter
);

export const selectCars = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.appdata
);

export const selectLoginAttempts = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.loginAttempts
);

export const selectUser = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.user
);

export const selectSessionToken = createSelector(
	selectAppData,
	(state: fromAppData.State) => state.token
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];