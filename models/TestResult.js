const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
  testResult: {
    type: String,
  },
});

module.exports =
  mongoose.models.TestResult || mongoose.model("TestResult", TestResultSchema);
