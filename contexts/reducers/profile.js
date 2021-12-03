import {
    UPDATE_PROFILE_LOADING,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    GET_PROFILE
  } from "../actions/actionTypes";

  // profile reducer body
  
 export const profile = (state, { payload, type }) => {
    switch (type) {
      case UPDATE_PROFILE_LOADING:
        return {
          ...state,
          profile: {
            ...state.profile,
            profileError: false,
            profileLoading: true,
            profileIsUpdated: true,
          },
        };
  
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          profile: {
            ...state.profile,
            profileError: false,
            profileLoading: false,
            profileData: payload,
            profileIsUpdated: true,
          },
        };
  
      case UPDATE_PROFILE_ERROR:
        return {
          ...state,
          profile: {
            ...state.profile,
            profileError: true,
            profileLoading: false,
            profileData: payload,
          },
        };
      case GET_PROFILE:
        return {
          ...state,
          profile: {
            ...state.profile,
            profileError: false,
            profileLoading: true,
            profileData: payload,
          },
        };
      default:
        return state;
    }
  };
  

  