import {ContextMenuList} from "./ContextMenuList";
import {ContextMenuItem} from "./ContextMenuItem";
import {ContextMenu} from "./ContextMenu";

export class ContextMenuFactory {
  svg;

  itemIdIndex = 0;
  listIdIndex = 0;

  constructor(svg) {
    this.svg = svg;
  }

  /**
   * @param {object[]} dataSets
   * @returns {ContextMenu}
   */
  factory(dataSets) {
    return new ContextMenu(this.svg, this.parseList(dataSets, null));
  }

  /**
   * @param {object[]} dataSetList
   * @param {string|null} parentId
   * @returns {ContextMenuList}
   */
  parseList(dataSetList, parentId) {
    let items = [];

    this.listIdIndex++;
    let listId = 'd3_v4_context_menu_list_' + this.listIdIndex;

    dataSetList.map((dataSet) => {
      this.itemIdIndex++;
      let itemId = 'd3_v4_context_menu_item_' + this.listIdIndex;
      if (!dataSet.hasOwnProperty('label')) {
        console.log('Skip!! ' + JSON.stringify(dataSet) + ' has not a label.');
        return;
      }
      let label = dataSet.label;
      let item = null;
      if (!dataSet.hasOwnProperty('items') && dataSet.hasOwnProperty('cb')) {
        item = new ContextMenuItem(itemId, label, dataSet.cb, null);
      } else if (dataSet.hasOwnProperty('items') && !dataSet.hasOwnProperty('cb')) {
        item = new ContextMenuItem(itemId, label, null, this.parseList(dataSet.items, listId));
      } else {
        console.log('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
        return;
      }
      items.push(item);
    });
    return new ContextMenuList(listId, items, parentId);
  }
}
