// const util = require("util");
// const exec = util.promisify(require("child_process").exec);
const { exec } = require("child_process");
import TestResult from "../../models/TestResult";

export default async (req, res) => {
  const { method } = req;
  console.log(method);
  switch (method) {
    // case "POST":
    //   try {
    //     // async function testExec() {
    //     console.log("trying to post");

    //     const { stdout, stderr } = await exec("yarn test");
    //     console.log(stderr);
    //     // res.status(200).json({ data: stderr });
    //     res.status(200).json({ message: "success" });
    //     // }
    //     // testExec();
    //   } catch (error) {
    //     console.log("error caught");
    //     res.status(400).json({ message: "Failure" });
    //   }
    //   break;

    case "POST":
      try {
        console.log(req.body, "Code in API Folder");
        let result;
        exec("yarn test", async (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            result = await stderr;

            console.log(`stderr: ${stderr}`);
          }
          console.log(`stdout: ${stdout}`);
          await res.status(200).send({ data: result });
        });

        //   exec("yarn test", async (error, stdout, stderr) => {
        //     if (error) {
        //       console.log(`error: ${error.message}`);
        //       return;
        //     }
        //     if (stderr) {
        //       req.body.testResult = stderr;
        //       console.log(req.body);
        //       let testResult = await TestResult.create(req.body);
        //       res.status(201).json({ data: testResult });
        //     }
        //   });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      try {
        // console.log(req.body, "Code in API Folder");
        const codeTests = await TestResult.find({});
        res.status(200).json({ data: codeTests });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
