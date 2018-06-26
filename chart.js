google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  //drawChart() is called at the end of calculateTakeHomePay(), and on window.resize
	var income = document.getElementById('inputIncome').value * (1 - document.getElementById('pension-input').value/100);
	var pension = document.getElementById('inputIncome').value * (document.getElementById('pension-input').value/100);
  var studentLoanType = document.querySelector('select[id="studentLoan"]').value;
	var isScottishTax = document.getElementById('scottishTax').checked;
	var NIExemption = document.getElementById('noNI').checked;
	var isBlind = document.getElementById('isBlind').checked;
	function tax(x) {
	  if (isBlind === true) {
			if (isScottishTax === true) {
				return scot_taxPayable(x - 2390);
			} else {
				return taxPayable(x - 2390);
			}
	  } else {
			if (isScottishTax === true) {
				return scot_taxPayable(x);
			} else {
				return taxPayable(x);
			}
	  }
	}
  var after_Tax_Annual = (income - tax(income) - studentLoan(income, studentLoanType) - totalNIContsModified(income, NIExemption));
  var takeHome = (1/100)*Math.floor((after_Tax_Annual)*100);
  var NIConts = totalNIContsModified(income, NIExemption);
  var studentLoan1, studentLoan2;
  if (studentLoanType == "plan2") {
    studentLoan1 = 0;
    studentLoan2 = studentLoan(income, studentLoanType);
  } else if (studentLoanType == "plan1") {
    studentLoan1 = studentLoan(income, studentLoanType);
    studentLoan2 = 0;
  } else {
    studentLoan1 = 0;
    studentLoan2 = 0;
  }

  var data;
  var non_scot_data = google.visualization.arrayToDataTable([
    ['Portion', '£'],
    ['Basic Rate Tax (20%)', chartBasic],
    ['Higher Rate Tax (40%)', chartHigher],
    ['Additional Rate Tax (45%)', chartAdditional],
    ['NI Contributions', NIConts],
    ['Student Loan (Plan 1)', studentLoan1],
    ['Student Loan (Plan 2)', studentLoan2],
    ['Pension Contributions', pension],
    ['', 0], //placeholder
    ['Take-Home Pay', takeHome]
  ]);

  var scot_data = google.visualization.arrayToDataTable([
    ['Portion', '£'],
    ['Starter Rate Tax (19%)', chartStarter],
    ['Basic Rate Tax (20%)', chartBasic],
    ['Intermediate Rate Tax (21%)', chartIntermediate],
    ['Higher Rate Tax (41%)', chartHigher],
    ['Top Rate Tax (46%)', chartTop],
    ['NI Contributions', NIConts],
    ['Student Loan (Plan 1)', studentLoan1],
    ['Student Loan (Plan 2)', studentLoan2],
    ['Pension Contributions', pension],
    ['', 0], //placeholder
    ['Take-Home Pay', takeHome]
  ]);

  if (document.getElementById('scottishTax').checked === true) {
    data = scot_data;
  } else {
    data = non_scot_data;
  }

  var formatter = new google.visualization.NumberFormat(
    {prefix: '£', fractionDigits: 0}
  );
  formatter.format(data, 1);


  var options = {
    title: 'Breakdown of yearly earnings',
    titleArea:{left:30},
    //width: 400,
    height: 198,
    pieSliceText: 'none',
    chartArea:{left:0,top:30,bottom:10,width:"100%",height:"100%"},
  };

  var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
  //chart.draw(data, options);
  if (chartBasic + chartHigher + chartAdditional + studentLoan1 + studentLoan2 + NIConts + takeHome === 0) {
    chart.draw(data, options);
  } else {
    chart.draw(data, options);
  }
}
