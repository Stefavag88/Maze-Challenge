"use strict"
var selection = process.argv[2];
var matrixList = require('./matrixes.js');
var start, end, current, matrix, coordinates;
var unvisited =[];
var nodes = [];
var adjacents = [];
var path = [];
var maxDistance = 0;

//take input from the command line, which can be 1,2 or 3.
switch(selection){
    case '1':
        matrix = matrixList[0];
        break;
    case '2':
        matrix = matrixList[1];
        break;
    case '3':
        matrix = matrixList[2];
}

//console.log(matrix);

//constructor function for the Square Class.
function Square(i,j,walkable){
	this.x = parseInt(i) + 1;
	this.y = parseInt(j) + 1;
	this.distance = Infinity;
	this.parent = null; 
    this.walkable = walkable;
}

//The Breadth-First-Algorithm.
function B_F_S(matrix){

    //Every element of the matrix is mapped to an instance of the Square Class.
    for ( var i in matrix){
	    for (var j in matrix[i]){

            if (matrix[i][j] === 's'){
                matrix[i][j] = new Square(i,j,true);
                start = matrix[i][j];  
            }else if( matrix[i][j] === 'e'){
                matrix[i][j] = new Square(i,j,true);
                end = matrix[i][j];  
            }else if (matrix[i][j] === 0){
                matrix[i][j] = new Square(i,j,true);
            }else{
                matrix[i][j] = new Square(i,j,false)
            }

            unvisited.push(matrix[i][j]);   // This is the array of unvisited squares.
        
        }
    }

    //With this function to (be used as callback) is ensured that the movement is only up,down,left and right and that blocked squares are not available to move to.
    function eucleiDistanceUnblocked(square){
        return (Math.sqrt(Math.pow(current.x - square.x,2) + Math.pow(current.y - square.y,2)) === 1) && (square.walkable === true);
    }
    
    //console.log(unvisited);

    start.distance = 0; 
    nodes.push(start);
   
    while(nodes.length > 0){

        current = nodes.shift();
        adjacents = unvisited.filter(eucleiDistanceUnblocked); 

       // console.log(adjacents);

        for(var k of adjacents){
            if (k.distance === Infinity){
                k.distance = current.distance + 1;
                k.parent = current;
                nodes.push(k);
                //console.log(nodes);
            }
        }
        //Gets the optimal Distance.
        nodes.forEach( element => {
            if ((element.distance > maxDistance) && (element.x === end.x) && (element.y === end.y)){
                maxDistance = element.distance;
            }
        });

        for (var node of nodes){
            if ((node.x === end.x) && (node.y === end.y)){

                //recursive finding of path.
                while (node.distance > 0){
                    coordinates = `(${node.x},${node.y})`;
                    path.unshift(coordinates);
                    node = node.parent;
                }
            }
        }
    } 

    //console.log(maxDistance);    
    path.splice(maxDistance); 

    console.log(`Path is (${start.x},${start.y}) --> ${path.join(" --> ")}`);
}

B_F_S(matrix);