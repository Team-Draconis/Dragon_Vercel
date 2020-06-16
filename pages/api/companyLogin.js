//For company login, to check the pass and company's name match
//If matched, issume companytoken
import dbConnect from "../../utils/dbConnect";
const Company = require("../../models/Company");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const company = await Company.findOne({
          company_name: req.body.company_name,
        });
        compare(req.body.company_password, company.company_password, function (
          err,
          result
        ) {
          if (!err && result) {
            const claims = {
              company_sub: company._id,
            };
            const jwt = sign(claims, process.env.SECRET_TOKEN, {
              expiresIn: "1h",
            });
            res.status(200).json({ authToken: jwt });
          } else {
            res
              .status(400)
              .json({ message: "Please check your email or password" });
          }
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
