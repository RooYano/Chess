
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

function dragstart_handler(ev){
   console.log('step 1' + ev.target);  
   ev.dataTransfer.setData('text',ev.target.id);
   console.log('working ?' +ev);
}

function dragover_handler(ev) {
   //console.log('dragOver');
   activateSpace(c); //test case for movable squares 
   ev.preventDefault();
}

function drop_handler(ev) {
   console.log('Drop');
   ev.preventDefault();
   // Get the data, which is the id of the drop target
   var data = ev.dataTransfer.getData('text');
   ev.target.appendChild(document.getElementById(data));
   resetColor();
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

//custom drag image script if wanted
/*
let img = new Image();
img.src = ev.target;
ev.dataTransfer.setDragImage(img, 250, 250);  
*/