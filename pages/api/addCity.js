// add City server
//THIS IS API/REGISTER Update REQ.BODY
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log("##THIS IS ADD CITY REQ.BODY", req.body);
  switch (method) {
    case "POST":
      try {
        console.log(req.body)
        Candidate.update({candidate_email:req.body.candidate_email},{candidate_city: req.body.candidate_city})
        res.status(200)
      } catch (error) {
        res.status(400).json({ message: "Oops,Add City failed" });
      }
      break;
  }
};
