function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var ContextMenu = function () {

  /**
   * @param {d3.selection} svg
   * @param {ContextMenuList} itemList
   */
  function ContextMenu(svg, itemList) {
    _classCallCheck(this, ContextMenu);

    this.svg = svg;
    this.itemList = itemList;
  }

  /** {ContextMenuList} */


  ContextMenu.prototype.show = function show() {
    this.itemList.show();
  };

  return ContextMenu;
}();