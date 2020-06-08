// const util = require("util");
// const exec = util.promisify(require("child_process").exec);
const { exec } = require("child_process");
import TestResult from "../../models/TestResult";
import dbConnect from "../../utils/dbConnect";

dbConnect();

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
<<<<<<< HEAD
        let result;
        exec("yarn test", async (error, stdout, stderr) => {
=======
        console.log(req.body, "Code in API Folder");
        // let result;
        exec("yarn test", (error, stdout, stderr) => {
>>>>>>> 909bbd403faa2ee68f1934e759c9f157d5959411
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            result = await stderr;

            console.log(`stderr: ${stderr}`);
          }
          console.log(`stdout: ${stdout}`);
<<<<<<< HEAD
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
=======
          res.status(200).json({ data: "message" });
          // result = stdout;
        });
        
        // res.status(200).json({ data: result });
>>>>>>> 909bbd403faa2ee68f1934e759c9f157d5959411
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      try {
<<<<<<< HEAD
        const testResults = await TestResult.find()
          .limit(1)
          .sort({ $natural: -1 });
        res.status(200).json({ data: testResults });
=======
        console.log(req.body, "Code in API Folder");
        res.status(200).json({ success: true });
>>>>>>> 909bbd403faa2ee68f1934e759c9f157d5959411
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
