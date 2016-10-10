"use strict"

var matrix = require('./brain.js');

var startPoint, endPoint;
var unvisited = [];

function Square(i,j,walk){
	this.x = parseInt(i) + 1;
	this.y = parseInt(j) + 1;
	this.walkable = walk; 
}

for ( var i in matrix){
	for (var j in matrix[i]){
		if (matrix[i][j] === 's'){
			matrix[i][j] = new Square(i,j,false);
			startPoint = matrix[i][j];
		}else if (matrix[i][j] === 'e'){
			matrix[i][j] = new Square(i,j,true);
			endPoint = matrix[i][j];
		}else if(matrix[i][j] === 0) {
			matrix[i][j] = new Square(i,j,true);
			unvisited.push(matrix[i][j]);
		}else {
			matrix[i][j] = new Square(i,j,false);
		}
	};
};	

var position = startPoint;
var counter;
var options = [];

function calculateEucleidian(){
	for (let k of unvisited) {
		if (Math.sqrt(Math.pow(position.x - k.x,2) + Math.pow(position.y - k.y,2)) === 1){
			options.push(k);					 // pushes available options to a new array
			var toRemove = unvisited.indexOf(k); // gets the index of the pushed value
			unvisited.splice(toRemove,1);		 // removes the above value from theunvisited array
		};
	}
}

function calculateOptions(){
	while (options.length > 1){
		for (let i in options ){
			position = options[i];
		}
	}
}

calculateEucleidian();
console.log(options); //why error?? tomorrow...
console.log(unvisited);



	

