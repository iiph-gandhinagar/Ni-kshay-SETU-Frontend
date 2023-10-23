import { combineReducers } from 'redux';
import assessmentReducer from './assessmentReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import materialsReducer from './materialsReducer';
import algorithmReducer from './algorithmReducer';
import cgcReducer from './cgcReducer';
import screeningReducer from './screeningReducer';
import healthFacilityReducer from './healthFacilityReducer';
import chatReducer from './chatReducer';
import appReducer from './appReducer';
import LeaderBoardReducer from './LeaderBoardReducer';
import SurveyReducer from './SurveyReducer'
import masterSearchReducer from './masterSearchReducer';

export const rootReducer = combineReducers({
    user: usersReducer,
    auth: authReducer,
    assessment: assessmentReducer,
    materials: materialsReducer,
    algorithm: algorithmReducer,
    cgc: cgcReducer,
    screening: screeningReducer,
    health: healthFacilityReducer,
    chat: chatReducer,
    app: appReducer,
    leaderBoard: LeaderBoardReducer,
    survey: SurveyReducer,
    masterSearch: masterSearchReducer
});
