var line1 = ['rW', 'nW', 'bW', 'qW', 'kW', 'bW', 'nW', 'rW'];
var line2 = ['pW', 'pW', 'pW', 'pW', 'pW', 'pW', 'pW', 'pW'];
var line3 = [''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  ];
var line4 = [''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  ];
var line5 = [''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  ];
var line6 = [''  , ''  , ''  , ''  , ''  , ''  , ''  , ''  ];
var line7 = ['pB', 'pB', 'pB', 'pB', 'pB', 'pB', 'pB', 'pB'];
var line8 = ['rB', 'nB', 'bB', 'qB', 'kB', 'bB', 'nB', 'rB'];

var chessBoard = [line1, line2, line3, line4, line5, line6, line7, line8];

let img = new Image();
img.src = 'images/nero.gif';


 //dragging script

function dragstart_handler(ev) {
   // Add the target element's id to the data transfer object
   console.log('drag start');
   ev.dataTransfer.setData('text/plain', ev.target.id);
   ev.dataTransfer.setDragImage(img, 250, 250);   
   console.log(ev.target);  // to get the element 
}

 window.addEventListener('DOMContentLoaded', () => {
   
   //timer runs after everything loaded
   var timeZero = new Date().getTime();

   // Update the count down every 1 second
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
   
     // Display the result in the element with id="demo"
     document.getElementById('timer').innerHTML =  zeroPad(hours, 2)+ 'h '
     + zeroPad(minutes, 2) + 'm ' + zeroPad(seconds,2) + 's ';
   
     // If the count down is finished, write some text
   
   }, 1000);
   
   //event listener
const element = document.getElementById('smily');
   // Add the ondragstart event listener
console.log('step 1');
element.addEventListener('dragstart', dragstart_handler);

});


function dragover_handler(ev) {
   //console.log('dragOver');
   activateSpace(c); //test case for movable squares 
   ev.preventDefault();
}

//test case for movable squares
let c = [16,17,18];

function activateSpace(c){
   for (i = 0; i < c.length; i++){
      let space = document.getElementById(c[i]);
      space.setAttribute('ondrop','drop_handler(event)');
      space.style.backgroundColor = 'rgb(220, 240, 243)';
   }
}

//script to resetr colors back after dragover event ends
function resetColor(){
   for (i=0; i< c.length; i++){
      let space = document.getElementById(c[i]);
      space.style.backgroundColor = '';
      space.removeAttribute('ondrop');
   }
   console.log('is this it');
   c = [];
}


function drop_handler(ev) {
   console.log('Drop');
   ev.preventDefault();
   // Get the data, which is the id of the drop target
   var data = ev.dataTransfer.getData('text');
   ev.target.appendChild(document.getElementById(data));
   resetColor();
}

//test for activating space to allow piece placement
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


//var pawnWhite function (){};
*/