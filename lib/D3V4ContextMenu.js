function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as d3 from "d3";
import { ContextMenuFactory } from "./ContextMenuFactory";

export var D3V4ContextMenu = function () {

  /**
   *
   * @param {d3.selection} svg
   * @param {object[]} dataSets
   */
  function D3V4ContextMenu(svg, dataSets) {
    _classCallCheck(this, D3V4ContextMenu);

    var factory = new ContextMenuFactory(svg);
    this.contextMenu = factory.factory(dataSets);
    d3.select('body').on('click', function () {
      d3.selectAll('.context-menu').remove();
    });
  }

  /**
   * show the original context menu.
   * @param {number} x
   * @param {number} y
   */


  D3V4ContextMenu.prototype.show = function show(x, y) {
    this.contextMenu.show(x, y);
  };

  return D3V4ContextMenu;
}();