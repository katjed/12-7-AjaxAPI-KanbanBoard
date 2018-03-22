// Class 'Column'
function Column(id, name) {
    var self = this; 
    this.id = id;
    this.name = name || 'No name';
    this.$element = createColumn();

    function createColumn() {  
        var $column = $('<div>').addClass('column');  // Creating column elements
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

        $columnDelete.click(function() {  // Adding events to column elements
            self.removeColumn();
        });

        $columnAddCard.click(function(event) {
            var cardName = prompt('Enter card name');
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName);
                    self.createCard(card);
                }
            });
        });

        $column.append($columnTitle)  // Appending column elements
               .append($columnDelete)
               .append($columnAddCard)
               .append($columnCardList);
    
        return $column;  // Returning created column
    }
}

// Methods for class 'Column'
Column.prototype = {
    createCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },

    removeColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response){
                self.$element.remove();
            }
        });
    },    
};
