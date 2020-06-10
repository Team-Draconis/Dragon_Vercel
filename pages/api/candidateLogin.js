import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

dbConnect();

// Candidate Login
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        console.log(req.body);
        const candidate = await Candidate.findOne({
          candidate_email: req.body.candidate_email,
        });
        console.log(candidate);
        compare(
          req.body.candidate_password,
          candidate.candidate_password,
          function (err, result) {
            if (!err && result) {
              console.log("successfully verified");

              const claims = { sub: candidate._id };
              const jwt = sign(claims, "dragon");
              res.status(200).json({ authToken: jwt });
            } else {
              res
                .status(400)
                .json({ message: "Please check your email or password" });
            }
          }
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
