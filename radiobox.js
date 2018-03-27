//On DOMContentLoaded, adds onclick functions to each of the radiobox buttons.
// The onclick hides all three output boxes, then shows the corresponding one.
document.addEventListener('DOMContentLoaded', function addRadioboxOnclicks() {
  var buttons = document.getElementsByClassName('radiobox-button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = showBox;
  }
});

function showBox() {
  //hides all of the radioboxes (yearly, monthly, weekly)
  var boxes = document.getElementsByClassName('radiobox')
  for (var j = 0; j < boxes.length; j++) {
    boxes[j].style.display = "none";
  }
  //shows the box for which the corresponding radio button was clicked
  document.getElementById(this.value).style.display = 'block';
}
