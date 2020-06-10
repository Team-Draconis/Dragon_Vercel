const { exec } = require("child_process");
import TestResult from "../../models/TestResult";
import dbConnect from "../../utils/dbConnect";
const fs = require("fs");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log(method,req.cookies  );
  switch (method) {
    case "POST":
      try {
        fs.writeFileSync(
          "./tester.js",
          `import React from 'react'; ${req.body.testResult} export default Codes`
        );
        let result;
        exec("yarn test", async (error, command, stdout) => {
          if (error) {
            result = error;
          }

          if (stdout) {
            result = await stdout;
            console.log("The stdout is consoled", stdout);
          }

          await res.status(200).send({ data: result });
        });

        // exec("yarn test", async (error, stdout, stderr) => {
        //   if (error) {
        //     console.log(`error: ${error.message}`);
        //     return;
        //   }
        //   if (stderr) {
        //     req.body.testResult = stderr;
        //     console.log(req.body);
        //     let testResult = await TestResult.create(req.body);
        //     res.status(201).json({ data: testResult });
        //   }
        // });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      try {
        const testResults = await TestResult.find()
          .limit(1)
          .sort({ $natural: -1 });
        res.status(200).json({ data: testResults });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
