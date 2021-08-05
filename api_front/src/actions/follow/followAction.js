import {LOAD_ALL_FOLLOW} from './actions-types';

export const loadAllFollow = (follows)=>{
    return function(dispatch){
        dispatch({
            type: LOAD_ALL_FOLLOW,
            payload: follows
        })
    }
}