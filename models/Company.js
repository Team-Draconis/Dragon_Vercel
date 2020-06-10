const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  candidate_password: {
    type: String,
    required: [true, "Password is required"],
  },
});

module.exports = mongoose.models.Company || mongoose.model("Company", Company);
