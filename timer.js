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
 