import {
  LEADERBOARD_DATA,
  GET_LEADERBOARD_DETAILES_SUCCESS, LEADERBOARD_TASK_LIST, LEADERBOARD_TASK_LIST_SUCCESS, GET_ACHIVEMENT, GET_ACHIVEMENT_SUCCESS, CLEAR_LEADERBOARD_DATA, GET_ALL_CERTIFICATES, GET_ALL_CERTIFICATES_SUCCESS
} from "../types";

export const getLeaderboardDetailes = (data) => {
  return {
    type: LEADERBOARD_DATA,
    payload: data,
  };
};
export const clearLeaderboardDetailes = () => {
  return {
    type: CLEAR_LEADERBOARD_DATA,
  };
};
export const getLeaderboardDetailesSuccess = (obj) => {
  return {
    type: GET_LEADERBOARD_DETAILES_SUCCESS,
    payload: obj,
  };
};


export const getLeaderboardTaskList = data => {
  return {
    type: LEADERBOARD_TASK_LIST,
    payload: data,
  };
};

export const getLeaderboardTaskListSuccess = (obj) => {
  return {
    type: LEADERBOARD_TASK_LIST_SUCCESS,
    payload: obj,
  };
};
export const getAchivement = () => {
  return {
    type: GET_ACHIVEMENT,
  };
};

export const getAchivementSuccess = (obj) => {
  return {
    type: GET_ACHIVEMENT_SUCCESS,
    payload: obj,
  };
};
export const getAllCertificates = () => {
  return {
    type: GET_ALL_CERTIFICATES,
  };
};

export const getAllCertificatesSuccess = (obj) => {
  return {
    type: GET_ALL_CERTIFICATES_SUCCESS,
    payload: obj,
  };
};