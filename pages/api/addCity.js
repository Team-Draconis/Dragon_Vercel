// add City server
//THIS IS API/REGISTER POST REQ.BODY
import { hash } from "bcrypt";
import dbConnect from "../../utils/dbConnect";
const Candidate = require("../../models/Candidate");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log("##THIS IS ADD CITY REQ.BODY", req.body);
  switch (method) {
    case "POST":
      try {
        console.log(req.body)
       
      } catch (error) {
        res.status(400).json({ message: "Oops,Add City failed" });
      }
      break;
  }
};
