import express from "express";
import request from "request";
import expressAsyncHandler from "express-async-handler";
import { spawn } from "child_process";
import { StringDecoder } from "string_decoder";
const aICarPriceEstimation = express.Router();

aICarPriceEstimation.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    let url =
      process.env.NODE_ENV === "production"
        ? "https://carmatt-ai.herokuapp.com/predict"
        : "http://127.0.0.1:8080/predict";
    request.post(
      {
        url: url,
        body: req.body,
        json: true,
      },
      function (err, response, body) {
        res.send(response);
      }
    );
  })
);
export default aICarPriceEstimation;
