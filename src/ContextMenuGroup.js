export class ContextMenuGroup {

  /** {string} */
  id;

  /** {ContextMenuItem[]} */
  items = [];

  /**
   * @param {string} id
   * @param {ContextMenuItem[]} items
   */
  constructor(id, items) {
    this.id = id;
    this.items = items;
  }
}
