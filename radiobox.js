//On DOMContentLoaded, adds onclick functions to each of the radiobox buttons.
// The onclick hides all three output boxes, then shows the corresponding one.
document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.getElementsByClassName('radiobox-button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      //hides all of the boxes (yearly, monthly, weekly)
      var boxes = document.getElementsByClassName('radiobox')
      for (var j = 0; j < boxes.length; j++) {
        boxes[j].style.display = "none";
      }
      //shows the box for which the corresponding radio button was clicked
      document.getElementById(this.value).style.display = 'block';
    }
  }
});



/* - - - - - - - - - - - */
/**old functionality:

function showyearly() {
  document.getElementById("yearly-box").style.display = "block";
  document.getElementById("monthly-box").style.display = "none";
  document.getElementById("weekly-box").style.display = "none";
}

function showmonthly() {
  document.getElementById("yearly-box").style.display = "none";
  document.getElementById("monthly-box").style.display = "block";
  document.getElementById("weekly-box").style.display = "none";
}

function showweekly() {
  document.getElementById("yearly-box").style.display = "none";
  document.getElementById("monthly-box").style.display = "none";
  document.getElementById("weekly-box").style.display = "block";
}
**/
