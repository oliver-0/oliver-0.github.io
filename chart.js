google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var chartPlaceholder = "Enter a salary";
  var income = document.getElementById('inputIncome').value;
  var studentLoanType = document.querySelector('select[id="studentLoan"]').value;
  var NIExemption = document.getElementById('noNI').checked;
  var after_Tax_Annual = (income - taxPayable(income) - studentLoan(income, studentLoanType) - totalNIContsModified(income, NIExemption));
  var takeHome = (1/100)*Math.floor((after_Tax_Annual)*100);
    takeHome = parseInt(takeHome.toFixed(0));
  var NIConts = totalNIContsModified(income, NIExemption);
    NIConts = parseInt(NIConts.toFixed(0));
  var studentLoan1, studentLoan2;
  if (studentLoanType == "plan2") {
    studentLoan1 = 0;
    studentLoan2 = studentLoan(income, studentLoanType);
      studentLoan2 = parseInt(studentLoan2.toFixed(0));
  } else if (studentLoanType == "plan1") {
    studentLoan1 = studentLoan(income, studentLoanType);
      studentLoan1 = parseInt(studentLoan1.toFixed(0));
    studentLoan2 = 0;
  } else {
    studentLoan1 = 0;
    studentLoan2 = 0;
  }
    chartBasic = parseInt(chartBasic.toFixed(0));
    chartHigher = parseInt(chartHigher.toFixed(0));
    chartAdditional = parseInt(chartAdditional.toFixed(0));

  var data = google.visualization.arrayToDataTable([
    ['Portion', '£'],
    ['Basic Rate Tax (20%)', chartBasic],
    ['Higher Rate Tax (40%)', chartHigher],
    ['Additional Rate Tax (45%)', chartAdditional],
    ['NI Contributions', NIConts],
    ['Student Loan (Plan 1)', studentLoan1],
    ['Student Loan (Plan 2)', studentLoan2],
    ['Take-Home Pay', takeHome]
  ]);

  /*var formatter = new google.visualization.NumberFormat(
    {pattern: '£#,##0'}
  );*/
  var formatter = new google.visualization.NumberFormat(
    {prefix: '£'}
  );
  formatter.format(data, 1);


  var options = {
    title: 'Breakdown of yearly earnings',
    titleArea:{left:30},
    pieSliceText: 'none',
    chartArea:{left:0,top:30,bottom:10,width:"100%",height:"100%"},
    //pieSliceTextStyle: {fontSize: 8}
  };

  var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  //chart.draw(data, options);

  if (chartBasic + chartHigher + chartAdditional + studentLoan1 + studentLoan2 + NIConts + takeHome == 0) {
    document.getElementById("pieChart").innerHTML="";
    chart.draw(data, options);
  } else {
    document.getElementById("pieChart").innerHTML="";
    chart.draw(data, options);
  }
}
