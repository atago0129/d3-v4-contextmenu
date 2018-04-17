function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as d3 from "d3";
import { ContextMenuList } from "./ContextMenuList";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenu } from "./ContextMenu";

export var ContextMenuFactory = function () {
  function ContextMenuFactory(svg) {
    _classCallCheck(this, ContextMenuFactory);

    this.listIdIndex = 0;

    this.svg = svg;
  }

  /**
   * @param {object[]} dataSets
   * @returns {ContextMenu}
   */


  ContextMenuFactory.prototype.factory = function factory(dataSets) {
    return new ContextMenu(this.svg, this.parseList(dataSets));
  };

  /**
   * @param {object[]} dataSetList
   * @returns {ContextMenuList}
   */


  ContextMenuFactory.prototype.parseList = function parseList(dataSetList) {
    var items = [];
    for (var dataSet in dataSetList) {
      if (!dataSet.hasOwnProperty('label')) {
        console.log('Skip!! ' + JSON.stringify(dataSet) + ' has not a label.');
        continue;
      }
      var label = dataSet.label;
      var labelSize = this.calculateLabelSize(label);
      var item = null;
      if (!dataSet.hasOwnProperty('items') && dataSet.hasOwnProperty('cb')) {
        item = new ContextMenuItem(label, labelSize.width, labelSize.height, dataSet.cb, null);
      } else if (dataSet.hasOwnProperty('items') && !dataSet.hasOwnProperty('cb')) {
        item = new ContextMenuItem(label, labelSize.width, labelSize.height, null, this.parseList(dataSet.items));
      } else {
        console.log('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
        continue;
      }
      items.push(item);
    }
    this.listIdIndex++;
    return new ContextMenuList(this.svg, 'd3_v4_context_menu_' + this.listIdIndex, items);
  };

  ContextMenuFactory.prototype.calculateLabelSize = function calculateLabelSize(label) {
    this.svg.append('g').attr('class', 'd3-v4-dummy');
    var dummy = d3.select('.d3-v4-dummy').selectAll('rect').append('g');
    dummy.append('text').text(label).style('font-size', 11);
    var width = dummy.getBBox().width;
    var height = dummy.getBBox().height;
    d3.selectAll('d3-v4-dummy').remove();
    return {
      width: width,
      height: height
    };
  };

  return ContextMenuFactory;
}();
