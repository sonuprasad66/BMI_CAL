const express = require("express");
const calculatorRouter = express.Router();
const { userModel } = require("../Models/User.model");
const { calculatorModel } = require("../Models/Calculator.model");
const { authentication, authorization } = require("../Middleware/middleware");

calculatorRouter.get("/getProfile", authentication, async (req, res) => {
  const { user_id } = req.body;
  const user = await userModel.findOne({ _id: user_id });
  const { name, email } = user;
  res.send({ name, email });
});

calculatorRouter.post("/calculateBMI", authentication, async (req, res) => {
  const { height, weight, user_id } = req.body;
  const height_in_metre = Number(height) * 0.3048;
  const BMI = Number(weight) / height_in_metre ** 2;
  const new_bmi = new calculatorModel({
    BMI: BMI,
    height: height_in_metre,
    weight: weight,
    user_id: user_id,
  });
  await new_bmi.save();
  res.send({ BMI });
});

calculatorRouter.get("/usreHistory", authentication, async (req, res) => {
  const { user_id } = req.body;
  const user_history = await calculatorModel.find({ user_id: user_id });
  res.send({ history: user_history });
});

module.exports = {
  calculatorRouter,
};
