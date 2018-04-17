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
  }

  /**
   * show the original context menu.
   * @param {number} x
   * @param {number} y
   */


  D3V4ContextMenu.prototype.show = function show(x, y) {
    this.contextMenu.show();
    // d3.select(".context-menu").remove();
    //
    // svg.append("g").attr("class", "context-menu");
    // let contextMenu = d3.select(".context-menu").selectAll("rect").data(this.menuItems);
    // let contextItems = contextMenu.enter().append("g").attr("class", "menu-entry");
    // contextItems.style("cursor", "pointer");
    // contextItems.on("mouseover", function(){
    //   d3.select(this).select('rect').style("fill", "rgb(200,200,200)");
    // });
    // contextItems.on("mouseout", function(){
    //   d3.select(this).select('rect')
    //     .style("fill", "rgb(250,250,250)")
    //     .style("stroke", "rgb(130,130,130)")
    //     .style("stroke-width", "1px");
    // });
    //
    // // calc size
    // contextItems.append("text")
    //   .text(function (d) {
    //     try {
    //       return d.label();
    //     } catch (e) {
    //       return String(d.label);
    //     }
    //   })
    //   .attr("class", "dummy-menu-label")
    //   .style("font-size", 11);
    // let dummy = svg.selectAll(".dummy-menu-label")
    //   .nodes()
    //   .map(function (x) {
    //     return x.getBBox();
    //   });
    // let width = d3.max(dummy.map(function (x) {
    //   return x.width;
    // }));
    // let margin = 0.05 * width;
    // width =  width + 2 * margin;
    // let height = d3.max(dummy.map(function (x) {
    //   return x.height + margin / 2;
    // }));
    // d3.selectAll(".dummy-menu-label").remove();
    //
    // // append and resize
    // contextItems.append("rect")
    //   .style("fill", "rgb(250,250,250)")
    //   .style("stroke", "rgb(130,130,130)")
    //   .style("stroke-width", "1px")
    //   .on("click", function (d) {d.cb();})
    //   .attr("x", x)
    //   .attr('y', function(d, i){return y + (i * height);})
    //   .attr('width', width)
    //   .attr('height', height);
    // contextItems.append("text")
    //   .text(function (d) {
    //     try {
    //       return d.label();
    //     } catch (e) {
    //       return String(d.label);
    //     }
    //   })
    //   .attr("class", "dummy-menu-label")
    //   .style("fill", "rgb")
    //   .style("font-size", 11)
    //   .on("click", function (d) {d.cb();})
    //   .attr('x', x)
    //   .attr('y', function(d, i){return y + (i * height); })
    //   .attr('dy', height - margin / 2)
    //   .attr('dx', margin);
    //
    // // remove handler
    // d3.select('body')
    //   .on('click', function() {
    //     d3.select('.context-menu').remove();
    //   });
  };

  return D3V4ContextMenu;
}();