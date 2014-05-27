# slickgrid-print-plugin

Create a printable view of a [SlickGird](https://github.com/mleibman/SlickGrid) as a simple a HTML table.

[![Build Status](https://travis-ci.org/wmluke/slickgrid-print-plugin.svg)](https://travis-ci.org/wmluke/slickgrid-print-plugin)
[![Coverage Status](https://coveralls.io/repos/wmluke/slickgrid-print-plugin/badge.png)](https://coveralls.io/r/wmluke/slickgrid-print-plugin)
[![devDependency Status](https://david-dm.org/wmluke/slickgrid-print-plugin/dev-status.svg)](https://david-dm.org/wmluke/slickgrid-print-plugin#info=devDependencies)

Note: this plugin is still pre-alpha.

## Usage 
```javascript
var printPlugin = new Slick.Plugins.Print();

grid = new Slick.Grid("#grid", data, columns, options);
grid.registerPlugin(printPlugin);

$('.btn-print').on('click', function () {
    var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    printPlugin.printToWindow(window.open('/print-grid.html', 'print_window', strWindowFeatures));
});

```

## License
MIT
