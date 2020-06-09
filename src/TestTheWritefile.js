const fs = require("fs");

fs.writeFileSync(
  "../pages/api/Codes.js",
  `Console.log('Hi'); export defalt Codes  `
);
console.log("File has been saved.");
