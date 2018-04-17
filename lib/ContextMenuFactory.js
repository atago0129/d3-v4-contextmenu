function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { ContextMenuGroup } from "./ContextMenuGroup";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenu } from "./ContextMenu";

export var ContextMenuFactory = function () {

  /**
   * @param {d3.selection} svg
   */
  function ContextMenuFactory(svg) {
    _classCallCheck(this, ContextMenuFactory);

    this.itemIdIndex = 0;
    this.groupIdIndex = 0;

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
   * @returns {ContextMenuGroup}
   */


  ContextMenuFactory.prototype.parseList = function parseList(dataSetList) {
    var _this = this;

    var items = [];

    this.groupIdIndex++;
    var groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

    dataSetList.map(function (dataSet) {
      _this.itemIdIndex++;
      var itemId = 'd3_v4_context_menu_item_' + _this.groupIdIndex;
      if (!dataSet.hasOwnProperty('label') || !dataSet.hasOwnProperty('onClick') && !dataSet.hasOwnProperty('items')) {
        console.log('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
        return;
      }
      var label = dataSet.label;
      items.push(new ContextMenuItem(itemId, label, dataSet.hasOwnProperty('onClick') ? dataSet.onClick : null, dataSet.hasOwnProperty('items') ? _this.parseList(dataSet.items) : null));
    });
    return new ContextMenuGroup(groupId, items);
  };

  return ContextMenuFactory;
}();