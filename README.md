# d3-v4-contextmenu
context menu with d3.js v4.

# Useage
```javascript
var svg = d3.select("#main").append("svg").attr("width", 500).attr("height", 400);
var contextMenu = new window.ContextMenu.default(
  svg,
  [
    {
      label: "change to red",
      onClick: function (e) {
        svg.node().style.background = "#ff0000";
      }
    },
    {
      label: "change color",
      items: [
        {
          label: "blue",
          onClick: function (e) {
            svg.node().style.background = "#0000ff";
          }
        },
        {
          label: "pink",
          onClick: function(e) {
            alert('pink is clicked!');
          },
          items: [
            {
              label: "deep pink",
              onClick: function (e) {
                svg.node().style.background = "#ff1493";
              }
            },
            {
              label: "shocking pink",
              onClick: function (e) {
                svg.node().style.background = "#fc0fc0";
              }
            }
          ]
        }
      ]
    },
    {
      label: function () {
        var date = new Date();
        return 'Snow' + ':' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      },
      onClick: function (e) {
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
npm install d3-v4-contextmenu#master
```
```javascript
import ContextMenu from "d3-v4-contextmenu";
 
...
 
let contextMenu = new ContextMenu([
  svg,
  {lebel: "hoge", cb: callback}
]);
svg.on("contextmenu", function () {
  d3.event.preventDefault();
  contextMenu.show(svg, d3.mouse(this)[0], d3.mouse(this)[1]);
});
```
# Demo
http://plnkr.co/edit/i84SdzHnhKwHgZB21lpe?p=info
