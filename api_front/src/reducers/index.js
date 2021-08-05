import { combineReducers } from "redux";
import UserReducer from './userReducer';
import RdvReducer from './rdvReducer';
import ProspectReducer from './prospectReducer';
import FollowReducer from './followReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    rdv: RdvReducer,
    prospect: ProspectReducer,
    follow: FollowReducer

})

export default rootReducer;