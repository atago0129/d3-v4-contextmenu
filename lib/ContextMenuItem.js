function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as d3 from "d3";

export var ContextMenuItem = function () {
  function ContextMenuItem(label, width, height, callback, list) {
    _classCallCheck(this, ContextMenuItem);

    this.label = label;
    this.width = width;
    this.height = height;
    this.callback = callback;
    this.list = list;
  }

  ContextMenuItem.prototype.onMouseover = function onMouseover() {
    d3.select(this).select('rect').style('fill', 'rgb(200, 200, 200)');
  };

  ContextMenuItem.prototype.onMouseout = function onMouseout() {
    d3.select(this).select('rect').style("fill", "rgb(250,250,250)");
  };

  ContextMenuItem.prototype.getLabel = function getLabel() {
    try {
      return this.label();
    } catch (e) {
      return String(this.label);
    }
  };

  ContextMenuItem.prototype.onClick = function onClick() {
    if (this.callback !== null) {
      this.callback();
    }
  };

  return ContextMenuItem;
}();