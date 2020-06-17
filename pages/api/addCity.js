// add City server
//THIS IS API/REGISTER Update REQ.BODY
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await Candidate.update(
          { candidate_email: req.body.candidate_email },
          { $push: { candidate_city: req.body.candidate_city } }
        );
        res.status(200);
      } catch (error) {
        res.status(400).json({ message: "Oops,Add City failed" });
      }
      break;
  }
};
