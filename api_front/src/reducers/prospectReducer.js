import {LOAD_ALL_PROSPECT} from '../actions/prospect/actions-types';

const initialState = {
    prospects: []
}

export default function ProspectReducer(state = initialState, action) {
    switch(action.type){
        case LOAD_ALL_PROSPECT:
            return {prospects: action.payload}
        break;
    }
    return state;
}