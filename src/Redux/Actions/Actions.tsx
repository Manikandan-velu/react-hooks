import * as actionTypes from '../../Constants/ActionTypes';
import { ReduxAction } from '../Reducers/Reducer';
import {IHorse, IToaster} from '../../Interface/interface';
import { type } from 'os';

export interface IToken {
    isToken: boolean;
}

export const setLoading = (loading: boolean)=> ({
    type: actionTypes.IS_LOADING,
    payload: {loading}
})

export const setToken = (token: boolean)=> ({
    type: actionTypes.IS_TOKEN,
    payload: {token}
})

export const setSelectedHorse = (horse: IHorse)=> ({
    type: actionTypes.SELECTED_HORSE,
    payload: { horse }
})

export const setToaster = (toaster: IToaster)=> ({
    type: actionTypes.TOASTER_TYPE,
    payload: {toaster}
})