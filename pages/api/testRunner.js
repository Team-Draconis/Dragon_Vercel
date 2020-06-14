//1, to run the test and send the data back to browser without sending to db=> test button
//2, if submit button sent the test result to db,  => submit button

const { exec } = require("child_process");
import dbConnect from "../../utils/dbConnect";
import {execute} from '@yarnpkg/shell';
import * as upath from 'upath';
const fs = require("fs");
import Candidate from "../../models/Candidate";

let tmpdir = require('os').tmpdir()
tmpdir = upath.toUnix(tmpdir)
console.log(tmpdir)
 
dbConnect();

export default async (req, res) => {
  const { method } = req;
  console.log(req.body);
  switch (method) {
    case "POST":
      try {
        fs.writeFileSync(
<<<<<<< HEAD
          `${tmpdir}/tester.js`,
          `import React from 'react'; ${req.body.testResult} export default Codes`
        );
        let result;
        console.log('###################',tmpdir)
        execute(`yarn test --json --outputFile="${tmpdir}/output.txt"`)
        let test = fs.readFileSync(`${tmpdir}/output.txt`, {encoding:'utf8', flag:'r'})
        console.log(test,"@@@@@@@@@@@@@@@@@@@@@")
=======
          "./codes_file.js",
          `import React from 'react'; ${req.body.codes} export default Codes`
        );
>>>>>>> 2bef7ac814db030d28384512b22da26c0efff8d5
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
<<<<<<< HEAD

          await res.status(200).send({ data: test });
=======
>>>>>>> 2bef7ac814db030d28384512b22da26c0efff8d5
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
