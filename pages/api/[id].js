// This is for appl info
// for company to jump into specific candidate
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");
import { verify } from "jsonwebtoken";

dbConnect();

export const authenticated = (fn) => async (req, res) => {
  verify(req.headers.token, process.env.SECRET_TOKEN, async function (
    err,
    decoded
  ) {
    if (!err && decoded) {
      console.log("### DECODED ###", decoded);
      if (req.query.id === decoded.sub || decoded.company_sub) {
        return await fn(req, res);
      } else {
        res.status(401).json({ message: "Sorry you are not authenticated." });
      }
    }
  });
};

export default authenticated(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const candidate = await Candidate.findById(req.query.id);
        res.status(200).json({ data: candidate });
      } catch (error) {
        res.status(400).json({ message: "error when finding candidate" });
      }
      break;
  }
});
