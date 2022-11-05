const express = require("express");
var jwt = require("jsonwebtoken");
const { userModel } = require("../Models/User.model");

const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.send({ msg: "Login Again" });
  } else {
    const decoded = jwt.verify(token, "abcd1234");
    const { user_id } = decoded;
    if (decoded) {
      req.body.user_id = user_id;
      next();
    } else {
      res.send({ msg: "Please Login Again" });
    }
  }
};

const authorization = async (req, res, next) => {
  // const { email } = req.body;
  // const user = await userModel.findOne({ email: email });
  // const role = user.role;
  // if (permittedrole.includes(role)) {
  //   next();
  // } else {
  //   res.send("Not Authorised");
  // }
};

module.exports = {
  authentication,
  authorization,
};
