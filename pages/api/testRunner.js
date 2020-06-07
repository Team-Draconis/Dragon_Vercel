const util = require("util");
const exec = util.promisify(require("child_process").exec);

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // async function testExec() {
        const { stdout, stderr } = await exec("yarn test");
        res.status(200).json({ data: stderr });
        // }
        // testExec();
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
