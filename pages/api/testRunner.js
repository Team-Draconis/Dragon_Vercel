const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function takeOutStderr() {
  const { stdout, stderr } = await exec("yarn test");
  const info = stderr;
  return info;
}

export default async (req, res) => {
  const { method } = req;
  console.log(method);
  switch (method) {
    case "POST":
      try {
        // async function testExec() {
        console.log("trying to post");

        // const { stdout, stderr } = await exec("yarn test");
        // console.log(typeof stderr);
        // res.status(200).json({ data: stderr });
        res.status(200).json({ message: success });
        // }
        // testExec();
      } catch (error) {
        console.log("error caught");
        res.status(400).json({ message: "Failure" });
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
    case "VIEW":
      try {
        let result = await takeOutStderr();
        res.status(200).json({ data: result });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
