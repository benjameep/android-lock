var numCol = 5
var numRow = 3
var map = {}

// 0  1  2  3  4
// 5  6  7  8  9
// 10 11 12 13 14
// 15 16 17 18 19
// 20 21 22 23 24
//30 jump
//31 adj
//32 adj
//33 jump
//40 jump
//41 adj
//42 jump
//43 adj
//44 jump


function perm (x,y,a,stage=4){
	switch(stage){
		case 4:
			perm(x,y,a,3)
			if(x == y)
				perm(x,0,a,3)
			break;
		case 3:
			perm(x,y,a,2)
			if(x != y)
				perm(y,x,a,2)
			break;
		case 2:
			perm(x,y,a,1)
			if(x)
				perm(-x,y,a,1)
			break;
		case 1:
			perm(x,y,a,0)
			if(y)
				perm(x,-y,a,0)
			break;
		case 0:
			a.push({r:x,c:y})
	}
}

var adj = []
perm(1,1,adj)
perm(2,1,adj)
var jump = []
perm(2,2,jump)
var exadj = []
var exjump = []
for(var i = 3; i < (numRow>numCol?numRow:numCol); i++){
	for(var j = 0; j <= i; j++){
		if(j%i)
			perm(i,j,exadj)
		else
			perm(i,j,exjump)
	}
}
//console.log(exjump)
//array.splice(4,1)
//for(var r = 0; r < numRow; r++){
//    for(var c = 0; c < numCol; c++){
//		var p = r*numCol+c
//		map[p] = []
//		var a = map[p]
//        array.forEach( off => {
//			off = {r:off.r+r,c:off.c+c}
//			if(off.r < numRow && off.r >= 0 &&
//			  off.c < numRow && off.c >= 0){
//				a.push(off.r*numCol+off.c)
//			}
//        })
//    }
//}
//console.log(map)
