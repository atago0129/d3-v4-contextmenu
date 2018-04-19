import {ContextMenuGroup} from "./ContextMenuGroup";
import {ContextMenuItem} from "./ContextMenuItem";
import {ContextMenu} from "./ContextMenu";

export class ContextMenuFactory {
  svg;

  itemIdIndex = 0;
  groupIdIndex = 0;

  /**
   * @param {d3.selection} svg
   */
  constructor(svg) {
    this.svg = svg;
  }

  /**
   * @param {object[]} dataSets
   * @returns {ContextMenu}
   */
  factory(dataSets) {
    return new ContextMenu(this.svg, this.parseList(dataSets));
  }

  /**
   * @param {object[]} dataSetList
   * @returns {ContextMenuGroup}
   */
  parseList(dataSetList) {
    let items = [];

    this.groupIdIndex++;
    let groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

    dataSetList.map((dataSet) => {
      this.itemIdIndex++;
      let itemId = 'd3_v4_context_menu_item_' + this.itemIdIndex;
      if (!dataSet.hasOwnProperty('label') || (!dataSet.hasOwnProperty('onClick') && !dataSet.hasOwnProperty('items'))) {
        throw new Error('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
      }
      let label = dataSet.label;
      items.push(new ContextMenuItem(
        itemId,
        label,
        dataSet.hasOwnProperty('onClick') ? dataSet.onClick : null,
        (dataSet.hasOwnProperty('items') && Array.isArray(dataSet.items)) ? this.parseList(dataSet.items) : null)
      );
    });
    return new ContextMenuGroup(groupId, items);
  }
}
