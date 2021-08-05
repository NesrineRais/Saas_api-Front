import {LOAD_ALL_RDV} from '../actions/rdv/actions-types';

const initialState = {
    rdv: []
}

export default function RdvReducer(state = initialState, action) {
    switch(action.type){
        case LOAD_ALL_RDV:
            return {rdv: action.payload}
        break;
    }
    return state;
}