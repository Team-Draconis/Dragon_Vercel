const { exec } = require("child_process");
import dbConnect from "../../utils/dbConnect";
const fs = require("fs");
import Candidate from "../../models/Candidate";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log(req.body);
  switch (method) {
    case "POST":
      try {
        fs.writeFileSync(
          "./codes_file.js",
          `import React from 'react'; ${req.body.codes} export default Codes`
        );
        exec("yarn test", async (error, command, stdout) => {
          let result;
          if (error) {
            result = error;
          }
          if (req.body.id === undefined && stdout) {
            result = await stdout;
            await res.status(200).send({ data: result });
          }
          if (req.body.id !== undefined && stdout) {
            result = await stdout;
            const testResult = {
              coding_test_codes: req.body.codes,
              coding_test_result: result,
            };
            const candidate = await Candidate.findById(req.body.id);
            console.log(candidate);
            candidate.coding_tests[req.body.test_mode].push(testResult);
            await candidate.save();
            res.json(candidate);
          }
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
