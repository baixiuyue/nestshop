import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { adminState } from '../../extend/interface';
import { SetUserInfo } from './action';

export const initialState: adminState = {
  userInfo:{}
};

export const adminReducer = createReducer(initialState,
  on(SetUserInfo, (state, action) => {
    return Object.assign({},state,{ userInfo: action.user });
  }),
);

export const getAdimState = createFeatureSelector<adminState>('adminState');

export const adminStateSelector = createSelector(
  getAdimState,
  (state: adminState) => state
);