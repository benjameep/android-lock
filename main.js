"use strict";

var s = Snap(400,400);
var Cir = { "fill-opacity": 0, stroke:"green",strokeWidth:2};
var allPaths = [];
var ready = false;
var current;

//   0 1 2
//   3 4 5
//   6 7 8

// all the connections readily avaliable
var adj = {
    '0': "13457",
    '1': "0345268",
    '2': "14573",
    '3': "0147628",
    '4': "01235678",
    '5': "2147806",
    '6': "34715",
    '7': "6345802",
    '8': "74531"
};

// connections that can be leap frogged to
var jumps = {
    '0': "268",
    '1': "7",
    '2': "068",
    '3': "5",
    '4': "",
    '5': "3",
    '6': "028",
    '7': "1",
    '8': "026"
};

// for figuring the man in the middle
var middle = {
    "1,7": 4,
    "7,1": 4,
    "3,5": 4,
    "5,3": 4,
    "0,2": 1,
    "0,6": 3,
    "0,8": 4,
    "2,0": 1,
    "2,6": 4,
    "2,8": 5,
    "6,0": 3,
    "6,2": 4,
    "6,8": 7,
    "8,0": 4,
    "8,2": 5,
    "8,6": 7
};

// pushs all of it's children to the patterns list
function validNexts(path) {
    // collect all possible next patterns
    var validNextNodes = [];
    adj[path.last()].forEach(function (adj) {
        if (!path.has(adj)) validNextNodes.push(adj);
    });
    jumps[path.last()].forEach(function (jump) {
        if (path.has(middle[path.last() + "," + jump]) && !path.has(jump)) validNextNodes.push(jump);
    });
    // and them to the list
    validNextNodes.forEach(function (next) {
        var copy = path.copy();
        copy.push(next);
        allPaths.push(copy);
    });
}

function init() {
    // turn my strings into scrambled arrays of numbers
    // why scrambled? because it looks cooler ;)
    for (var i in adj) {
        adj[i] = adj[i].split("").shuffle().map(function (x) {
            return +x;
        });
    }
    for (var i in jumps) {
        jumps[i] = jumps[i].split("").map(function (x) {
            return +x;
        });
    }

    // push all of the seeds to the list
    "012345678".split("").shuffle().forEach(function (x) {
        allPaths.push(new Array(x).map(function (x) {
            return +x;
        }));
    });

    // don't start iterating till this function is run
    ready = true;
}

// This can be optimized, but snap.svg was driving me insane
function drawPath(path){
    var arr = []
    s.clear()
    for(var i = 0; i < 9; i++)
        s.circle((i%3)*150+50,Math.floor(i/3)*150+50,10).attr("fill","white")
    for(var i = 0; i < path.length; i++){
        s.circle((path[i]%3)*150+50,Math.floor(path[i]/3)*150+50,30).attr(Cir)
        arr.push((path[i]%3)*150+50)
        arr.push(Math.floor(path[i]/3)*150+50);
        if(i){
            s.line(arr[i*2-2],arr[i*2-1],arr[i*2],arr[i*2+1]).attr({
                stroke: "white",
                strokeWidth: 20,
                "fill-opacity":0,
                "stroke-opacity":.4
            })
        }
    }
}

// I don't know why Array dosen't already have these
Array.prototype.last = function () {
    return this[this.length - 1];
};
Array.prototype.has = function (x) {
    return this.indexOf(x) != -1;
};
Array.prototype.copy = function () {
    return this.slice(0);
};
Array.prototype.shuffle = function () {
    for (var i = this.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        var _ref = [this[j], this[i - 1]];
        this[i - 1] = _ref[0];
        this[j] = _ref[1];
    }
    return this;
};


//      MAIN
// *************************************

init()

setInterval( function() {
    // after the init() is run
    if(ready){
        // using the last one looks cooler and the first
        var current = allPaths.pop();

        // I need this if here because I am still using the
        // patterns smaller than 4
        if(current.length > 3)
            drawPath(current)

        // after we draw this then add it's children to the list
        // if any
        validNexts(current)
    }
},100)
