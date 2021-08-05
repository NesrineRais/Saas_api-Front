import {LOAD_ALL_PROSPECT} from './actions-types';

export const loadAllProspect = (prospects)=>{
    return function(dispatch){
        dispatch({
            type: LOAD_ALL_PROSPECT,
            payload: prospects
        })
    }
}