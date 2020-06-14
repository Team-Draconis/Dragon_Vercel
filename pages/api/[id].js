// This is for appl info
// for company to jump into specific candidate
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log(req.query.id);
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
};
