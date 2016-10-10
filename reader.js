"use strict"

var fs = require('fs');

// This module-function reads the input and converts it to a 2x2 matrix . 
module.exports = function (filename){
    var stringArray = fs.readFileSync(filename,'utf8').split('\n');
    var result = [];
    for (var str of stringArray){
        result.push(Array.from(str));
    }
    return result;
    };
