//comp/dashboard

import dbConnect from "../../utils/dbConnect";
import Candidate from "../../models/Candidate";
import { verify } from "jsonwebtoken";

dbConnect();

export const authenticated = (fn) => async (req, res) => {
  verify(req.headers.token, process.env.SECRET_TOKEN, async function (
    err,
    decoded
  ) {
    // must have company token, candidate token could not get the data
    if (!err && decoded.company_sub) {
      return await fn(req, res);
    }
    res.status(401).json({ message: "Sorry you are not authenticated." });
  });
};

export default authenticated(async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const candidates = await Candidate.find({});
      res.json({ data: candidates });
  }
});
