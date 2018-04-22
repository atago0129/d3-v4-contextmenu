# d3-v4-contextmenu
context menu with d3.js v4.

# Demo
http://plnkr.co/edit/i84SdzHnhKwHgZB21lpe?p=info

# Install
```
npm i @atago0129/d3-v4-contextmenu
```

# Useage
```javascript
var svg = d3.select("#main").append("svg").attr("width", 500).attr("height", 400);
var items = [
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
        items: function() {
          return [
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
          ];
        }
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
];
svg.on("contextmenu", d3.contextmenu(items));
```