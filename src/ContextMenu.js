import * as d3 from "d3";

export class ContextMenu {

  labelMargin = 12;

  /**
   * @param {d3.selection}
   */
  svg;

  /** {ContextMenuGroup} */
  itemList;

  /**
   * @param {d3.selection} svg
   * @param {ContextMenuGroup} itemList
   */
  constructor(svg, itemList) {
    this.svg = svg;
    this.itemList = itemList;
  }

  /**
   * @param {Number} x
   * @param {Number} y
   */
  show(x, y) {
    d3.selectAll('.context-menu').remove();
    this.render(x, y, this.itemList);
  }

  /**
   * @param {int} x
   * @param {int} y
   * @param {ContextMenuGroup} itemGroup
   */
  render(x, y, itemGroup) {
    let _this = this;

    let labelSizes = itemGroup.items.reduce((sizes, item) => {
      return sizes.concat(this.calculateLabelSize(item));
    }, []);

    let width = d3.max(labelSizes.map((size) => {
      return size.width;
    }));

    this.svg.append('g').attr('class', 'context-menu').attr('id', itemGroup.id);
    let contextMenu = d3.select('#' + itemGroup.id).selectAll('rect').data(itemGroup.items);
    let contextItems = contextMenu.enter().append('svg').attr('class', 'menu-entry')
      .attr('x', x)
      .attr('y', function (item, i) {
        return y + (i * labelSizes[i].height);
      })
      .attr('width', width)
      .attr('height', function (item, i) {
        return labelSizes[i].height;
      });

    contextItems.style('cursor', 'default');

    contextItems.on('mouseover', function (item) {
      d3.select(this).select('rect').style("fill", item.onMouseoverFill);
      if (item.childGroup !== null) {
        let menunEntry = d3.select(this);
        _this.render(Number(menunEntry.attr('x')) + Number(menunEntry.attr('width')), Number(menunEntry.attr('y')), item.childGroup);
      } else {
        _this.removeChildGroup(itemGroup.items);
      }
    });

    contextItems.on('mouseout', function (item) {
      d3.select(this).select('rect').style("fill", item.defaultFill);
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
      .attr("class", "dummy-menu-label")
      .style("fill", "rgb")
      .style("font-size", 11)
      .on("click", function (item) {
        item.onClickHandler();
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
      if (item.childGroup === null) return;
      d3.select('#' + item.childGroup.id).remove();
      this.removeChildGroup(item.childGroup.items);
    });
  }
}
