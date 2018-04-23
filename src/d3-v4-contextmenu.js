import * as d3 from "d3";
import {D3V4ContextMenu} from "./D3V4ContextMenu";

export default function (items) {
  return function () {
    d3.event.preventDefault();
    let d3V4ContextMenu = new D3V4ContextMenu(items);
    d3V4ContextMenu.show(d3.event.pageX, d3.event.pageY);
  }
};