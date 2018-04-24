(function (exports,d3) {
  'use strict';

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

  var ContextMenuGroup =

  /**
   * @param {string} id
   * @param {ContextMenuItem[]} items
   */


  /** {string} */
  function ContextMenuGroup(id, items) {
    classCallCheck(this, ContextMenuGroup);
    this.items = [];

    this.id = id;
    this.items = items;
  }

  /** {ContextMenuItem[]} */
  ;

  var ContextMenuItem = function () {

    /**
     * @param {string} id
     * @param {string|function} label
     * @param {function} onClickHandler
     * @param {ContextMenuGroup} childGroup
     */
    function ContextMenuItem(id, label, onClickHandler, childGroup) {
      classCallCheck(this, ContextMenuItem);
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
        if (this.onClickHandler !== null) {
          this.onClickHandler();
        }
      }
    }]);
    return ContextMenuItem;
  }();

  var ContextMenu = function () {

    /**
     * @param {ContextMenuGroup} rootGroup
     */
    function ContextMenu(rootGroup) {
      classCallCheck(this, ContextMenu);
      this.labelMargin = 12;
      this.borderColor = 'rgb(140, 140, 140)';
      this.borderStrokeWidth = '0.2px';
      this.drawMargin = 1;

      this.rootGroup = rootGroup;
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


    /** {ContextMenuGroup} */


    createClass(ContextMenu, [{
      key: 'show',
      value: function show(x, y) {
        d3.selectAll('.d3-v4-context-menu-container').remove();
        this.render(x + this.drawMargin, y + this.drawMargin, this.rootGroup);
      }

      /**
       * @param {int} x
       * @param {int} y
       * @param {ContextMenuGroup} itemGroup
       */

    }, {
      key: 'render',
      value: function render(x, y, itemGroup) {
        var _this2 = this;

        var _this = this;

        var labelSizes = itemGroup.items.reduce(function (sizes, item) {
          return sizes.concat(_this2.calculateLabelSize(item));
        }, []);

        var width = d3.max(labelSizes.map(function (size) {
          return size.width;
        }));

        var height = labelSizes.reduce(function (sum, size) {
          return { height: sum.height + size.height };
        }).height;

        var container = d3.select('body').append('div').style('width', width + 'px').style('height', height + 'px').style('left', x + 'px').style('top', y + 'px').style('position', 'absolute').classed('d3-v4-context-menu-container', true).attr('id', itemGroup.id);
        var g = container.append('svg').attr('width', '100%').attr('height', '100%').attr('x', 0).attr('y', 0).append('g');
        var contextMenu = g.selectAll('rect').data(itemGroup.items);
        var contextItems = contextMenu.enter().append('svg').attr('class', 'item-entry').attr('id', function (item) {
          return item.id;
        }).attr('x', 0).attr('y', function (item, i) {
          return i * labelSizes[i].height;
        }).attr('width', width).attr('height', function (item, i) {
          return labelSizes[i].height;
        }).classed('context-menu-unclickable', function (item) {
          return item.onClickHandler === null;
        });

        contextItems.style('cursor', 'default');

        contextItems.on('mouseover', function (item) {
          var itemSelection = d3.select(this);
          if (item.childGroup !== null) {
            if (!itemSelection.classed('child-group-visible')) {
              // show nested menu group
              itemSelection.classed('child-group-visible', true);
              _this.render(x + Number(itemSelection.attr('x')) + Number(itemSelection.attr('width')) - _this.drawMargin * 3, y + Number(itemSelection.attr('y')) + _this.drawMargin * 3, item.childGroup);
            }
          } else {
            // remove nested menu group
            _this.removeChildGroup(itemGroup.items);
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
          return item.onClick();
        }).attr('x', 0).attr('y', 0).attr('width', '100%').attr('height', '100%');
        contextItems.append('text').text(function (item) {
          return item.getLabel();
        }).attr("class", "item-label").style("fill", "rgb").style("font-size", 11).on('click', function (item) {
          return item.onClick();
        }).attr('x', '5px').attr('y', '50%');
        contextItems.append('text').text(function (item) {
          return item.childGroup !== null ? '>' : null;
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
        var width = dummy.node().getBBox().width + this.labelMargin + (item.childGroup !== null ? 15 : 0);
        var height = dummy.node().getBBox().height + this.labelMargin;
        d3.selectAll('.d3-v4-dummy').remove();
        return {
          width: width,
          height: height
        };
      }

      /**
       * @param {ContextMenuItem[]} items
       */

    }, {
      key: 'removeChildGroup',
      value: function removeChildGroup(items) {
        var _this3 = this;

        items.map(function (item) {
          var itemSelector = d3.select('#' + item.id);
          itemSelector.select('rect').style("fill", function (item) {
            return item.defaultFill;
          });
          itemSelector.classed('child-group-visible', false);
          if (item.childGroup === null) return;
          d3.select('#' + item.childGroup.id).remove();
          _this3.removeChildGroup(item.childGroup.items);
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
        return new ContextMenu(this.parseList(dataSets));
      }

      /**
       * @param {object[]|function} dataSetList
       * @returns {ContextMenuGroup}
       */

    }, {
      key: "parseList",
      value: function parseList(dataSetList) {
        var _this = this;

        var items = [];

        this.groupIdIndex++;
        var groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

        try {
          dataSetList = dataSetList();
        } catch (e) {}

        dataSetList.map(function (dataSet) {
          _this.itemIdIndex++;
          var itemId = 'd3_v4_context_menu_item_' + _this.itemIdIndex;
          if (!dataSet.hasOwnProperty('label') || !dataSet.hasOwnProperty('onClick') && !dataSet.hasOwnProperty('items')) {
            throw new Error('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
          }
          var label = dataSet.label;
          items.push(new ContextMenuItem(itemId, label, dataSet.hasOwnProperty('onClick') ? dataSet.onClick : null, dataSet.hasOwnProperty('items') && dataSet.items !== null ? _this.parseList(dataSet.items) : null));
        });
        return new ContextMenuGroup(groupId, items);
      }
    }]);
    return ContextMenuFactory;
  }();

  var D3V4ContextMenu = function () {

    /**
     *
     * @param {object[]} dataSets
     */
    function D3V4ContextMenu(dataSets) {
      classCallCheck(this, D3V4ContextMenu);

      var factory = new ContextMenuFactory();
      this.contextMenu = factory.factory(dataSets);
    }

    /**
     * show the original context menu.
     */


    createClass(D3V4ContextMenu, [{
      key: "show",
      value: function show(x, y) {
        this.contextMenu.show(x, y);
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

}((this.d3 = this.d3 || {}),d3));
