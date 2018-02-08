// Class 'Card'
function Card(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'No name';
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card');  // Creating card elements
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');

        $cardDelete.click(function(){  // Adding events to card elements
            self.removeCard();
        });

        $card.append($cardDelete)  // Appending card elements 
             .append($cardDescription);             

        return $card;  // Returning created card
    }
}

// Methods for class 'Card'
Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.$element.remove();
            }
        });
    },
};

    