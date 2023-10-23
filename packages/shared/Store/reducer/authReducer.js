import { REQUEST_REGISTER, REQUEST_REGISTER_SUCCESS, REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, SET_USER_TOKEN, FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS } from "../types";

const INIT_STATE = {
  authErrors: {},
  loader: false,
  authUser: null,
  token: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REQUEST_LOGIN: {
      return {
        ...state,
        loader: true
      };
    }
    case REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.authUser
      };
    }
    case REQUEST_REGISTER: {
      return {
        ...state,
        loader: true
      };
    }
    case REQUEST_REGISTER_SUCCESS: {
      return {
        ...state,
        loader: false
      };
    }
    case SET_USER_TOKEN: {
      return {
        ...state,
        token: action.token
      };
    }
    // case FORGOT_PASSWORD: {
    //   return {
    //     ...state,
    //     loader: true
    //   };
    // }
    // case FORGOT_PASSWORD_SUCCESS: {
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // }
    default: {
      return state;
    }
  }
};
