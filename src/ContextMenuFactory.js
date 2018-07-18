import {ContextMenuGroup} from "./ContextMenuGroup";
import {ContextMenuItem} from "./ContextMenuItem";
import {ContextMenu} from "./ContextMenu";

export class ContextMenuFactory {

  contextMenu;

  itemIdIndex = 0;
  groupIdIndex = 0;

  /**
   * @param {object[]} dataSets
   * @returns {ContextMenu}
   */
  factory(dataSets) {
    this.contextMenu = new ContextMenu();
    this.parseList(null, dataSets, 0);
    return this.contextMenu;
  }

  /**
   * @param {null|string} parentItemId
   * @param {object[]|function} dataSetList
   * @param {number} nestedIndex
   * @returns {ContextMenuGroup}
   */
  parseList(parentItemId, dataSetList, nestedIndex) {
    let itemIds = [];

    this.groupIdIndex++;
    let groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

    try {
      dataSetList = dataSetList();
    } catch (e) {}

    this.contextMenu.pushGroup(new ContextMenuGroup(groupId, parentItemId, nestedIndex));

    dataSetList.map((dataSet) => {
      this.itemIdIndex++;
      let itemId = 'd3_v4_context_menu_item_' + this.itemIdIndex;
      const label = ContextMenuFactory.getLabel(dataSet);
      const action = ContextMenuFactory.getAction(dataSet);
      const children = ContextMenuFactory.getItems(dataSet);
      if (label === null || (action === null && children === null)) {
        throw new Error('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
      }
      itemIds.push(itemId);
      this.contextMenu.pushItem(new ContextMenuItem(
        itemId,
        groupId,
        label,
        action !== null ? action : null
      ));
      if (children !== null) {
        this.parseList(itemId, children, nestedIndex + 1);
      }
    });
  }

  /**
   * @param {object} dataSet
   * @returns {string|null}
   */
  static getLabel(dataSet) {
    if (dataSet.hasOwnProperty('label')) {
      if (typeof dataSet.label === 'function') {
        return String(dataSet.label());
      } else {
        return dataSet.label;
      }
    }
    return null;
  }

  /**
   * @param {object} dataSet
   * @returns {function|null}
   */
  static getAction(dataSet) {
    if (dataSet.hasOwnProperty('action')) {
      return dataSet.action;
    }
    // backward compatibility
    if (dataSet.hasOwnProperty('onClick')) {
      return dataSet.onClick;
    }
    return null;
  }

  /**
   * @param {object} dataSet
   * @returns {object[]|null}
   */
  static getItems(dataSet) {
    if (dataSet.hasOwnProperty('items')) {
      if (typeof dataSet.items === 'function') {
        return dataSet.items();
      } else {
        return dataSet.items;
      }
    }
    return null;
  }

}
