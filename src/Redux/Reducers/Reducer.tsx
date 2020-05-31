import * as actionTypes from '../../Constants/ActionTypes';
import { setToken } from '../Actions/Actions';
import {IHorse, IToaster} from '../../Interface/interface';

export interface StoreState {
    loading: boolean;
    isToken: boolean;
    selectedHorse: IHorse;
    toaster: IToaster;
}

export interface ReduxAction<T = { [key: string]: any; }> {
    type:string;
    payload: T
}

const initialState : StoreState = {
    loading: false,
    isToken: false,
    selectedHorse: {
        id: 0,
        horse_name: ''
    },
    toaster: {
        type: '',
        message: ''
    }
}

export const reducers = (state = initialState, action: ReduxAction)=> {
    console.log('action', action);
    switch (action.type) {
        case actionTypes.IS_LOADING:
            return state = {
                ...state,
                loading: action.payload.loading
            }
        case actionTypes.IS_TOKEN:            
          return state = {
              ...state,
              isToken: action.payload.token
          }
        case actionTypes.SELECTED_HORSE:
            let horse : IHorse = (action.payload.horse as IHorse);
            
            return state = {
                ...state,
                selectedHorse:horse
            }
        case actionTypes.TOASTER_TYPE:
            return state = {
                ...state,
                toaster: action.payload.toaster
            }
        default:
            return state
    }
}