import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { adminState } from '../../interface/ngRxinterface';
import { SetUserInfo } from './action';
import { Config } from '../../configs/config';
import * as storage from 'local-storage';

export const initialState: adminState = {
  userInfo:storage.get(Config.userStorageKay) || {}
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