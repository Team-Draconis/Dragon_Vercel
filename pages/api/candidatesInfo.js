//This is for company to view all the candidates list. at comp/dash

import dbConnect from "../../utils/dbConnect";
import Candidate from "../../models/Candidate";
import { verify } from "jsonwebtoken";

dbConnect();

// export const authenticated = (fn) => async (req, res) => {
//   // invalid token
//   verify(req.cookies.auth, process.env.SECRET_TOKEN, async function (
//     err,
//     decoded
//   ) {
//     if (!err && decoded) {
//       return await fn(req, res);
//     }
//     res.status(401).json({ message: "Sorry you are not authenticated." });
//   });

// };

// export default authenticated(async (req, res) => {
//   const { method } = req;
//   console.log(method);
//   switch (method) {
//     case "GET":
//       const candidate = await Candidate.find({});
//       res.json(candidate);
//   }
// });

export default async (req, res) => {
  const { method } = req;
  console.log(method);
  switch (method) {
    case "GET":
      console.log("in api");
      const candidate = await Candidate.find({});
      res.json({ data: candidate });
  }
};
