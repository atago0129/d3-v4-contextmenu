function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as d3 from "d3";

export var ContextMenu = function () {

  /**
   * @constructor
   * @param {list} menuItems - list of label and callback map of menu
   */
  function ContextMenu(menuItems) {
    _classCallCheck(this, ContextMenu);

    this.menuItems = [];

    this.menuItems = menuItems;
  }

  /**
   * show the original context menu.
   * @param {d3.selection} svg
   * @param {number} x
   * @param {number} y
   */


  ContextMenu.prototype.show = function show(svg, x, y) {
    d3.select(".context-menu").remove();

    svg.append("g").attr("class", "context-menu");
    var contextMenu = d3.select(".context-menu").selectAll("rect").data(this.menuItems);
    var contextItems = contextMenu.enter().append("g").attr("class", "menu-entry");
    contextItems.style("cursor", "pointer");
    contextItems.on("mouseover", function () {
      d3.select(this).select('rect').style("fill", "rgb(200,200,200)");
    });
    contextItems.on("mouseout", function () {
      d3.select(this).select('rect').style("fill", "rgb(250,250,250)").style("stroke", "rgb(130,130,130)").style("stroke-width", "1px");
    });

    // calc size
    contextItems.append("text").text(function (d) {
      return d.label;
    }).attr("class", "dummy-menu-label").style("font-size", 11);
    var dummy = svg.selectAll(".dummy-menu-label").nodes().map(function (x) {
      return x.getBBox();
    });
    var width = d3.max(dummy.map(function (x) {
      return x.width;
    }));
    var margin = 0.05 * width;
    width = width + 2 * margin;
    var height = d3.max(dummy.map(function (x) {
      return x.height + margin / 2;
    }));
    d3.selectAll(".dummy-menu-label").remove();

    // append and resize
    contextItems.append("rect").style("fill", "rgb(250,250,250)").style("stroke", "rgb(130,130,130)").style("stroke-width", "1px").on("click", function (d) {
      d.cb();
    }).attr("x", x).attr('y', function (d, i) {
      return y + i * height;
    }).attr('width', width).attr('height', height);
    contextItems.append("text").text(function (d) {
      return d.label;
    }).attr("class", "dummy-menu-label").style("fill", "rgb").style("font-size", 11).on("click", function (d) {
      d.cb();
    }).attr('x', x).attr('y', function (d, i) {
      return y + i * height;
    }).attr('dy', height - margin / 2).attr('dx', margin);

    // remove handler
    d3.select('body').on('click', function () {
      d3.select('.context-menu').remove();
    });
  };

  return ContextMenu;
}();