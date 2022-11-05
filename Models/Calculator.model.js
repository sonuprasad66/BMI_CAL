const mongoose = require("mongoose");

const calculatorSchema = mongoose.Schema(
  {
    BMI: { type: Number, require: true },
    height: { type: String, require: true },
    weight: { type: String, require: true },
    user_id: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const calculatorModel = mongoose.model("bmi", calculatorSchema);

module.exports = {
  calculatorModel,
};
