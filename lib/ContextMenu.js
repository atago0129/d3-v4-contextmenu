function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import * as d3 from "d3";

export var ContextMenu = function () {

  /**
   * @param {d3.selection} svg
   * @param {ContextMenuGroup} rootGroup
   */


  /** {d3.selection} */
  function ContextMenu(svg, rootGroup) {
    _classCallCheck(this, ContextMenu);

    this.labelMargin = 12;

    this.svg = svg;
    this.rootGroup = rootGroup;
  }

  /**
   * @param {Number} x
   * @param {Number} y
   */


  /** {ContextMenuGroup} */


  ContextMenu.prototype.show = function show(x, y) {
    d3.selectAll('.context-menu').remove();
    var clickMargin = 1;
    this.render(x + clickMargin, y + clickMargin, this.rootGroup);
  };

  /**
   * @param {int} x
   * @param {int} y
   * @param {ContextMenuGroup} itemGroup
   */


  ContextMenu.prototype.render = function render(x, y, itemGroup) {
    var _this2 = this;

    var _this = this;

    var labelSizes = itemGroup.items.reduce(function (sizes, item) {
      return sizes.concat(_this2.calculateLabelSize(item));
    }, []);

    var width = d3.max(labelSizes.map(function (size) {
      return size.width;
    }));

    this.svg.append('g').attr('class', 'context-menu').attr('id', itemGroup.id);
    var contextMenu = d3.select('#' + itemGroup.id).selectAll('rect').data(itemGroup.items);
    var contextItems = contextMenu.enter().append('svg').attr('class', 'menu-entry').attr('id', function (item) {
      return item.id;
    }).attr('x', x).attr('y', function (item, i) {
      return y + i * labelSizes[i].height;
    }).attr('width', width).attr('height', function (item, i) {
      return labelSizes[i].height;
    });

    contextItems.style('cursor', 'default');

    contextItems.on('mouseover', function (item) {
      var itemSelection = d3.select(this);
      if (item.childGroup !== null) {
        if (!itemSelection.classed('x-child-group-visible')) {
          itemSelection.classed('x-child-group-visible', true);
          _this.render(Number(itemSelection.attr('x')) + Number(itemSelection.attr('width')), Number(itemSelection.attr('y')), item.childGroup);
        }
      } else {
        _this.removeChildGroup(itemGroup.items);
      }
      itemSelection.select('rect').style("fill", item.onMouseoverFill);
    });

    contextItems.on('mouseout', function (item) {
      var itemSelection = d3.select(this);
      if (!itemSelection.classed('x-child-group-visible')) {
        itemSelection.select('rect').style("fill", item.defaultFill);
      }
    });

    contextItems.append('rect').style('fill', function (item) {
      return item.defaultFill;
    }).on('click', function (item) {
      item.onClick();
    }).attr('x', 0).attr('y', 0).attr('width', '100%').attr('height', '100%');
    contextItems.append('text').text(function (item) {
      return item.getLabel();
    }).attr("class", "dummy-menu-label").style("fill", "rgb").style("font-size", 11).on("click", function (item) {
      item.onClickHandler();
    }).attr('x', '5px').attr('y', '50%');
    contextItems.append('text').text(function (item) {
      if (item.childGroup !== null) {
        return '>';
      }
      return null;
    }).attr('x', '100%').attr('y', '50%').style("font-size", 11).attr('transform', 'translate(-12, 0)');
  };

  /**
   * @param {ContextMenuItem} item
   * @returns {{width: number, height: number}}
   */


  ContextMenu.prototype.calculateLabelSize = function calculateLabelSize(item) {
    this.svg.append('g').attr('class', 'd3-v4-dummy');
    var dummy = d3.select('.d3-v4-dummy').append('text').text(item.getLabel()).style('font-size', 11);
    var width = dummy.node().getBBox().width + this.labelMargin + (item.childGroup !== null ? 15 : 0);
    var height = dummy.node().getBBox().height + this.labelMargin;
    d3.selectAll('.d3-v4-dummy').remove();
    return {
      width: width,
      height: height
    };
  };

  /**
   * @param {ContextMenuItem[]} items
   */


  ContextMenu.prototype.removeChildGroup = function removeChildGroup(items) {
    var _this3 = this;

    items.map(function (item) {
      var itemSelector = d3.select('#' + item.id);
      itemSelector.select('rect').style("fill", function (item) {
        return item.defaultFill;
      });
      itemSelector.classed('x-child-group-visible', false);
      if (item.childGroup === null) return;
      d3.select('#' + item.childGroup.id).remove();
      _this3.removeChildGroup(item.childGroup.items);
    });
  };

  return ContextMenu;
}();