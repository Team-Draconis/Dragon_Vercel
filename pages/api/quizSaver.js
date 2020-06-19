//Save candidate quiz and score automatically when they finish the quiz test

import dbConnect from "../../utils/dbConnect";
import Candidate from "../../models/Candidate";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const testResult = {
          quiz_detail: "No Detail",
          quiz_score: req.body.score,
        };
        const candidate = await Candidate.findById(req.body.id);
        candidate.quiz_tests.push(testResult);
        await candidate.save();
        res.json(candidate);
      } catch (error) {
        res.status(400).json({
          message: "There is error when saving candidate quiz into DB",
        });
      }
      break;
  }
};
