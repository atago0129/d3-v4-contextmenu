export class ContextMenuItem {

  defaultFill = 'rgb(250, 250, 250)';

  onMouseoverFill = 'rgb(200, 200, 200)';

  id;

  groupId;

  label;

  action;

  /**
   * @param {string} id
   * @param {string} groupId
   * @param {string|function} label
   * @param {function} action
   */
  constructor(id, groupId, label, action) {
    this.id = id;
    this.groupId = groupId;
    this.label = label;
    this.action = action;
  }

  /**
   * @returns {string}
   */
  getLabel() {
    try {
      return String(this.label());
    } catch (e) {
      return String(this.label);
    }
  }

  onClick() {
    if (this.action !== null) {
      this.action();
    }
  }
}
