function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var ContextMenuGroup = function ContextMenuGroup(id, items) {
  _classCallCheck(this, ContextMenuGroup);

  this.items = [];

  this.id = id;
  this.items = items;
}

/** {ContextMenuItem[]} */
;