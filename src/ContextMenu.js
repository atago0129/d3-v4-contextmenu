import * as d3 from "d3";

export class ContextMenu {

  labelMargin = 12;

  borderColor = 'rgb(140, 140, 140)';

  borderStrokeWidth = '0.2px';

  drawMargin = 1;

  /** {d3.selection} */
  svg;

  /** {ContextMenuGroup} */
  rootGroup;

  /**
   * @param {d3.selection} svg
   * @param {ContextMenuGroup} rootGroup
   */
  constructor(svg, rootGroup) {
    this.svg = svg;
    this.rootGroup = rootGroup;
  }

  /**
   * @param {Number} x
   * @param {Number} y
   */
  show(x, y) {
    d3.selectAll('.context-menu').remove();
    this.render(x + this.drawMargin, y + this.drawMargin, this.rootGroup);
  }

  /**
   * @param {int} x
   * @param {int} y
   * @param {ContextMenuGroup} itemGroup
   */
  render(x, y, itemGroup) {
    d3.select(document)
      .on('click', function () {
        if (d3.select(d3.event.target.parentNode).classed('context-menu-unclickable')) {
          return;
        }
        d3.selectAll('.context-menu').remove();
      });

    let _this = this;

    let labelSizes = itemGroup.items.reduce((sizes, item) => {
      return sizes.concat(this.calculateLabelSize(item));
    }, []);

    let width = d3.max(labelSizes.map((size) => {
      return size.width;
    }));

    this.svg.append('g').attr('class', 'context-menu').attr('id', itemGroup.id);
    let contextMenu = d3.select('#' + itemGroup.id).selectAll('rect').data(itemGroup.items);
    let contextItems = contextMenu.enter().append('svg').attr('class', 'item-entry')
      .attr('id', (item) => (item.id))
      .attr('x', x)
      .attr('y', function (item, i) {
        return y + (i * labelSizes[i].height);
      })
      .attr('width', width)
      .attr('height', function (item, i) {
        return labelSizes[i].height;
      })
      .classed('context-menu-unclickable', (item) => (item.onClickHandler === null));

    contextItems.style('cursor', 'default');

    contextItems.on('mouseover', function (item) {
      let itemSelection = d3.select(this);
      if (item.childGroup !== null) {
        if (!itemSelection.classed('child-group-visible')) {
          // show nested menu group
          itemSelection.classed('child-group-visible', true);
          _this.render(Number(itemSelection.attr('x')) + Number(itemSelection.attr('width')) - _this.drawMargin * 3, Number(itemSelection.attr('y')) + _this.drawMargin * 3, item.childGroup);
        }
      } else {
        // remove nested menu group
        _this.removeChildGroup(itemGroup.items);
      }
      itemSelection.select('rect').style("fill", item.onMouseoverFill);
    });

    contextItems.on('mouseout', function (item) {
      let itemSelection = d3.select(this);
      if (!itemSelection.classed('child-group-visible')) { // ignore parent of visible nested group
        itemSelection.select('rect').style("fill", item.defaultFill);
      }
    });

    contextItems.append('rect')
      .style('fill', function (item) {
        return item.defaultFill;
      })
      .on('click', function (item) {
        item.onClick();
      })
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '100%')
      .attr('height', '100%');
    contextItems.append('text')
      .text(function (item) {
        return item.getLabel();
      })
      .attr("class", "item-label")
      .style("fill", "rgb")
      .style("font-size", 11)
      .on("click", function (item) {
        item.onClick();
      })
      .attr('x', '5px')
      .attr('y', '50%');
    contextItems.append('text')
      .text(function (item) {
        if (item.childGroup !== null) {
          return '>';
        }
        return null;
      })
      .attr('x', '100%')
      .attr('y', '50%')
      .style("font-size", 11)
      .attr('transform', 'translate(-12, 0)');

    this.drawBorder(d3.select('#' + itemGroup.id));
  }

  /**
   * @param {ContextMenuItem} item
   * @returns {{width: number, height: number}}
   */
  calculateLabelSize(item) {
    this.svg.append('g').attr('class', 'd3-v4-dummy');
    let dummy = d3.select('.d3-v4-dummy').append('text').text(item.getLabel()).style('font-size', 11);
    let width = dummy.node().getBBox().width + this.labelMargin + (item.childGroup !== null ? 15 : 0);
    let height = dummy.node().getBBox().height + this.labelMargin;
    d3.selectAll('.d3-v4-dummy').remove();
    return {
      width: width,
      height: height
    };
  }

  /**
   * @param {ContextMenuItem[]} items
   */
  removeChildGroup(items) {
    items.map((item) => {
      let itemSelector = d3.select('#' + item.id);
      itemSelector.select('rect').style("fill", (item) => (item.defaultFill));
      itemSelector.classed('child-group-visible', false);
      if (item.childGroup === null) return;
      d3.select('#' + item.childGroup.id).remove();
      this.removeChildGroup(item.childGroup.items);
    });
  }

  /**
   * @param {d3.selection} groupSelection
   */
  drawBorder(groupSelection) {
    let groupBox = groupSelection.node().getBBox();
    groupSelection.append('rect')
      .attr('x', groupBox.x)
      .attr('y', groupBox.y)
      .attr('width', groupBox.width)
      .attr('height', groupBox.height)
      .style("fill", "none")
      .style('stroke', this.borderColor)
      .style('stroke-width', this.borderStrokeWidth);
  }
}
