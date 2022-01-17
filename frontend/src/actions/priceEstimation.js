import Axios from "axios";
import {
  ESTIMATE_PRICE,
  ESTIMATE_PRICE_FAIL,
  ESTIMATE_PRICE_SUCCESS,
} from "../constants/userConstants";

export const predictPrice =
  (company, car_models, year, fuel_type, kilo_driven) => async (dispatch) => {
    dispatch({
      type: ESTIMATE_PRICE,
      payload: { company, car_models, year, fuel_type, kilo_driven },
    });
    try {
      const { data } = await Axios.post("/api/estimate", {
        company,
        car_models,
        year,
        fuel_type,
        kilo_driven,
      });
      dispatch({ type: ESTIMATE_PRICE_SUCCESS, payload: data.body });
      localStorage.setItem("car_price", JSON.stringify(data.body));
    } catch (error) {
      dispatch({
        type: ESTIMATE_PRICE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
