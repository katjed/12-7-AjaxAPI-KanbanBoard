// Object 'Board'
var board = {
    name: 'Kanban Board',

    createColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },

    $element: $('#board .column-container')
};

// Adding events - creating column
$('.create-column').click(function() {
    var columnName = prompt('Enter column name');
    $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
            name: columnName
        },
        success: function(response){
            var column = new Column(response.id, columnName);
            board.createColumn(column);
        }
    });
});

// Drag'n'drop
function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}