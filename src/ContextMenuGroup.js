export class ContextMenuGroup {

  id;

  /** {ContextMenuItem[]} */
  items = [];

  constructor(id, items) {
    this.id = id;
    this.items = items;
  }
}
