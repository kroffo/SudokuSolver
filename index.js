var table = document.getElementById("sudokuTable");

var blocks = [];
var rows = [];
var cols = [];
var squares = [];

for(var i=0; i<9; ++i) {
    blocks.push([]);
    rows.push([]);
    cols.push([]);
}

// Build the html table and corresponding square objects
for(var blockRow=0; blockRow<3; ++blockRow) {
    var tableRow = document.createElement("tr");
    table.appendChild(tableRow);
    
    for(var blockCol=0; blockCol<3; ++blockCol) {
	var tableData = document.createElement("td");
	tableRow.appendChild(tableData);
	var block = blockRow * 3 + blockCol;
	var blockTable = document.createElement("table");
	blockTable.id = "block" + block;
	blockTable.className = "blockTable";
	tableData.appendChild(blockTable);
	var rowOffset = Math.floor(block / 3) * 3;
	var colOffset = (block % 3) * 3;
	
	for(var row=0; row<3; ++row) {
	    var innerBlockRow = document.createElement("tr");
	    blockTable.appendChild(innerBlockRow);
	    for(var col=0; col<3; ++col) {
		var blockSlot = document.createElement("td");
		blockSlot.className = "slot";
		innerBlockRow.appendChild(blockSlot);
		var square = new Square(block, row+rowOffset, col+colOffset);
		squares.push(square);
		blocks[block].push(square);
		rows[row + rowOffset].push(square);
		cols[col + colOffset].push(square);
		var input = document.createElement("input");
		input.size = 1;
		input.maxLength = 1;
		input.onkeypress = isNumberKey;
		blockSlot.appendChild(input);
		input.square = square;
		square.setInput(input);
	    }
	}
    }
}

// Sets up the square's metadata for the solve method
function reinit() {
    for(var i=0; i<squares.length; ++i) {
	squares[i].reinit();
    }
}

// The solve function first reinitializes the squares
// then attempts to solve by filling in squares with
// only one possible value, and looking for squares
// which have been singled out (as per the
// detectSingleOuts function)
function solve() {
    reinit();
    var solved = 0;
    var finished = false;
    while(!finished) {
	finished = true;
	for(var i=0; i<squares.length; ++i) {
	    var square = squares[i];
	    if(!square.value) {
		if( square.getNumberPossibleValues() === 1 ) {
		    for(var k in square.possibleValues) {
			if(square.possibleValues[k]) {
			    setValue(square, k);
			    finished = false;
			    ++solved;
			    break;
			}
		    }
		}
	    }
	}
	 if(finished) {
	     finished = !detectSingleOuts();
	 }
    }
    return solved === 9*9;
}

// Detects squares which must be a certain value
// because it is the last candidate for the value in
// its row, col or block
function detectSingleOuts() {
    var detected = false;
    for(var r in rows) {
	var row = rows[r];
	for(var val=1; val<10; ++val) {
	    var value = "" + val;
	    var single = null;
	    for(var s in row) {
		var square = row[s];
		if(!square.value && square.possibleValues[value]) {
		    if(single) {
			single = null;
			break;
		    } else {
			single = square;
		    }
		}
	    }
	    if(single) {
		detected = true;
		single.setSingleValue(value);
	    }
	}
    }
    for(var c in cols) {
	var col = cols[c];
	for(var val=1; val<10; ++val) {
	    var value = "" + val;
	    var single = null;
	    for(var s in col) {
		var square = col[s];
		if(!square.value && square.possibleValues[value]) {
		    if(single) {
			single = null;
			break;
		    } else {
			single = square;
		    }
		}
	    }
	    if(single) {
		detected = true;
		single.setSingleValue(value);
	    }
	}
    }
    for(var b in blocks) {
	var block = blocks[b];
	for(var val=1; val<10; ++val) {
	    var value = "" + val;
	    var single = null;
	    for(var s in block) {
		var square = block[s];
		if(!square.value && square.possibleValues[value]) {
		    if(single) {
			single = null;
			break;
		    } else {
			single = square;
		    }
		}
	    }
	    if(single) {
		detected = true;
		single.setSingleValue(value);
	    }
	}
    }
    return detected;
}

// Sets the value and removes the possibility for squares in the same row, col or block to be this value
function setValue(square, val) {
    square.updateValue(val);
    var row = rows[square.row];
    for(var i in row) {
	var osquare = row[i];
	if(osquare !== square)
	    osquare.possibleValues[val] = false;
    }
    var col = cols[square.col];
    for(var i in col) {
	var osquare = col[i];
	if(osquare !== square)
	    osquare.possibleValues[val] = false;
    }
    var block = blocks[square.block];
    for(var i in block) {
	var osquare = block[i];
	if(osquare !== square)
	    osquare.possibleValues[val] = false;
    }
}

// Generic function used to filter text inputs
function isNumberKey(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if(charCode != 46 && charCode > 31 && charCode < 49 || charCode > 57)
	return false;
    return true;
}
