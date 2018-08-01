export class ContextMenu {
  /** {*} */
  d;

  /** {number} */
  i;

  /** {HTMLElement} */
  elm;

  /** {ContextMenuGroup[]} */
  _groups = [];

  /** {ContextMenuItem[]} */
  _items = [];

  /**
   * @param {*} d
   * @param {number} i
   * @param {HTMLElement} elm
   */
  constructor(d, i, elm) {
    this.d = d;
    this.i = i;
    this.elm = elm;
  }

  /**
   * @param {ContextMenuGroup} group
   */
  pushGroup(group) {
    this._groups.push(group);
  }

  /**
   * @param {ContextMenuItem} item
   */
  pushItem(item) {
    this._items.push(item);
  }

  /**
   * @returns {ContextMenuGroup}
   */
  getRootGroup() {
    return this.getGroupsByNestedIndex(0).pop();
  }

  /**
   * @param {string} id
   * @returns {ContextMenuGroup}
   */
  getGroupById(id) {
    return (
      this._groups
        .filter(function(group) {
          return group.id === id;
        })
        .pop() || null
    );
  }

  /**
   * @param {ContextMenuItem} item
   * @returns {ContextMenuGroup}
   */
  getGroupByParentItem(item) {
    return (
      this._groups
        .filter(function (group) {
          return group.parentItemId === item.id;
        })
        .pop() || null
    );
  }

  /**
   * @param {number} index
   * @returns {ContextMenuGroup[]}
   */
  getGroupsByNestedIndex(index) {
    return this._groups.filter(function (group) {
      return group.nestedIndex === index;
    });
  }

  /**
   * @param {ContextMenuGroup} group
   * @returns {ContextMenuItem[]}
   */
  getItemsByGroup(group) {
    return this._items.filter(function (item) {
      return group.match(item);
    });
  }

}
