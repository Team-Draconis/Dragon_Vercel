//For company login, to check the pass and company's name match
import dbConnect from "../../utils/dbConnect";
const Company = require("../../models/Company");
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
const cookie = require("cookie");
dbConnect();

// company Login
export default async (req, res) => {
  const { method } = req;
  console.log(process.env.SECRET_COMPANY);
  console.log(process.env.SECRET_TOKEN);
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
            const payload = { company: company._id };
            const jwt = sign(payload, process.env.SECRET_TOKEN, {
              expiresIn: "1h",
            });
            res.setHeader(
              "Set-Cookie",
              cookie.serialize(process.env.SECRET_COMPANY, jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "Strict",
                maxAge: 3600,
                path: "/",
              })
            );
            res.status(200).json({ data: company });
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
