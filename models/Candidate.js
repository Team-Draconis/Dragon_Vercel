const mongoose = require("mongoose");
const moment = require("moment-timezone");
const dateJapan = moment.tz(Date.now(), "Asia/Tokyo");

const CandidateSchema = new mongoose.Schema({
  candidate_name: {
    type: String,
    required: [true, "Name is required"],
  },
  candidate_city: {
    type: [String],
    required: [true, "City is required"],
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
  last_login: String,
  quiz_tests: [
    {
      quiz_detail: String,
      quiz_score: Number,
      quiz_submitted_at: { type: Date, default: dateJapan },
    },
  ],

  coding_tests: {
    easy: [
      {
        coding_test_codes: String,
        coding_test_result: String,
        coding_test_submitted_at: { type: Date, default: dateJapan },
        coding_test_duration: String,
      },
    ],
    medium: [
      {
        coding_test_codes: String,
        coding_test_result: String,
        coding_test_submitted_at: { type: Date, default: dateJapan },
        coding_test_duration: String,
      },
    ],
    hard: [
      {
        coding_test_codes: String,
        coding_test_result: String,
        coding_test_submitted_at: { type: Date, default: dateJapan },
        coding_test_duration: String,
      },
    ],
  },
});

module.exports =
  mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);
