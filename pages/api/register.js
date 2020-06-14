// candidate register server
//THIS IS API/REGISTER POST REQ.BODY
//for redirect to candidates own dashboard after register.
import { hash } from "bcrypt";
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log("##THIS IS API/REGISTER POST REQ.BODY", req.body);
  switch (method) {
    case "POST":
      try {
        hash(req.body.candidate_password, 10, async function (err, hash) {
          req.body.candidate_password = hash;
          const newCandidate = await Candidate.create(req.body);
          console.log("##THIS IS CANDIDATE REGISTERED IN DB", newCandidate);
          res.status(200).json({ id: newCandidate._id });
        });
      } catch (error) {
        res.status(400).json({ message: "Oops,Sigh Up failed" });
      }
      break;
  }
};
