/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utils/utitlity';

// checkAuthModal reducer body
const checkAuthModalStart = (state, action) => updateObject(state, { showModal: null });

const checkAuthModalSuccess = (state, action) => updateObject(state, {
  showModal: action.showModal,
});

const checkAuthModal = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTHMODAL_START: return checkAuthModalStart(state, action);
    case actionTypes.AUTHMODAL_SUCCESS: return checkAuthModalSuccess(state, action);
    default: return state;
  }
};

export default checkAuthModal;
