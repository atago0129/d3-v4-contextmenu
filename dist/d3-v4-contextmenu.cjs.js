'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var d3 = require('d3');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ContextMenuGroup = function () {

  /**
   * @param {string} id
   * @param {string|null} parentItemId
   * @param {number} nestedIndex
   */


  /** {string} */
  function ContextMenuGroup(id, parentItemId, nestedIndex) {
    classCallCheck(this, ContextMenuGroup);

    this.id = id;
    this.parentItemId = parentItemId;
    this.nestedIndex = nestedIndex;
  }

  /**
   * @param {ContextMenuItem} item
   * @returns {boolean}
   */


  /** {number} */


  /** {string} */


  createClass(ContextMenuGroup, [{
    key: "match",
    value: function match(item) {
      return item.groupId === this.id;
    }
  }]);
  return ContextMenuGroup;
}();

var ContextMenuItem = function () {

  /**
   * @param {string} id
   * @param {string} groupId
   * @param {string|function} label
   * @param {function} action
   */
  function ContextMenuItem(id, groupId, label, action) {
    classCallCheck(this, ContextMenuItem);
    this.defaultFill = 'rgb(250, 250, 250)';
    this.onMouseoverFill = 'rgb(200, 200, 200)';

    this.id = id;
    this.groupId = groupId;
    this.label = label;
    this.action = action;
  }

  /**
   * @returns {string}
   */


  createClass(ContextMenuItem, [{
    key: 'getLabel',
    value: function getLabel() {
      try {
        return String(this.label());
      } catch (e) {
        return String(this.label);
      }
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      if (this.action !== null) {
        this.action();
      }
    }
  }]);
  return ContextMenuItem;
}();

var ContextMenu = function () {
  function ContextMenu() {
    classCallCheck(this, ContextMenu);
    this._groups = [];
    this._items = [];
  }

  /** {ContextMenuGroup[]} */


  /** {ContextMenuItem[]} */


  createClass(ContextMenu, [{
    key: "pushGroup",


    /**
     * @param {ContextMenuGroup} group
     */
    value: function pushGroup(group) {
      this._groups.push(group);
    }

    /**
     * @param {ContextMenuItem} item
     */

  }, {
    key: "pushItem",
    value: function pushItem(item) {
      this._items.push(item);
    }

    /**
     * @returns {ContextMenuGroup}
     */

  }, {
    key: "getRootGroup",
    value: function getRootGroup() {
      return this.getGroupsByNestedIndex(0).pop();
    }

    /**
     * @param {string} id
     * @returns {ContextMenuGroup}
     */

  }, {
    key: "getGroupById",
    value: function getGroupById(id) {
      return this._groups.filter(function (group) {
        return group.id === id;
      }).pop() || null;
    }

    /**
     * @param {ContextMenuItem} item
     * @returns {ContextMenuGroup}
     */

  }, {
    key: "getGroupByParentItem",
    value: function getGroupByParentItem(item) {
      return this._groups.filter(function (group) {
        return group.parentItemId === item.id;
      }).pop() || null;
    }

    /**
     * @param {number} index
     * @returns {ContextMenuGroup[]}
     */

  }, {
    key: "getGroupsByNestedIndex",
    value: function getGroupsByNestedIndex(index) {
      return this._groups.filter(function (group) {
        return group.nestedIndex === index;
      });
    }

    /**
     * @param {ContextMenuGroup} group
     * @returns {ContextMenuItem[]}
     */

  }, {
    key: "getItemsByGroup",
    value: function getItemsByGroup(group) {
      return this._items.filter(function (item) {
        return group.match(item);
      });
    }
  }]);
  return ContextMenu;
}();

