//Try moving all of the scripts out of the HTML. You can use the below function to initialise some event listeners
// try using a function to make all of the boxes hidden (use getElementsbyclassname? idk) and then use 'this' to get the clicked one to show up
/*
document.addEventListener('DOMContentLoaded', function() {
    alert("Ready!");
}, false);
*/

document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.getElementsByClassName('radiobox-button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      ////hides all of the boxes (yearly, monthly, weekly)
      var boxes = document.getElementsByClassName('radiobox')
      for (var j = 0; j < boxes.length; j++) {
        boxes[j].style.display = "none";
      }
      ////shows the box for which the corresponding radio button was clicked
      //document.getElementById('yearly-box').style.display = "none";
      document.getElementById(this.value).style.display = 'block';
      console.log(this.value);

    }
  }
});


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
