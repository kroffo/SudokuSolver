// Takes the block, row and column the square belongs to
function Square(block, row, col) {
    this.possibleValues = {
	"1": true,
	"2": true,
	"3": true,
	"4": true,
	"5": true,
	"6": true,
	"7": true,
	"8": true,
	"9": true
    }
    this.value = null;
    this.block = block;
    this.row = row;
    this.col = col;

    // Links a square to it's corresponding input box
    this.setInput = function(input) {
	this.input = input;
    }

    // Updates the value of a square, ensuring the input box matches the value
    this.updateValue = function(value) {
	this.value = value;
	this.input.value = value;
    }

    // Used to set possible values before the solve button is pressed
    this.setPresetValue = function(value) {
	if(value === "")
	    this.possibleValues = {
		"1": true,
		"2": true,
		"3": true,
		"4": true,
		"5": true,
		"6": true,
		"7": true,
		"8": true,
		"9": true
	    }
	else
	    this.setSingleValue(value);
    }

    // Sets a single value as the only possibility for this square
    this.setSingleValue = function(value) {
	this.possibleValues = {
	    "1": false,
	    "2": false,
	    "3": false,
	    "4": false,
	    "5": false,
	    "6": false,
	    "7": false,
	    "8": false,
	    "9": false
	}
	this.possibleValues[value] = true;
    }

    // Reinitializes the square
    this.reinit = function() {
	this.value = null;
	this.setPresetValue(this.input.value);
    }

    // returns the number of possible values the square has
    this.getNumberPossibleValues = function() {
	var count = 0;
	for(var index in this.possibleValues)
	    if(this.possibleValues[index])
		++count;
	return count;
    }
}
