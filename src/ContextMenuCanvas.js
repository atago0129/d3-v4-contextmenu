import * as d3 from "d3";

export class ContextMenuCanvas {

  contextMenu;

  labelMargin = 12;

  borderColor = 'rgb(140, 140, 140)';

  borderStrokeWidth = '0.2px';

  drawMargin = 1;

  /**
   * @param {ContextMenu} contextMenu
   */
  constructor(contextMenu) {
    this.contextMenu = contextMenu;
    d3.select(document)
      .on('click', () => {
        if (d3.select(this.contextMenu.elm.parentNode).classed('context-menu-unclickable')) {
          return;
        }
        d3.selectAll('.d3-v4-context-menu-container').remove();
      });
  }

  /**
   * @param {Number} x
   * @param {Number} y
   */
  show(x, y) {
    d3.selectAll('.d3-v4-context-menu-container').remove();
    this.render(x + this.drawMargin, y + this.drawMargin, this.contextMenu.getRootGroup());
  }

  /**
   * @param {int} x
   * @param {int} y
   * @param {ContextMenuGroup} group
   */
  render(x, y, group) {
    const _this = this;

    const groupItems = this.contextMenu.getItemsByGroup(group);

    const labelSizes = groupItems.reduce((sizes, item) => (sizes.concat(this.calculateLabelSize(item))), []);

    const width = d3.max(labelSizes.map((size) => (size.width)));

    const height = labelSizes.reduce((sum, size) => ({height: sum.height + size.height})).height;

    const container = d3.select('body').append('div')
      .style('width', width + 'px')
      .style('height', height + 'px')
      .style('left', x + 'px')
      .style('top', y + 'px')
      .style('position', 'absolute')
      .classed('d3-v4-context-menu-container', true)
      .classed('d3-v4-context-menu-group-nested' + group.nestedIndex, true)
      .attr('id', group.id);
    const g = container.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('x', 0)
      .attr('y', 0)
      .append('g');
    const contextMenu = g.selectAll('rect').data(groupItems);
    const contextItems = contextMenu.enter().append('svg').attr('class', 'item-entry')
      .attr('id', (item) => (item.id))
      .attr('x', 0)
      .attr('y', (item, i) => (i * labelSizes[i].height))
      .attr('width', width)
      .attr('height', (item, i) => (labelSizes[i].height))
      .classed('context-menu-unclickable', (item) => (item.action === null));

    this.removeSameNestedGroups(group);

    contextItems.style('cursor', 'default');

    contextItems.on('mouseover', function (item) {
      const itemSelection = d3.select(this);
      const childGroup = _this.contextMenu.getGroupByParentItem(item);
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
      const itemSelection = d3.select(this);
      if (!itemSelection.classed('child-group-visible')) { // ignore parent of visible nested group
        itemSelection.select('rect').style("fill", item.defaultFill);
      }
    });

    contextItems.append('rect')
      .style('fill', (item) => (item.defaultFill))
      .on('click', (item) => (item.onClick(this.contextMenu.d, this.contextMenu.i, this.contextMenu.elm)))
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '100%')
      .attr('height', '100%');
    contextItems.append('text')
      .text((item) => (item.getLabel(this.contextMenu.d, this.contextMenu.i, this.contextMenu.elm)))
      .attr("class", "item-label")
      .style("fill", "rgb")
      .style("font-size", 11)
      .on('click', (item) => (item.onClick(this.contextMenu.d, this.contextMenu.i, this.contextMenu.elm)))
      .attr('x', '5px')
      .attr('y', '50%');
    contextItems.append('text')
      .text((item) => (this.contextMenu.getGroupByParentItem(item) !== null ? '>' : null))
      .attr('x', '100%')
      .attr('y', '50%')
      .style("font-size", 11)
      .attr('transform', 'translate(-12, 0)');

    this.drawBorder(g);
  }

  /**
   * @param {ContextMenuItem} item
   * @returns {{width: number, height: number}}
   */
  calculateLabelSize(item) {
    const g = d3.select('body').append('svg').attr('class', 'd3-v4-dummy').append('g');
    const dummy = g.append('text').text(item.getLabel()).style('font-size', 11);
    const width = dummy.node().getBBox().width + this.labelMargin + (this.contextMenu.getGroupByParentItem(item) !== null ? 15 : 0);
    const height = dummy.node().getBBox().height + this.labelMargin;
    d3.selectAll('.d3-v4-dummy').remove();
    return {
      width: width,
      height: height
    };
  }

  /**
   * @param {ContextMenuGroup} targetGroup
   */
  removeSameNestedGroups(targetGroup) {
    this.contextMenu.getGroupsByNestedIndex(targetGroup.nestedIndex).map((group) => {
      if (targetGroup === group) return;
      this.removeChildren(group);
      d3.select('#' + group.id).remove();
      d3.select('#' + group.parentItemId)
        .classed('child-group-visible', false)
        .select('rect').style("fill", (item) => (item.defaultFill));
    });
  }

  /**
   * @param {ContextMenuGroup} group
   */
  removeChildren(group) {
    this.contextMenu.getItemsByGroup(group).map((item) => {
      const itemSelector = d3.select('#' + item.id);
      itemSelector.select('rect').style("fill", (item) => (item.defaultFill));
      itemSelector.classed('child-group-visible', false);
      const childGroup = this.contextMenu.getGroupByParentItem(item);
      if (childGroup === null) return;
      d3.select('#' + childGroup.id).remove();
      this.removeChildren(childGroup);
    });
  }

  /**
   * @param {d3.selection} groupSelection
   */
  drawBorder(groupSelection) {
    const groupBox = groupSelection.node().getBBox();
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
