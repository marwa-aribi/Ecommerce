import {
  ESTIMATE_PRICE,
  ESTIMATE_PRICE_FAIL,
  ESTIMATE_PRICE_SUCCESS,
} from "../constants/userConstants";

export const priceEstimaterReducer = (state = {}, action) => {
  switch (action.type) {
    case ESTIMATE_PRICE:
      return { loading: true };
    case ESTIMATE_PRICE_SUCCESS:
      return { price: action.payload, loading: false };
    case ESTIMATE_PRICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
