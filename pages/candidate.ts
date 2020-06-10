import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import dbConnect from "../utils/dbConnect";
import Candidate from "../models/Candidate";

dbConnect();

const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return await fn(req, res);
};

export default authenticated(async function getCandidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const candidate = await Candidate.find({});
  console.log(res);
  res.status(200).json(candidate);
});