var ContextMenuFactory = function () {
  function ContextMenuFactory() {
    classCallCheck(this, ContextMenuFactory);
    this.itemIdIndex = 0;
    this.groupIdIndex = 0;
  }

  createClass(ContextMenuFactory, [{
    key: "factory",


    /**
     * @param {object[]} dataSets
     * @returns {ContextMenu}
     */
    value: function factory(dataSets) {
      this.contextMenu = new ContextMenu();
      this.parseList(null, dataSets, 0);
      return this.contextMenu;
    }

    /**
     * @param {null|string} parentItemId
     * @param {object[]|function} dataSetList
     * @param {number} nestedIndex
     * @returns {ContextMenuGroup}
     */

  }, {
    key: "parseList",
    value: function parseList(parentItemId, dataSetList, nestedIndex) {
      var _this = this;

      this.groupIdIndex++;
      var groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

      try {
        dataSetList = dataSetList();
      } catch (e) {}

      this.contextMenu.pushGroup(new ContextMenuGroup(groupId, parentItemId, nestedIndex));

      dataSetList.map(function (dataSet) {
        _this.itemIdIndex++;
        var itemId = 'd3_v4_context_menu_item_' + _this.itemIdIndex;
        var label = ContextMenuFactory.getLabel(dataSet);
        var action = ContextMenuFactory.getAction(dataSet);
        var children = ContextMenuFactory.getItems(dataSet);
        if (label === null || action === null && children === null) {
          throw new Error('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
        }
        _this.contextMenu.pushItem(new ContextMenuItem(itemId, groupId, label, action !== null ? action : null));
        if (children !== null) {
          _this.parseList(itemId, children, nestedIndex + 1);
        }
      });
    }

    /**
     * @param {object} dataSet
     * @returns {string|null}
     */

  }], [{
    key: "getLabel",
    value: function getLabel(dataSet) {
      if (dataSet.hasOwnProperty('label')) {
        if (typeof dataSet.label === 'function') {
          return String(dataSet.label());
        } else {
          return dataSet.label;
        }
      }
      return null;
    }

    /**
     * @param {object} dataSet
     * @returns {function|null}
     */

  }, {
    key: "getAction",
    value: function getAction(dataSet) {
      if (dataSet.hasOwnProperty('action')) {
        return dataSet.action;
      }
      // backward compatibility
      if (dataSet.hasOwnProperty('onClick')) {
        return dataSet.onClick;
      }
      return null;
    }

    /**
     * @param {object} dataSet
     * @returns {object[]|null}
     */

  }, {
    key: "getItems",
    value: function getItems(dataSet) {
      if (dataSet.hasOwnProperty('items')) {
        if (typeof dataSet.items === 'function') {
          return dataSet.items();
        } else {
          return dataSet.items;
        }
      }
      return null;
    }
  }]);
  return ContextMenuFactory;
}();

var ContextMenuCanvas = function () {

  /**
   * @param {ContextMenu} contextMenu
   */
  function ContextMenuCanvas(contextMenu) {
    classCallCheck(this, ContextMenuCanvas);
    this.labelMargin = 12;
    this.borderColor = 'rgb(140, 140, 140)';
    this.borderStrokeWidth = '0.2px';
    this.drawMargin = 1;

    this.contextMenu = contextMenu;
    d3.select(document).on('click', function () {
      if (d3.select(d3.event.target.parentNode).classed('context-menu-unclickable')) {
        return;
      }
      d3.selectAll('.d3-v4-context-menu-container').remove();
    });
  }

  /**
   * @param {Number} x
   * @param {Number} y
   */


  createClass(ContextMenuCanvas, [{
    key: 'show',
    value: function show(x, y) {
      d3.selectAll('.d3-v4-context-menu-container').remove();
      this.render(x + this.drawMargin, y + this.drawMargin, this.contextMenu.getRootGroup());
    }

    /**
     * @param {int} x
     * @param {int} y
     * @param {ContextMenuGroup} group
     */

  }, {
    key: 'render',
    value: function render(x, y, group) {
      var _this2 = this;

      var _this = this;

      var groupItems = this.contextMenu.getItemsByGroup(group);

      var labelSizes = groupItems.reduce(function (sizes, item) {
        return sizes.concat(_this2.calculateLabelSize(item));
      }, []);

      var width = d3.max(labelSizes.map(function (size) {
        return size.width;
      }));

      var height = labelSizes.reduce(function (sum, size) {
        return { height: sum.height + size.height };
      }).height;

      var container = d3.select('body').append('div').style('width', width + 'px').style('height', height + 'px').style('left', x + 'px').style('top', y + 'px').style('position', 'absolute').classed('d3-v4-context-menu-container', true).classed('d3-v4-context-menu-group-nested' + group.nestedIndex, true).attr('id', group.id);
      var g = container.append('svg').attr('width', '100%').attr('height', '100%').attr('x', 0).attr('y', 0).append('g');
      var contextMenu = g.selectAll('rect').data(groupItems);
      var contextItems = contextMenu.enter().append('svg').attr('class', 'item-entry').attr('id', function (item) {
        return item.id;
      }).attr('x', 0).attr('y', function (item, i) {
        return i * labelSizes[i].height;
      }).attr('width', width).attr('height', function (item, i) {
        return labelSizes[i].height;
      }).classed('context-menu-unclickable', function (item) {
        return item.action === null;
      });

      this.removeSameNestedGroups(group);

      contextItems.style('cursor', 'default');

      contextItems.on('mouseover', function (item) {
        var itemSelection = d3.select(this);
        var childGroup = _this.contextMenu.getGroupByParentItem(item);
        if (childGroup !== null) {
          if (!itemSelection.classed('child-group-visible')) {
            // show nested menu group
            itemSelection.classed('child-group-visible', true);
            _this.render(x + Number(itemSelection.attr('x')) + Number(itemSelection.attr('width')) - _this.drawMargin * 3, y + Number(itemSelection.attr('y')) + _this.drawMargin * 3, childGroup);
          }
        } else {
          // remove nested menu group
          _this.removeChildren(group);
        }
        itemSelection.select('rect').style("fill", item.onMouseoverFill);
      });

      contextItems.on('mouseout', function (item) {
        var itemSelection = d3.select(this);
        if (!itemSelection.classed('child-group-visible')) {
          // ignore parent of visible nested group
          itemSelection.select('rect').style("fill", item.defaultFill);
        }
      });

      contextItems.append('rect').style('fill', function (item) {
        return item.defaultFill;
      }).on('click', function (item) {
        return item.action();
      }).attr('x', 0).attr('y', 0).attr('width', '100%').attr('height', '100%');
      contextItems.append('text').text(function (item) {
        return item.getLabel();
      }).attr("class", "item-label").style("fill", "rgb").style("font-size", 11).on('click', function (item) {
        return item.action();
      }).attr('x', '5px').attr('y', '50%');
      contextItems.append('text').text(function (item) {
        return _this2.contextMenu.getGroupByParentItem(item) !== null ? '>' : null;
      }).attr('x', '100%').attr('y', '50%').style("font-size", 11).attr('transform', 'translate(-12, 0)');

      this.drawBorder(g);
    }

    /**
     * @param {ContextMenuItem} item
     * @returns {{width: number, height: number}}
     */

  }, {
    key: 'calculateLabelSize',
    value: function calculateLabelSize(item) {
      var g = d3.select('body').append('svg').attr('class', 'd3-v4-dummy').append('g');
      var dummy = g.append('text').text(item.getLabel()).style('font-size', 11);
      var width = dummy.node().getBBox().width + this.labelMargin + (this.contextMenu.getGroupByParentItem(item) !== null ? 15 : 0);
      var height = dummy.node().getBBox().height + this.labelMargin;
      d3.selectAll('.d3-v4-dummy').remove();
      return {
        width: width,
        height: height
      };
    }

    /**
     * @param {ContextMenuGroup} targetGroup
     */

  }, {
    key: 'removeSameNestedGroups',
    value: function removeSameNestedGroups(targetGroup) {
      var _this3 = this;

      this.contextMenu.getGroupsByNestedIndex(targetGroup.nestedIndex).map(function (group) {
        if (targetGroup === group) return;
        _this3.removeChildren(group);
        d3.select('#' + group.id).remove();
        d3.select('#' + group.parentItemId).classed('child-group-visible', false).select('rect').style("fill", function (item) {
          return item.defaultFill;
        });
      });
    }

    /**
     * @param {ContextMenuGroup} group
     */

  }, {
    key: 'removeChildren',
    value: function removeChildren(group) {
      var _this4 = this;

      this.contextMenu.getItemsByGroup(group).map(function (item) {
        var itemSelector = d3.select('#' + item.id);
        itemSelector.select('rect').style("fill", function (item) {
          return item.defaultFill;
        });
        itemSelector.classed('child-group-visible', false);
        var childGroup = _this4.contextMenu.getGroupByParentItem(item);
        if (childGroup === null) return;
        d3.select('#' + childGroup.id).remove();
        _this4.removeChildren(childGroup);
      });
    }

    /**
     * @param {d3.selection} groupSelection
     */

  }, {
    key: 'drawBorder',
    value: function drawBorder(groupSelection) {
      var groupBox = groupSelection.node().getBBox();
      groupSelection.append('rect').attr('x', groupBox.x).attr('y', groupBox.y).attr('width', groupBox.width).attr('height', groupBox.height).style("fill", "none").style('stroke', this.borderColor).style('stroke-width', this.borderStrokeWidth);
    }
  }]);
  return ContextMenuCanvas;
}();

var D3V4ContextMenu = function () {

  /**
   *
   * @param {object[]} dataSets
   */
  function D3V4ContextMenu(dataSets) {
    classCallCheck(this, D3V4ContextMenu);

    var factory = new ContextMenuFactory();
    this.canvas = new ContextMenuCanvas(factory.factory(dataSets));
  }

  /**
   * show the original context menu.
   */


  createClass(D3V4ContextMenu, [{
    key: "show",
    value: function show(x, y) {
      this.canvas.show(x, y);
    }
  }]);
  return D3V4ContextMenu;
}();

function d3V4Contextmenu (items) {
  return function () {
    d3.event.preventDefault();
    var d3V4ContextMenu = new D3V4ContextMenu(items);
    d3V4ContextMenu.show(d3.event.pageX, d3.event.pageY);
  };
}

exports.contextmenu = d3V4Contextmenu;
