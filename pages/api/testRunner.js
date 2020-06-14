const { exec } = require("child_process");
import TestResult from "../../models/TestResult";
import dbConnect from "../../utils/dbConnect";
import {execute} from '@yarnpkg/shell';
import * as upath from 'upath';
const fs = require("fs");

let tmpdir = require('os').tmpdir()
tmpdir = upath.toUnix(tmpdir)
console.log(tmpdir)
 
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        fs.writeFileSync(
          `${tmpdir}/tester.js`,
          `import React from 'react'; ${req.body.testResult} export default Codes`
        );
        let result;
        console.log('###################',tmpdir)
        execute(`yarn test --json --outputFile="${tmpdir}/output.txt"`)
        let test = fs.readFileSync(`${tmpdir}/output.txt`, {encoding:'utf8', flag:'r'})
        console.log(test,"@@@@@@@@@@@@@@@@@@@@@")
        exec("yarn test", async (error, command, stdout) => {
          if (error) {
            result = error;
          }

          if (stdout) {
            result = await stdout;
            console.log("The stdout is consoled", stdout);
          }

          await res.status(200).send({ data: test });
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
