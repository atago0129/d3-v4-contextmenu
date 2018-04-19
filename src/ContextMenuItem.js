export class ContextMenuItem {

  defaultFill = 'rgb(250, 250, 250)';

  onMouseoverFill = 'rgb(200, 200, 200)';

  id;

  label;

  onClickHandler;

  childGroup;

  /**
   * @param {string} id
   * @param {string|function} label
   * @param {function} onClickHandler
   * @param {ContextMenuGroup} childGroup
   */
  constructor(id, label, onClickHandler, childGroup) {
    this.id = id;
    this.label = label;
    this.onClickHandler = onClickHandler;
    this.childGroup = childGroup;
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
    if (this.onClickHandler !== null) {
      this.onClickHandler();
    }
  }
}
