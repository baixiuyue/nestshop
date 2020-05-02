import { createAction, props } from '@ngrx/store';
import { userInfo } from '../../interface/ngRxinterface';

export const SetUserInfo = createAction('setUserInfo', props<{ user: userInfo }>());