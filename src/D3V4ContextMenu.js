import {ContextMenuFactory} from "./ContextMenuFactory";
import {ContextMenuCanvas} from "./ContextMenuCanvas";

export class D3V4ContextMenu {
  canvas;

  /**
   *
   * @param {object[]} dataSets
   */
  constructor(dataSets) {
    const factory = new ContextMenuFactory();
    this.canvas = new ContextMenuCanvas(factory.factory(dataSets));
  }

  /**
   * show the original context menu.
   */
  show(x, y) {
    this.canvas.show(x, y);
  }
}
