import { createAction, props } from '@ngrx/store';
import { userInfo } from '../../extend/interface';

export const SetUserInfo = createAction('setUserInfo', props<{ user: userInfo }>());