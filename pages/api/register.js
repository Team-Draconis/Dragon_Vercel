//For candidate register

import { hash } from "bcrypt";
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");
import { sign } from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        hash(req.body.candidate_password, 10, async function (err, hash) {
          req.body.candidate_password = hash;
          const newCandidate = await Candidate.create(req.body);
          const claims = { sub: newCandidate._id };
          const jwt = sign(claims, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          res
            .status(200)
            .json({ authToken: jwt, candidateID: newCandidate._id });
        });
      } catch (error) {
        res.status(400).json({ message: "Oops,Sign Up failed" });
      }
      break;
  }
};
