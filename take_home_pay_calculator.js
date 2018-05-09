// On DOMContentLoaded, adds event handlers to various inputs,
//  to make the output update in real time whenever inputs are changed
document.addEventListener('DOMContentLoaded', function addTakeHomePayEventHandlers() {
	//This triggers on changing the value of the Income input field
	document.getElementById('inputIncome').oninput = calculateTakeHomePay;
	//These trigger when a Student Loan Type radio button is pressed
	var loanButtons = document.getElementsByClassName('studentLoanButtons')
	for (var i = 0; i < loanButtons.length; i++) {
		loanButtons[i].onclick = calculateTakeHomePay;
	}
});


// taxPayable - calculates the total tax payable based on gross income
// - depends on personalAllowanceCap(), and therefore roundDownToNearest2Pound() also.
// Declarations for taxPayable():
var basic_Rate, higher_Rate, additional_Rate, basic_Rate_Cap, higher_Rate_Cap;
basic_Rate = 0.20;
higher_Rate = 0.40;
additional_Rate = 0.45;
basic_Rate_Cap = 46500;
higher_Rate_Cap = 150000;
// Declarations for the Chart
var chartBasic, chartHigher, chartAdditional;
// Declarations for personalAllowanceCap():
var personal_Allowance_Cap_Basic, personal_Allowance_Max_Income, personal_Allowance_Min_Income;
personal_Allowance_Cap_Basic = 11850;
personal_Allowance_Max_Income = 123700;
personal_Allowance_Min_Income = 100000;
//
function taxPayable(income) {
	if (income >= higher_Rate_Cap) { //if income is over 150k
		chartAdditional = (income - higher_Rate_Cap) * additional_Rate;
		chartHigher = (higher_Rate_Cap - basic_Rate_Cap) * higher_Rate;
		chartBasic = (basic_Rate_Cap - personalAllowanceCap(income)) * basic_Rate;
		return ((income - higher_Rate_Cap) * additional_Rate) + ((higher_Rate_Cap - basic_Rate_Cap) * higher_Rate) + ((basic_Rate_Cap - personalAllowanceCap(income)) * basic_Rate);
	} else if(income >= basic_Rate_Cap) { //if income is over 46.5k
		chartAdditional = 0;
		chartHigher = (income - basic_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income))) * higher_Rate;
		chartBasic = (basic_Rate_Cap - personal_Allowance_Cap_Basic) * basic_Rate;
		return ((income - basic_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income))) * higher_Rate) + ((basic_Rate_Cap - personal_Allowance_Cap_Basic) * basic_Rate);
	} else if(income >= personalAllowanceCap(income)) {
		chartAdditional = 0;
		chartHigher = 0;
		chartBasic = (income - personalAllowanceCap(income)) * basic_Rate;
		return (income - personalAllowanceCap(income)) * basic_Rate;
	} else {
		chartAdditional = 0;
		chartHigher = 0;
		chartBasic = 0;
		return 0;
	}
}
// personalAllowanceCap - calculates the annual Personal Allowance based on gross income
// Functions it depends on: roundDownToNearest2Pound, and taxableIncome (it doesn't depend on taxableIncome anymore, but keeping it here)
function roundDownToNearest2Pound(income){ //rounds a number down to the nearest multiple £2.00
	return 2 * Math.floor(income/2);
}
function taxableIncome(income) {
	return income - personalAllowanceCap(income);
}
//
function personalAllowanceCap(income) { //takes per annum Gross Income as an input, returns annual Personal Allowance
	if (income >= personal_Allowance_Max_Income) {
		return  0;
	} else if (income >= personal_Allowance_Min_Income) {
		return personal_Allowance_Cap_Basic - ((roundDownToNearest2Pound(income) - personal_Allowance_Min_Income) * 0.5 );
	} else {
		return personal_Allowance_Cap_Basic;
	}
}



// - - - //

// planXStudentLoan - calculates the annual student loan plan repayment payable based on gross income
// Declarations for plan1StudentLoan() and plan2StudentLoan():
var plan_1_Student_Loan_Threshold, plan_1_Student_Loan_Rate, plan_2_Student_Loan_Threshold, plan_2_Student_Loan_Rate;
plan_1_Student_Loan_Threshold = 18330;
plan_1_Student_Loan_Rate = 0.09;
plan_2_Student_Loan_Threshold = 25000;
plan_2_Student_Loan_Rate = 0.09;
//
function plan1StudentLoan(income) { //takes per annum Gross Income as an input, returns annual Plan 1 Student Loan payable
	if (income > plan_1_Student_Loan_Threshold) {
		return (income - plan_1_Student_Loan_Threshold) * plan_1_Student_Loan_Rate;
	} else {
		return 0;
	}
}
function plan2StudentLoan(income) { //takes per annum Gross Income as an input, returns annual Plan 2 Student Loan payable
	if (income > plan_2_Student_Loan_Threshold) {
		return (income - plan_2_Student_Loan_Threshold) * plan_2_Student_Loan_Rate;
	} else {
		return 0;
	}
}
// This function selects the right Student Loan Repayment Calculation Function and calculates the monthly repayment based on the Income and Loan Type variables
function studentLoan(income, loanType) {
	if (loanType == "plan2") {
		return plan2StudentLoan(income);
	} else if (loanType == "plan1") {
		return plan1StudentLoan(income);
	} else {
		return 0;
	}
}


// - - - //

// totalNIConts - works out the annual employee NI Contributions payable based on gross income
// Declarations for totalNIConts():
var basic_NI_Conts_Min_Income, higher_NI_Conts_Min_Income, basic_NI_Conts_Rate, higher_NI_Conts_Rate;
basic_NI_Conts_Min_Income = 8424;
basic_NI_Conts_Rate = 0.12;
higher_NI_Conts_Min_Income = 46350;
higher_NI_Conts_Rate = 0.02;
//
function totalNIConts(income){ //takes per annum Gross Income as an input, returns annual NI Contributions payable
	if (income > higher_NI_Conts_Min_Income) {
		return ((income - higher_NI_Conts_Min_Income) * higher_NI_Conts_Rate) + ((higher_NI_Conts_Min_Income - basic_NI_Conts_Min_Income) * basic_NI_Conts_Rate);
	}else if (income > basic_NI_Conts_Min_Income) {
		return (income - basic_NI_Conts_Min_Income) * basic_NI_Conts_Rate;
	} else {
		return 0;
	}
}
