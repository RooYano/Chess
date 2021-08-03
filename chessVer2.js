//128(?) bit array for chess board and pieces

//opening board position. Call this again to reset board(?)
let beginChessBoard = ["rW1", "nW1", "bW1", "qW1", "kW1", "bW2", "nW2", "rW2", "pW1", "pW2", "pW3", "pW4", "pW5", "pW6", "pW7", "pW8", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "pB1", "pB2", "pB3", "pB4", "pB5", "pB6", "pB7", "pB8", "", "", "", "", "", "", "", ""];
let graveyard = ["", "", "", " ", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];



//array maker
/*
b = '';
function a(){
    for (i=0; i<128; i++){
        b = b + '/'/'' +  + ',';
    }
}
a();
console.log('['+b + ']')
*/

//array maker ver2
/*
Array(1000).fill("");
*/

//Chess Pieces

//White and Black rook 1,2 respectively
let rW1 = [1];
let rW2 = [1];

let rB1 = [1];
let rB2 = [1];

//W + B  knight 1,2
let nW1 = [];
let nW2 = [];

let nB1 = [];
let nB2 = [];

//W + B bishop 1,2
let bW1  = [];
let bW2  = [];

let bB1  = [];
let bB2  = [];


//W + B Queen 
let qW1 = [];
let qB1 = [];

//W + B King 
let kW1= [];
let kB1= [];

//W + B pawn in 1-8 files, respectively
let pW1 = [];
let pW2 = [];
let pW3 = [];
let pW4 = [];
let pW5 = [];
let pW6 = [];
let pW7 = [];
let pW8 = [];

let pB1 = [];
let pB2 = [];
let pB3 = [];
let pB4 = [];
let pB5 = [];
let pB6 = [];
let pB7 = [];
let pB8 = [];