//Save candidate codes and duration when they click the 'submit results' button in appl/Sandbox

import dbConnect from "../../utils/dbConnect";
import Candidate from "../../models/Candidate";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const testResult = {
          coding_test_codes: req.body.codes,
          coding_test_duration: req.body.test_duration,
        };
        const candidate = await Candidate.findById(req.body.id);
        candidate.coding_tests[req.body.test_mode].push(testResult);
        await candidate.save();
        console.log("/api/testSaver CANDIDATE CODE HAS BEEN SAVED", testResult);
        res.json(candidate);
      } catch (error) {
        res.status(400).json({
          message: "There is error when saving candidate codes into DB",
        });
      }
      break;
  }
};
