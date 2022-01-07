/* eslint-disable max-lines */
import * as actionTypes from '../actionTypes';

export const AuthModalStart = () => ({
  type: actionTypes.AUTHMODAL_START,
});

export const AuthModalSuccess = ({
  showModal,
}) => ({
  type: actionTypes.AUTHMODAL_SUCCESS,
  showModal,
});

const handleSetAuthModal = (showModal, dispatch) => {
  localStorage.setItem('showModal', showModal);
  dispatch(
    AuthModalSuccess({
      showModal,
    }),
  );
};

const changeAuthModal = (showModal) => (dispatch) => {
  dispatch(AuthModalStart());
  handleSetAuthModal(showModal, dispatch);
};

export default changeAuthModal;
