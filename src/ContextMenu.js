import * as d3 from "d3";

export class ContextMenu {
  svg;

  labelMargin = 12;

  showListIds = [];

  /** {ContextMenuList} */
  itemList;

  /**
   * @param {d3.selection} svg
   * @param {ContextMenuList} itemList
   */
  constructor(svg, itemList) {
    this.svg = svg;
    this.itemList = itemList;
  }

  show(x, y) {
    this.render(x, y, this.itemList);
  }

  /**
   * @param {int} x
   * @param {int} y
   * @param {ContextMenuList} itemList
   */
  render(x, y, itemList) {
    this.showListIds = itemList.id;
    let _this = this;
    this.svg.append('g').attr('class', 'context-menu').attr('id', itemList.id);
    let contextMenu = d3.select('#' + itemList.id).selectAll('rect').data(itemList.items);
    let contextItems = contextMenu.enter().append('g').attr('class', 'menu-entry');
    contextItems.style('cursor', 'pointer');
    contextItems.on('mouseover', function (item) {
      d3.select(this).select('rect').style("fill", item.onMouseoverFill);
      if (item.list !== null) {
        let bbox = d3.select(this).select('rect').node().getBBox();
        _this.render(bbox.x + bbox.width, bbox.y, item.list);
      }
    });
    contextItems.on('mouseout', function (item) {
      d3.select(this).select('rect').style("fill", item.defaultFill);
    });

    let labelSizes = itemList.items.reduce((sizes, item) => {
      return sizes.concat(this.calculateLabelSize(item));
    }, []);

    let width = d3.max(labelSizes.map((size) => {
      return size.width;
    }));

    contextItems.append('rect')
      .style('fill', function (item) {
        return item.defaultFill;
      })
      .on('click', function (item) {
        item.onClick();
      })
      .attr('x', x)
      .attr('y', function (item, i) {
        return y + (i * labelSizes[i].height);
      })
      .attr('width', width)
      .attr('height', function (item, i) {
        return labelSizes[i].height;
      });
    contextItems.append('text')
      .text(function (item) {
        return item.getLabel();
      })
      .attr("class", "dummy-menu-label")
      .style("fill", "rgb")
      .style("font-size", 11)
      .on("click", function (item) {
        item.onClick();
      })
      .attr('x', x)
      .attr('y', function(item, i){
        return y + (i * labelSizes[i].height);
      })
      .attr('dy',function(item, i){
        return labelSizes[i].height - _this.labelMargin / 2;
      })
      .attr('dx', width * 0.05);
  }

  /**
   * @param {ContextMenuItem} item
   * @returns {{width: number, height: number}}
   */
  calculateLabelSize(item) {
    this.svg.append('g').attr('class', 'd3-v4-dummy');
    let dummy = d3.select('.d3-v4-dummy').append('text').text(item.getLabel()).style('font-size', 11);
    let width = dummy.node().getBBox().width + this.labelMargin;
    let height = dummy.node().getBBox().height + this.labelMargin;
    d3.selectAll('.d3-v4-dummy').remove();
    return {
      width: width,
      height: height
    };
  }
}
