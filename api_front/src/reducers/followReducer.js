import {LOAD_ALL_FOLLOW} from '../actions/follow/actions-types';

const initialState = {
    follows: []
}

export default function FollowReducer (state = initialState, action) {
    switch(action.type){
        case LOAD_ALL_FOLLOW:
           return {follows: action.payload} 
        break;
    }
    
    return state;
}