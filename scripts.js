//calculateTakeHomePay() can be found in a <script> tag at the bottom of index.html
//initial calculateTakeHomePay run to handle auto-filled inputs (inputs that have values on pageload) - timeout is to cover google chart loadtime
window.setTimeout(calculateTakeHomePay, 750);


//Subsequent calculateTakeHomePay runs whenever an input value is changed
document.getElementById('inputIncome').oninput = calculateTakeHomePay;
document.getElementById('studentLoan').onchange = calculateTakeHomePay;
document.getElementById('noNI').onchange = calculateTakeHomePay;
document.getElementById('scottishTax').onchange = calculateTakeHomePay;
document.getElementById('inputPension').oninput = calculateTakeHomePay;
document.getElementById('isBlind').onchange = calculateTakeHomePay;


//Popup functions
function togglePopup() {
  classListToggle("popup-studentLoan", "visible");
}
document.getElementById('popupButton').onclick = togglePopup;
document.getElementById('popup-studentLoan').onclick = togglePopup;
document.getElementById('popupButton').onblur = function hidePopup() {
  document.getElementById('popup-studentLoan').classList.remove("visible");
};


//Remove keyboard focus from input elements on press Enter - hides mobile number input keyboards when you press 'Go'.
var inputs = document.getElementsByClassName('input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup',function(e){
    if (e.which == 13) this.blur();
  });
}


//added a drawChart to window.resize, so that when resizing in and out of the mobile threshold the chart doesn't overflow the page width
width = window.innerWidth;
window.addEventListener('resize', drawChartCheck);
function drawChartCheck() {
    if (width !== window.innerWidth) {
    drawChart(); //prevents drawChart from running where width did not change on resize - stops screen jumping from chart update when mobile browsers' address bars show/hide
  }
  width = window.innerWidth;
}


//add comma thousand separators to a number
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


//show & hide 'More Options box' on click of the header box, using classList.toggle
document.getElementById('advancedHeader').onclick = function toggleAdvancedContent() {
  classListToggle("advancedHeader", "active");
};
  //also show/hide More Options on press Enter or Spacebar
document.getElementById('advancedHeader').addEventListener('keyup',function(e){
  if (e.which === 13 || e.which === 32) classListToggle("advancedHeader", "active");
});


//IE&Edge-compatible equivalent to classList.toggle
function classListToggle(elementID, classToToggle) {
  //this.classList.toggle("active"); //old one-liner that worked for all but IE/Edge
  var e = document.getElementById(elementID);
  if (e.classList) {
  e.classList.toggle(classToToggle);
  } else {
  // For IE9+
  var classes = e.className.split(" ");
  var i = classes.indexOf(classToToggle);
  if (i>=0)
  classes.splice(i,1);
  else
  classes.push(classToToggle);
  e.className = classes.join(" ");
  }
}