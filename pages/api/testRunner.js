const util = require("util");
const exec = util.promisify(require("child_process").exec);
// const { exec } = require("child_process");

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
        await exec("yarn test", (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            result = `${stderr}`;
            console.log(`stderr: ${stderr}`);
          }
          console.log(`stdout: ${stdout}`);
          res.status(200).json({ data: result });
        });

        // res.status(200).json({ data: "message" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      try {
        console.log(req.body, "Code in API Folder");
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
