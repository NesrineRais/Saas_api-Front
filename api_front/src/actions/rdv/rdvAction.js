import {LOAD_ALL_RDV} from './actions-types';

export const loadAllRdv = (rdv)=>{
    return function(dispatch){
        dispatch({
            type: LOAD_ALL_RDV,
            payload: rdv
        })
    }
}