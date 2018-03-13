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
