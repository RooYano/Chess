
//timer function which runs after everything is loaded
window.addEventListener('DOMContentLoaded', () => {

   var timeZero = new Date().getTime();

   var x = setInterval(function() {
   
     // Get today's date and time
     var now = new Date().getTime();
   
     // Find the distance between now and the count down date
     var distance = now - timeZero;
   
     // Time calculations for days, hours, minutes and seconds
     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
   const zeroPad = (num, places) => String(num).padStart(places, '0');

     document.getElementById('timer').innerHTML =  zeroPad(hours, 2)+ 'h '
     + zeroPad(minutes, 2) + 'm ' + zeroPad(seconds,2) + 's ';
   
   }, 1000); //counter updates every second 
});

//128(?) bit array for chess board and pieces

//opening board position. Call this again to reset board(?)
var beginChessBoard = ["rW1", "nW1", "bW1", "qW1", "kW1", "bW2", "nW2", "rW2", "pW1", "pW2", "pW3", "pW4", "pW5", "pW6", "pW7", "pW8", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "pB1", "pB2", "pB3", "pB4", "pB5", "pB6", "pB7", "pB8", "rB1", "nB1", "bB1", "qB1", "kB1", "bB2", "nB2", "rB2"];
let graveyard = ["", "", "", " ", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

let cBL = beginChessBoard; //cBL is short for chess board live
let possibleMoves = [''];

//counts turn to allow white or black to move
let turnCounter = 0;

// Chess Pieces [position, counter 1, counter 2 , counter n...]
// initial position info corresponds to opening location of each piece on the board

// White and Black rook 1,2 respectively
// rook piece = [position info, counter for castling (if moved once, cant castle)]
var rW1 = [0,0];
var rW2 = [7,0];

var rB1 = [56,0];
var rB2 = [63,0];

// W + B  knight 1,2
// knight pience = [position info]
var nW1 = [1];
var nW2 = [6];

var nB1 = [57];
var nB2 = [62];

// W + B bishop 1,2
// bishop piece = [position info]
var bW1  = [2];
var bW2  = [5];

var bB1  = [58];
var bB2  = [61];


// W + B Queen 
// queen piece = [position info]
var qW1 = [3];
var qB1 = [59];

// W + B King 
var kW1= [4];
var kB1= [60];

// W + B pawn in 1-8 files, respectively
// pawn piece = [position info,  first move counter for 2 move conditions]
var pW1 = [8,0];
var pW2 = [9,0];
var pW3 = [10,0];
var pW4 = [11,0];
var pW5 = [12,0];
var pW6 = [13,0];
var pW7 = [14,0];
var pW8 = [15,0];

var pB1 = [48,0];
var pB2 = [49,0];
var pB3 = [50,0];
var pB4 = [51,0];
var pB5 = [52,0];
var pB6 = [53,0];
var pB7 = [54,0];
var pB8 = [55,0];


//begins handling piece, stores piece data into event
//checks the moves the picked up piece is able to make
//redeclare empty array to store the squares a picked up piece is able to move to

function dragstart_handler(ev){
   ev.dataTransfer.setData('text',ev.target.id);

   possibleMoves = [];

   if(ev.target.className.includes('pawn') == true){
      //pawn move function
      console.log('pawn picked up');
      pawnMove(ev.target.id);
   }

   if(ev.target.className.includes('rook') == true){
      //rook move function
      console.log('rook picked up');
      rookMove(ev.target.id);
   }
   if(ev.target.className.includes('knight') == true){
      //knight move function
      console.log('knight picked up');
      knightMove(ev.target.id);
   }
   if(ev.target.className.includes('bishop') == true){
      //bishop move function
      console.log('bishop picked up');
      bishopMove(ev.target.id);
   }
   if(ev.target.className.includes('queen') == true){
      //queen move function
      console.log('queen picked up');
      queenMove(ev.target.id);
   }
   if(ev.target.className.includes('king') == true ){
      //king move function
      console.log('king picked up');
      knightMove(ev.target.id);
   }
}

function dragover_handler(ev) {
   //console.log('dragOver')
   activateSpace(possibleMoves); //test case for movable squares 
   ev.preventDefault();
}

function dragend_handler(ev){
   console.log('drag end');
   resetColor();
}

function drop_handler(ev) {
   console.log('Drop');
   ev.preventDefault();
   // Get the data, which is the id of the drop target
   var data = ev.dataTransfer.getData('text');

   console.log(`value of ${window[data]} before drop is: `+ window[data]);
   cBL[window[data][0]] = '';
   
   ev.target.appendChild(document.getElementById(data));
   let newPiecePos = parseInt(ev.target.id);
   window[data][0] = newPiecePos;


   cBL[newPiecePos] = data;//game logic rewrites ChessBoardLive array (cBL) with updated peice position
   

   //counter for pawns moving twice when starting from original position and rooks for castling
   if(data.charAt(0)=== 'p' || 'r'){
      window[data][1] = 1;
   }


   resetColor();

   turnCounter++;
   var strCounter = turnCounter.toString();
   updateTurn(strCounter);

   possibleMoves.splice(0,possibleMoves.length);//empties array that holds possible moves
}

function updateTurn(a){
   document.getElementById('turncounter').innerHTML = a +' Turn(s)';
}

//function to calculate possible moves for pieces when picked up

function pawnMove(a){
   let pawnPos = cBL.indexOf(a);
   console.log(typeof(a) + ' ' + a + ' ' + pawnPos + ' '  + typeof(pawnPos));

   if(a.charAt(1) ==='W')
   {
      console.log('its a white pawn ' + window[a]);

      if (window[a][1]== 0 && cBL[pawnPos + 16] === '')
      {
         possibleMoves.push(pawnPos + 16);
      }
      if (cBL[pawnPos + 8]=== ''){
         possibleMoves.push(pawnPos + 8);

      }
      if(cBL[pawnPos + 7] !== '' && pawnPos % 8 !== 0){
         possibleMoves.push(pawnPos + 7);

      }
      if(cBL[pawnPos + 9] !== '' && pawnPos % 8 !== 7){
         possibleMoves.push(pawnPos + 9);

      }
   }
   else{
      console.log('its a black pawn');
   }

   //if statement to check if king will be threatened by pawn moving
   /*if(){
      return;
   }
   */

}

function rookMove(a){
   let rookPos = cBL.indexOf(a);
   console.log(a + ' ' + rookPos);

}

function knightMove(a){
   let knightPos = cBL.indexOf(a);
   console.log(a + ' ' + knightPos);

}

function bishopMove(a){
   let bishopPos = cBL.indexOf(a);
   console.log(a + ' ' + bishopPos);

}

function queenMove(a){
   let queenPos = cBL.indexOf(a);
   console.log(a + ' ' + queenPos);

}

function kingMove(a){
   let kingPos = cBL.indexOf(a);
   console.log(a + ' ' + kingPos);

}




//test case for movable squares

// unlocking squares so they can be drop zones for chess pieces
function activateSpace(c){
   for (i = 0; i < c.length; i++){
      let space = document.getElementById(c[i]);
      space.setAttribute('ondrop','drop_handler(event)');
      space.style.backgroundColor = 'rgb(220, 240, 243)';
   }
}

// script to resetr colors back after dragover event ends
function resetColor(){
   for (i=0; i< possibleMoves.length; i++){
      let space = document.getElementById(possibleMoves[i]);
      space.style.backgroundColor = '';
      space.removeAttribute('ondrop');
   }

}

// test for activating space to allow piece placement
function activateSpaceTest(){
   let space = document.getElementById('63');
   space.setAttribute('ondrop','drop_handler(event)');
}



/*var elements= document.getElementsByTagName('td');
for(var i=0; i < elements.length; i++)
{
(elements)[i].addEventListener("click", function(){
   alert(this.innerHTML);
});


//custom drag image script if wanted
/*
let img = new Image();
img.src = ev.target;
ev.dataTransfer.setDragImage(img, 250, 250);  
*/
