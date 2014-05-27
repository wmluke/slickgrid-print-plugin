/**! 
 * @license slickgrid-print-plugin v0.1.0
 * Copyright (c) 2013 . 
 * License: MIT
 */
(function ($) {
    'use strict';

    var SlickPrint = function () {

        var _self = this;
        var _grid;

        this.init = function (grid) {
            _grid = grid;
        };

        this.printToHtml = function () {
            var numRows = _grid.getDataLength();
            var columns = _grid.getColumns();
            var numCols = columns.length;
            var r, c;
            var rows = [], cols = [], headers = [];
            var cellNode;
            var topRow = _grid.getRenderedRange().top;

            columns.forEach(function (col) {
                headers.push(col.name);
            });

            Slick.GlobalEditorLock.cancelCurrentEdit();

            _grid.scrollRowToTop(0);

            for (r = 0; r < numRows; r++) {
                cols = [];
                for (c = 0; c < numCols; c++) {
                    cellNode = _grid.getCellNode(r, c);
                    if (!cellNode) {
                        _grid.scrollRowToTop(r);
                        cellNode = _grid.getCellNode(r, c);
                    }
                    cols.push($(cellNode).text());
                }
                rows.push('<td>' + cols.join('</td><td>') + '</td>');
            }

            var table = [
                '<table class="table table-bordered">',
                '<thead>',
                '<tr>',
                    '<th>' + headers.join('</th><th>') + '</th>',
                '</tr>',
                '</thead>',
                '<tbody>',
                    '<tr>' + rows.join('</tr>\n<tr>') + '</tr>',
                '</tbody>',
                '</table>'
            ].join('\n');

            _grid.scrollRowToTop(topRow);

            return table;
        };

        this.printToElement = function ($element) {
            $($element).html(_self.printToHtml());
        };

        this.printToWindow = function (w) {
            w.onload = function () {
                setTimeout(function () {
                    _self.printToElement(w.document.body);
                });
            };
        };
    };

    // register namespace
    $.extend(true, window, {
        Slick: {
            Plugins: {
                Print: SlickPrint
            }
        }
    });
}(jQuery));
