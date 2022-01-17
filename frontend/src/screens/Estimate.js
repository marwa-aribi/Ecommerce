import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { predictPrice } from "../actions/priceEstimation";
import { car_data } from "../car_data";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function Estimate(props) {
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel_type, setFuel] = useState("");
  const [kilo_driven, setDistance] = useState("");
  const [formError, setError] = useState(false);
  const dispatch = useDispatch();
  const EstimatedPrice = useSelector((state) => state.EstimatedPrice);
  const { price, loading, error } = EstimatedPrice;
  const carsData = car_data;
  const submitHandler = (e) => {
    e.preventDefault();
    if (formValidation()) {
      setError(false);
      dispatch(predictPrice(company, model, year, fuel_type, kilo_driven));
    } else {
      setError(true);
    }
  };
  function formValidation() {
    return (
      company !== "" &&
      model !== "" &&
      year !== "" &&
      fuel_type !== "" &&
      kilo_driven !== ""
    );
  }
  function setOptions(x) {
    return <option value={x}>{x}</option>;
  }
  function setCarOptions(x) {
    if (company !== "" && x.includes(company)) {
      return <option value={x}>{x}</option>;
    }
  }

  return (
    <div className="container">
      <div className="error-message">
        {(error || formError) && (
          <MessageBox variant="danger">Please check your inputs</MessageBox>
        )}
      </div>
      <h1>Car Price Estimation</h1>
      <div className="price_estimator">
        <form className="form" onSubmit={submitHandler}>
          <div className="formgroup">
            <label>Company</label>
            <select
              id="company"
              placeholder="Enter Car company"
              required
              onChange={(e) => setCompany(e.target.value)}
            >
              <option selected>Enter car company</option>
              {car_data.companies.map(setOptions)}
            </select>
          </div>
          <div className="formgroup">
            <label>Model</label>
            <select
              id="model"
              placeholder="Enter Car comapny"
              required
              onChange={(e) => setModel(e.target.value)}
            >
              <option selected>Select car model</option>
              {car_data.car_models.map(setCarOptions)}
            </select>
          </div>
          <div className="formgroup">
            <label>Year</label>
            <select
              id="year"
              placeholder="Enter Car Year"
              required
              onChange={(e) => setYear(e.target.value)}
            >
              <option selected>Select car year</option>
              {car_data.year.map(setOptions)}
            </select>
          </div>
          <div className="formgroup">
            <label>Fuel type</label>
            <select
              id="fuel_type"
              placeholder="Enter Car Fuel Type"
              required
              onChange={(e) => setFuel(e.target.value)}
            >
              <option selected>Select fuel type</option>
              {car_data.fuel_type.map(setOptions)}
            </select>
          </div>
          <div className="formgroup">
            <label>
              Enter the Number of Kilometres that the car has travelled
            </label>
            <input
              type="text"
              id="company"
              placeholder="Enter Car comapny"
              required
              onChange={(e) => setDistance(e.target.value)}
            ></input>
          </div>
          <button type="submit">Estimate</button>
        </form>
        <div className="price_value">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : (
            <div>{price?.price ? <h1>{price?.price} $</h1> : <h1>0 $</h1>}</div>
          )}
        </div>
      </div>
    </div>
  );
}
