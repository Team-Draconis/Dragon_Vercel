const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
  },
  company_password: {
    type: String,
    required: [true, "Password is required"],
  },
  company_bio: {
    type: String,
  },
});
module.exports =
  mongoose.models.Company || mongoose.model("Company", CompanySchema);
