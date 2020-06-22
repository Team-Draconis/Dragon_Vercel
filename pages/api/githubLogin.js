import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        console.log(req.body, "REQ BODY IN GITHUBLOGIN");

        let candidate;

        if(req.body.candidate_email) {
          candidate = await Candidate.findOne({
            candidate_email: req.body.candidate_email,
          });
        } else {
          console.log(req.body.candidate_githubId, "WITHIN ELSE STATEMENT REQ BODY GITHUB ID");
          candidate = await Candidate.findOne({
            candidate_githubId: req.body.candidate_githubId,
          });
          console.log("IDENTIFIED WITH GITHUB ID");
        }

        console.log(candidate, "<--- CANDIDATE");

        candidate.last_login = req.body.loginTime;
        // candidate.password = req.body.candidate_password;
        await candidate.save();

        const claims = { sub: candidate._id, githubToken: req.body.candidate_github_token };
        const jwt = sign(claims, process.env.SECRET_TOKEN, {
                   expiresIn: "1h",
              });
              console.log(jwt)
              res
                .status(200)
                .json({ authToken: jwt, candidateID: candidate._id, githubToken: req.body.candidate_github_token });
            } catch (error) {
        res.status(400).json({ message: 'error when finding the candidate in Github login' });
      }
      break;
  }
};
