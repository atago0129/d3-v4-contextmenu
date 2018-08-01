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
   * @param {*} d
   * @param {number} i
   * @param {HTMLElement} elm
   * @returns {string}
   */
  getLabel(d, i ,elm) {
    try {
      return String(this.label.bind(elm, d, i)());
    } catch (e) {
      return String(this.label);
    }
  }

  /**
   * @param {*} d
   * @param {number} i
   * @param {HTMLElement} elm
   */
  onClick(d, i, elm) {
    if (this.action !== null) {
      this.action.bind(elm, d, i)();
    }
  }
}
