export class ContextMenuList {

  id;

  /** {ContextMenuItem[]} */
  items = [];

  parentId;

  constructor(id, items, parentId) {
    this.id = id;
    this.items = items;
    this.parentId = parentId;
  }
}
