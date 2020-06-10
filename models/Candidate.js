const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  candidate_name: {
    type: String,
  },
  candidate_city: {
    type: String,
  },
  candidate_email: {
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

module.exports =
  mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);
