import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../../interface/ngRxinterface';
import * as articleReducer from './adminReducer';

export const reducers: ActionReducerMap<AppState> = {
  adminState: articleReducer.adminReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('actionType', action.type);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] =  [logger];