// - - - Income Tax and Personal Allowance Calculations - - - //
//
// taxPayable - calculates the total tax payable based on gross income
// - depends on function personalAllowanceCap(), and therefore roundDownToNearest2Pound() also.
// Declarations for taxPayable():
var basic_Rate, higher_Rate, additional_Rate, basic_Rate_Cap, higher_Rate_Cap;
basic_Rate = 0.20;
higher_Rate = 0.40;
additional_Rate = 0.45;
basic_Rate_Cap = 50000;
higher_Rate_Cap = 150000;
// Declarations for the Chart outputs
var chartBasic, chartHigher, chartAdditional;
// Declarations for personalAllowanceCap():
var personal_Allowance_Cap_Basic, personal_Allowance_Max_Income, personal_Allowance_Min_Income;
personal_Allowance_Cap_Basic = 12500;
personal_Allowance_Max_Income = 125000;
personal_Allowance_Min_Income = 100000;
//
function taxPayable(income) {
  chartAdditional = 0; //initialising these as zeroes each time it runs removes left over values from previous instances of the calculation
  chartHigher = 0;
  chartBasic = 0;
  if (income >= higher_Rate_Cap) { //if income is over £150k, you get all three tax bands.
  chartAdditional = (income - higher_Rate_Cap) * additional_Rate;
  chartHigher = (higher_Rate_Cap - basic_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income)) ) * higher_Rate;
  chartBasic = (basic_Rate_Cap - personal_Allowance_Cap_Basic) * basic_Rate;
  return ((income - higher_Rate_Cap) * additional_Rate) + ((higher_Rate_Cap - basic_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income)) ) * higher_Rate) + ((basic_Rate_Cap - personal_Allowance_Cap_Basic) * basic_Rate);
  } else if(income >= basic_Rate_Cap) { //if income is over £46.5k (and under £150k), you only get Basic and Higher Rate Tax.
  chartHigher = (income - basic_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income))) * higher_Rate;
  chartBasic = (basic_Rate_Cap - personal_Allowance_Cap_Basic) * basic_Rate;
  return ((income - basic_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income))) * higher_Rate) + ((basic_Rate_Cap - personal_Allowance_Cap_Basic) * basic_Rate);
  } else if(income >= personal_Allowance_Cap_Basic) { //if income is over £11,850 (and under £46.5k) you only get Basic Rate Tax.
  chartBasic = (income - personal_Allowance_Cap_Basic) * basic_Rate;
  return (income - personal_Allowance_Cap_Basic) * basic_Rate;
  } else {
  return 0;
  }
}
// personalAllowanceCap - calculates the annual Personal Allowance based on gross income
// Functions it depends on: roundDownToNearest2Pound()
function roundDownToNearest2Pound(income){ //rounds a number down to the nearest multiple £2.00
  return 2 * Math.floor(income/2);
}
function personalAllowanceCap(income) { //takes per annum Gross Income as an input, returns annual Personal Allowance
  var isBlind = document.getElementById('isBlind').checked;
  if (isBlind === true) {
  income = income + 2500; //personal allowance is income-dependant, not taxable income-dependant, so for Blind people it takes into account income before blind allowance is removed
  }
  if (income >= personal_Allowance_Max_Income) { //personal allowance over £123,700 is £0
  return  0;
  } else if (income >= personal_Allowance_Min_Income) { //personal allowance over £100,000 is variable (goes down by £1 every £2 you go over £100,000 income)
  return personal_Allowance_Cap_Basic - ((roundDownToNearest2Pound(income) - personal_Allowance_Min_Income) * 0.5 );
  } else { //personal allowance under £100,000 is £11,850
  return personal_Allowance_Cap_Basic;
  }
}



// - - - Student Loan Calculation - - - //

// planXStudentLoan - calculates the annual student loan plan repayment payable based on gross income
var plan_1_Student_Loan_Threshold, plan_1_Student_Loan_Rate, plan_2_Student_Loan_Threshold, plan_2_Student_Loan_Rate;
plan_1_Student_Loan_Threshold = 19390;
plan_1_Student_Loan_Rate = 0.09;
plan_2_Student_Loan_Threshold = 26575;
plan_2_Student_Loan_Rate = 0.09;
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
  if (loanType === "plan2") {
    return plan2StudentLoan(income);
  } else if (loanType === "plan1") {
    return plan1StudentLoan(income);
  } else {
    return 0;
  }
}



// - - - Total NI Contributions Calculation - - - //

// totalNIConts - works out the annual employee NI Contributions payable based on gross income
// Declarations for totalNIConts():
var basic_NI_Conts_Min_Income, higher_NI_Conts_Min_Income, basic_NI_Conts_Rate, higher_NI_Conts_Rate;
basic_NI_Conts_Min_Income = 9500;
basic_NI_Conts_Rate = 0.12;
higher_NI_Conts_Min_Income = 50000;
higher_NI_Conts_Rate = 0.02;
function totalNIConts(income){ //takes per annum Gross Income as an input, returns annual NI Contributions payable
  if (income > higher_NI_Conts_Min_Income) {
    return ((income - higher_NI_Conts_Min_Income) * higher_NI_Conts_Rate) + ((higher_NI_Conts_Min_Income - basic_NI_Conts_Min_Income) * basic_NI_Conts_Rate);
  } else if (income > basic_NI_Conts_Min_Income) {
    return (income - basic_NI_Conts_Min_Income) * basic_NI_Conts_Rate;
  } else {
    return 0;
  }
}
//modified function to accept 2nd argument, for those exempt to paying National Insurance
function totalNIContsModified(income, exemption) {
  if (exemption === true) {
    return 0;
  } else {
    return totalNIConts(income);
  }
}
