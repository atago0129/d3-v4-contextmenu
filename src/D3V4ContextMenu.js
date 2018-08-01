import {ContextMenuFactory} from "./ContextMenuFactory";
import {ContextMenuCanvas} from "./ContextMenuCanvas";

export class D3V4ContextMenu {
  canvas;

  /**
   * @param {*} d
   * @param {number} i
   * @param {HTMLElement} elm
   * @param {object[]} dataSets
   */
  constructor(dataSets, d, i ,elm) {
    const factory = new ContextMenuFactory();
    this.canvas = new ContextMenuCanvas(factory.factory(dataSets, d, i ,elm));
  }

  /**
   * show the original context menu.
   */
  show(x, y) {
    this.canvas.show(x, y);
  }
}
