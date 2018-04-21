import * as d3 from "d3";
import {ContextMenuFactory} from "./ContextMenuFactory";

export class D3V4ContextMenu {
  contextMenu;

  /**
   *
   * @param {object[]} dataSets
   */
  constructor(dataSets) {
    const factory = new ContextMenuFactory();
    this.contextMenu = factory.factory(dataSets);
  }

  /**
   * show the original context menu.
   */
  show(x, y) {
    this.contextMenu.show(x, y);
  }
}
