const { exec } = require("child_process");
import TestResult from "../../models/TestResult";
import dbConnect from "../../utils/dbConnect";
import {execute} from '@yarnpkg/shell';
const tmpdir = require('os').tmpdir()
console.log(tmpdir)
const fs = require("fs");

dbConnect();

export default async (req, res) => {
  const { method } = req;
<<<<<<< HEAD

  console.log(method);
=======
>>>>>>> d0837cfcfaa1cf5664a9b7e1f038a1ed78daa166
  switch (method) {
    case "POST":
      try {
        fs.writeFileSync(
          `${tmpdir}/tester.js`,
          `import React from 'react'; ${req.body.testResult} export default Codes`
        );
        let result;
        execute(`yarn test --json --outputFile="./output.txt"`)
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
