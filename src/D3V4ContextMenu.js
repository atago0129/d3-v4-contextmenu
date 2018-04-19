import * as d3 from "d3";
import {ContextMenuFactory} from "./ContextMenuFactory";

export class D3V4ContextMenu {
  contextMenu;

  /**
   *
   * @param {d3.selection} svg
   * @param {object[]} dataSets
   */
  constructor(svg, dataSets) {
    const factory = new ContextMenuFactory(svg);
    this.contextMenu = factory.factory(dataSets);
  }

  /**
   * show the original context menu.
   * @param {number} x
   * @param {number} y
   */
  show(x, y) {
    this.contextMenu.show(x, y);
  }
}
