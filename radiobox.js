  var buttons = document.getElementsByClassName('radiobox-button')
  for (var buttonsIndex = 0; buttonsIndex < buttons.length; buttonsIndex++) {
    buttons[buttonsIndex].onclick = showBox;
  }


function showBox() {
  //hides all of the radioboxes (yearly, monthly, weekly)
  var boxes = document.getElementsByClassName('radiobox-content')
  for (var boxesIndex = 0; boxesIndex < boxes.length; boxesIndex++) {
    boxes[boxesIndex].style.display = "none";
  }
  //shows the box for which the corresponding radio button was clicked
  document.getElementById(this.value).style.display = 'block';
}
