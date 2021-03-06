import { UPDATE_DONATE_AMOUNT } from '../actions/actionTypes';

export default function donate(state, action) {
  switch (action.type) {
    case UPDATE_DONATE_AMOUNT:
      return action.amount;
    default:
      return state;
  }
}
