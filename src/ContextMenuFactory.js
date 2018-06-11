import {ContextMenuGroup} from "./ContextMenuGroup";
import {ContextMenuItem} from "./ContextMenuItem";
import {ContextMenu} from "./ContextMenu";

export class ContextMenuFactory {

  itemIdIndex = 0;
  groupIdIndex = 0;

  /**
   * @param {object[]} dataSets
   * @returns {ContextMenu}
   */
  factory(dataSets) {
    return new ContextMenu(this.parseList(dataSets));
  }

  /**
   * @param {object[]|function} dataSetList
   * @returns {ContextMenuGroup}
   */
  parseList(dataSetList) {
    let items = [];

    this.groupIdIndex++;
    let groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

    try {
      dataSetList = dataSetList();
    } catch (e) {}

    dataSetList.map((dataSet) => {
      this.itemIdIndex++;
      let itemId = 'd3_v4_context_menu_item_' + this.itemIdIndex;
      const label = ContextMenuFactory.getLabel(dataSet);
      const onClick = ContextMenuFactory.getOnClick(dataSet);
      const children = ContextMenuFactory.getItems(dataSet);
      if (label === null || (onClick === null && children === null)) {
        throw new Error('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
      }
      items.push(new ContextMenuItem(
        itemId,
        label,
        onClick !== null ? onClick : null,
        children !== null ? this.parseList(children) : null
      ));
    });
    return new ContextMenuGroup(groupId, items);
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
  static getOnClick(dataSet) {
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
