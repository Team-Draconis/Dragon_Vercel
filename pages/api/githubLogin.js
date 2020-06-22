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
        const candidate = await Candidate.findOne({
          candidate_email: req.body.candidate_email,
        });

        console.log(req.body, "<--- REQ.BODY");

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
