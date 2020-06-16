//this is for condidates login page to check their password and email are matched
//issue token and cookies
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
// const cookie = require("cookie");
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const candidate = await Candidate.findOne({
          candidate_email: req.body.candidate_email,
        });
        compare(
          req.body.candidate_password,
          candidate.candidate_password,
          function (err, result) {
            if (!err && result) {
              console.log("#### CANDIDATE EMAIL AND PW ARE MATCHED ####");
              const claims = { sub: candidate._id };
              const jwt = sign(claims, process.env.SECRET_TOKEN, {
                expiresIn: "1h",
              });
              // res.setHeader(
              //   "Set-Cookie",
              //   cookie.serialize(process.env.SECRET_CANDIDATE, jwt, {
              //     httpOnly: true,
              //     secure: process.env.NODE_ENV !== "development",
              //     sameSite: "strict",
              //     maxAge: 3600,
              //     path: "/",
              //   })
              // );
              res
                .status(200)
                .json({ authToken: jwt, candidateID: candidate._id });
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
