function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as d3 from "d3";

export var ContextMenuList = function () {
  function ContextMenuList(svg, id, items) {
    _classCallCheck(this, ContextMenuList);

    this.items = [];

    this.svg = svg;
    this.id = id;
    this.items = items;
  }

  /** {@ContextMenuItem[]} */


  ContextMenuList.prototype.show = function show(x, y) {
    this.svg.append('g').attr('class', 'context-menu').attr('id', this.id);
    var contextMenu = d3.select(this.id).selectAll('rect').data(this.items);
    var contextItems = contextMenu.enter().append('g').attr('class', 'menu-entry');
    contextItems.style('cursor', 'pointer');

    var width = d3.max(this.items.map(function (item) {
      return item.width;
    }));

    contextItems.append('rect').style('fill', 'rgb(250, 250, 250').on('mouseover', function (item) {
      item.onMouseover();
    }).on('mouseout', function (item) {
      item.onMouseout();
    }).on('click', function (item) {
      item.onClick();
    }).attr('x', x).attr('y', function (item, i) {
      return y + i * item.height;
    }).attr('width', width).attr('height', function (item) {
      return item.height;
    });
    contextItems.append('text').text(function (item) {
      return item.getLabel();
    }).attr("class", "dummy-menu-label").style("fill", "rgb").style("font-size", 11).on("click", function (item) {
      item.onClick();
    }).attr('x', x).attr('y', function (item, i) {
      return y + i * item.height;
    }).attr('dy', function (item, i) {
      return item.height;
    }).attr('dx', width * 0.05);
  };

  return ContextMenuList;
}();