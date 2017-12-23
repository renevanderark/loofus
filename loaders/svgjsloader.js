const jsCanvas = require("./svg2can/jscanvas").jsCanvas;

module.exports = function(content) {
    const m = content.match(/viewBox=\"[0-9]+\s+[0-9]+\s+([0-9]+)\s+([0-9]+)\s*\"/);
    const xcanvas = new jsCanvas('svg-export', parseInt(m[1], 10), parseInt(m[2], 10));
    const callback = this.async();
    this.cacheable(true);
    xcanvas.compile(content, function() {
      callback(null, xcanvas.toString());
    });
};
