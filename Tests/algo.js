"use strict"

var matri = require('./brain.js');

var xStart, yStart, xEnd, yEnd;

function Square(i,j,walk){
	this.x = parseInt(i) + 1;
	this.y = parseInt(j) + 1;
	this.walkable = walk; 
}

Square.prototype.gCost = function(){
	return Math.sqrt(Math.pow((this.x - xStart), 2) + Math.pow((this.y - yStart), 2)) * 10; 
}

Square.prototype.hCost = function(){
	return Math.sqrt(Math.pow((xEnd - this.x), 2) + Math.pow((yEnd - this.y), 2)) * 10;
}

Square.prototype.totalCost = function(){
	return this.gCost() + this.hCost();
}

var blanks = [];

for ( var i in matri){
	for (var j in matri[i]){
		if (matri[i][j] === 's'){
			xStart = parseInt(i) + 1;
			yStart = parseInt(j) + 1;
			console.log(`${xStart},${yStart}`);

		}else if (matri[i][j] === 'e'){
			xEnd = parseInt(i) + 1;
			yEnd = parseInt(j) + 1;

		}else if (matri[i][j] === 0){
    		matri[i][j] = new Square(i,j,true);
			blanks.push(matri[i][j]);
			
    	}else if (matri[i][j] === 1){
			matri[i][j] = new Square(i,j,false);
    	}
	};
};

blanks.forEach( x => console.log(x.totalCost()));


