// register company, currently needs postman to add new company
import { hash } from "bcrypt";
import dbConnect from "../../utils/dbConnect";
const Company = require("../../models/Company");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        hash(req.body.company_password, 10, async function (err, hash) {
          req.body.company_password = hash;
          const newCompany = await Company.create(req.body);
          res.status(200).json({ data: newCompany });
        });
      } catch (error) {
        res.status(400).json({ message: "Oops,Sigh Up failed" });
      }
      break;
  }
};
