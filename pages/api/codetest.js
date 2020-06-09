import dbConnect from "../../utils/dbConnect";
import CodingTest from "../../models/CodingTest";
const { exec } = require("child_process");
dbConnect();

// for register
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const codeTest = await CodingTest.find({});
        res.status(200).json({ data: codeTest });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        console.log(
          "####REQ BODY WHEN POST CODES Before excute commands",
          req.body
        );
        exec("yarn test", async (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            req.body.testResult = stderr;
            console.log("####REQ BODY WHEN POST CODES", req.body);
            let codeTest = await CodingTest.create(req.body);
            res.status(201).json({ data: codeTest });
          }
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
