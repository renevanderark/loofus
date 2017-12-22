const jsCanvas = require("./svg2can/jscanvas").jsCanvas;
const xcanvas = new jsCanvas ('jscanvastest', 100, 200);

module.exports = function(content) {
    var callback = this.async();
    this.cacheable(true);
    xcanvas.compile(content, function() {
      callback(null, xcanvas.toString());
    });
};
