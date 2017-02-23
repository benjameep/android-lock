var numCol = 5
var numRow = 5
var map = {}

//0  1  2  3  4
//5  6  7  8  9
//10 11 12 13 14
//15 16 17 18 19
//20 21 22 23 24


for(var r = 0; r < numRow; r++){
    for(var c = 0; c < numCol; c++){
        [-1,0,1].forEach( roff => {
            roff += r;
            [-1,0,1].forEach( coff => {
                coff += c;
                if(roff < numRow && roff >= 0 &&
                  coff < numRow && coff >= 0){
                    if(!map[r*numCol+c]) {map[r*numCol+c] = []}
                    map[r*numCol+c].push(roff*numCol+coff)
                }
            })
        })
        map[r*numCol+c].splice(map[r*numCol+c].indexOf(r*numCol+c),1)
    }
}
console.log(map)