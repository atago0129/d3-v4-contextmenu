function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var ContextMenuItem = function () {

  /**
   * @param {string} id
   * @param {string|function} label
   * @param {function} onClickHandler
   * @param {ContextMenuGroup} childGroup
   */
  function ContextMenuItem(id, label, onClickHandler, childGroup) {
    _classCallCheck(this, ContextMenuItem);

    this.defaultFill = 'rgb(250, 250, 250)';
    this.onMouseoverFill = 'rgb(200, 200, 200)';

    this.id = id;
    this.label = label;
    this.onClickHandler = onClickHandler;
    this.childGroup = childGroup;
  }

  /**
   * @returns {string}
   */


  ContextMenuItem.prototype.getLabel = function getLabel() {
    try {
      return String(this.label());
    } catch (e) {
      return String(this.label);
    }
  };

  ContextMenuItem.prototype.onClick = function onClick() {
    if (this.onClickHandler !== null) {
      this.onClickHandler();
    }
  };

  return ContextMenuItem;
}();