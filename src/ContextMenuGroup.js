export class ContextMenuGroup {

  /** {string} */
  id;

  /** {string} */
  parentItemId;

  /** {number} */
  nestedIndex;

  /**
   * @param {string} id
   * @param {string|null} parentItemId
   * @param {number} nestedIndex
   */
  constructor(id, parentItemId, nestedIndex) {
    this.id = id;
    this.parentItemId = parentItemId;
    this.nestedIndex = nestedIndex;
  }

  /**
   * @param {ContextMenuItem} item
   * @returns {boolean}
   */
  match(item) {
    return item.groupId === this.id;
  }
}
