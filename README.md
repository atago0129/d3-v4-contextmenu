# d3-v4-contextmenu
context menu with d3.js v4.

# Useage
```javascript
var svg = d3.select("#main").append("svg").attr("width", 500).attr("height", 400);
var contextMenu = new window.ContextMenu.default(
  [
    {
      label: "red",
      cb: function (e) {
        svg.node().style.background = "#ff0000";
      }
    },
    {
      label: "deeppink",
      cb: function (e) {
        svg.node().style.background = "#ff1493";
      }
    },
    {
      label: "blue",
      cb: function (e) {
        svg.node().style.background = "#0000ff";
      }
    },
    {
      label: "snow",
      cb: function (e) {
        svg.node().style.background = "#fffafa";
      }
    }
  ]
);
svg.on("contextmenu", function () {
  d3.event.preventDefault();
  contextMenu.show(svg, d3.mouse(this)[0], d3.mouse(this)[1]);
});
```

or 

```
npm install git+https://github.com/atago0129/d3-v4-contextmenu#master
```
```javascript
import ContextMenu from "d3-v4-contextmenu";
 
...
 
let contextMenu = new ContextMenu([
  {lebel: "hoge", cb: callback}
]);
svg.on("contextmenu", function () {
  d3.event.preventDefault();
  contextMenu.show(svg, d3.mouse(this)[0], d3.mouse(this)[1]);
});
```

# License
* MIT