const jsCanvas = require("./svg2can/jscanvas").jsCanvas;
const fs = require('fs');
const xcanvas = new jsCanvas ('jscanvastest', 100, 200);

xcanvas.compile(fs.readFileSync("./src/svg/test.svg", "utf8"), function() {
  console.log(xcanvas.toString())
})
