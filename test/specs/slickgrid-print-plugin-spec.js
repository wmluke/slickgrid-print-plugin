describe('slickgrid-print-plugin', function () {
    'use strict';

    var printPlugin;

    beforeEach(function () {

        var $container = $('<div style="width: 500px; height: 100px;"/>');

        var grid;
        var columns = [
            {id: 'title', name: 'Title', field: 'title'},
            {id: 'duration', name: 'Duration', field: 'duration'},
            {id: '%', name: '% Complete', field: 'percentComplete'},
            {id: 'start', name: 'Start', field: 'start'},
            {id: 'finish', name: 'Finish', field: 'finish'},
            {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
        ];

        var options = {
            enableCellNavigation: true,
            enableColumnReorder: false
        };

        var data = [];

        for (var i = 1; i <= 100; i++) {
            data.push({
                title: 'Task ' + i,
                duration: '5 days',
                percentComplete: i * 10,
                start: '01/01/2009',
                finish: '01/05/2009',
                effortDriven: (i % 5 === 0)
            });
        }

        printPlugin = new Slick.Plugins.Print();

        grid = new Slick.Grid($container, data, columns, options);
        grid.registerPlugin(printPlugin);

    });

    it('should print grid to HTML', function () {
        var table = $('<div/>');

        function text(i, el) {return $(el).text();}

        printPlugin.printToElement(table);
        expect(table).toBeDefined();
        expect(table.find('tr').length).toBe(101);
        expect(table.find('th').map(function (i, el) {return $(el).text();}).get().join('|')).toBe('Title|Duration|% Complete|Start|Finish|Effort Driven');
        expect(table.find('tbody tr:nth-child(1) td').map(text).get().join('|')).toBe('Task 1|5 days|10|01/01/2009|01/05/2009|false');
        expect(table.find('tbody tr:nth-child(2) td').map(text).get().join('|')).toBe('Task 2|5 days|20|01/01/2009|01/05/2009|false');
        expect(table.find('tbody tr:nth-child(3) td').map(text).get().join('|')).toBe('Task 3|5 days|30|01/01/2009|01/05/2009|false');
        expect(table.find('tbody tr:nth-child(4) td').map(text).get().join('|')).toBe('Task 4|5 days|40|01/01/2009|01/05/2009|false');
        expect(table.find('tbody tr:nth-child(5) td').map(text).get().join('|')).toBe('Task 5|5 days|50|01/01/2009|01/05/2009|true');

        expect(table.find('tbody tr:nth-child(100) td').map(text).get().join('|')).toBe('Task 100|5 days|1000|01/01/2009|01/05/2009|true');
    });

});
