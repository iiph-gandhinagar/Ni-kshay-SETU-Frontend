import { M_App, M_algorithm, M_assessment, M_auth, M_cgc, M_chat, M_health, M_leaderBoard, M_masterSearch, M_materials, M_screening, M_survey, M_user } from "./MockInitialState";
import configureStore from 'redux-mock-store';

export const initialState = {
    app: M_App,
    masterSearch: M_masterSearch,
    user: M_user,
    auth: M_auth,
    assessment: M_assessment,
    materials: M_materials,
    algorithm: M_algorithm,
    cgc: M_cgc,
    screening: M_screening,
    health: M_health,
    chat: M_chat,
    leaderBoard: M_leaderBoard,
    survey: M_survey,
};
const mockStore = configureStore([]);
export const MockStore = mockStore(initialState);



