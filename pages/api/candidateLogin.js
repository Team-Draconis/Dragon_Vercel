import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
const cookie = require("cookie");
dbConnect();

// Candidate Login
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
              console.log("successfully verified");

              const payload = { candidate: candidate._id };
              const jwt = sign(payload, "dragon", { expiresIn: "1h" });
              res.setHeader(
                "Set-Cookie",
                cookie.serialize("auth", jwt, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== "development",
                  sameSite: "strict",
                  maxAge: 3600,
                  path: "/",
                })
              );
              console.log("candidate info", candidate);
              res.status(200).json({ data: candidate });
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
