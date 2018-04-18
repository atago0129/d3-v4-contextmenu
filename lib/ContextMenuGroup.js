function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var ContextMenuGroup =

/**
 * @param {string} id
 * @param {ContextMenuItem[]} items
 */


/** {string} */
function ContextMenuGroup(id, items) {
  _classCallCheck(this, ContextMenuGroup);

  this.items = [];

  this.id = id;
  this.items = items;
}

/** {ContextMenuItem[]} */
;