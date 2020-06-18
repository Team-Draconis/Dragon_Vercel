//For candidate register

import { hash } from "bcrypt";
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        hash(req.body.candidate_password, 10, async function (err, hash) {
          req.body.candidate_password = hash;
          const newCandidate = await Candidate.create(req.body);
          res.status(200).json({ id: newCandidate._id });
        });
      } catch (error) {
        res.status(400).json({ message: "Oops,Sign Up failed" });
      }
      break;
  }
};
