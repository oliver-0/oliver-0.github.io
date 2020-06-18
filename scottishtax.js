// - - - Scottish Income Tax and Personal Allowance Calculations - - - //

// scot_taxPayable - calculates the total tax payable based on gross income
// - depends on function personalAllowanceCap(), and therefore roundDownToNearest2Pound() also.
// // Declarations for scot_taxPayable():
var scot_starter_Rate, scot_basic_Rate, scot_intermediate_Rate, scot_higher_Rate, scot_top_Rate, scot_starter_Rate_Cap, scot_basic_Rate_Cap, scot_intermediate_Rate_Cap, scot_higher_Rate_Cap;
scot_starter_Rate = 0.19; //scottish-only
scot_basic_Rate = 0.20; //rate is same as non-Scottish tax
scot_intermediate_Rate = 0.21; //scottish-only
scot_higher_Rate = 0.41;
//additional_Rate = 0.45; //not used in Scottish Tax
scot_top_Rate = 0.46;
scot_starter_Rate_Cap = 14585;
scot_basic_Rate_Cap = 25158;
scot_intermediate_Rate_Cap = 43430;
scot_higher_Rate_Cap = 150000;
// // Declarations for the Chart outputs
//var chartBasic, chartHigher, chartAdditional; //already declared in "take_home_pay_calculator.js"
var chartStarter, chartIntermediate, chartTop; //scottish-only
// // Declarations for personalAllowanceCap():
var personal_Allowance_Cap_Basic, personal_Allowance_Max_Income, personal_Allowance_Min_Income;
personal_Allowance_Cap_Basic = 12500;
var isBlind = document.getElementById('isBlind').checked;
if (isBlind) {
  personal_Allowance_Cap_Basic = 12500 + 2500; //Blind Person's Allowance
}
personal_Allowance_Cap_noBlind = 12500;
personal_Allowance_Max_Income = 125000;
personal_Allowance_Min_Income = 100000;
//
function scot_taxPayable(income) {
  //initialising these as zeroes each time it runs removes left over values on the chart from previous runs
  chartTop = 0; //scottish-only
  chartAdditional = 0; //not used but should be overwritten
  chartHigher = 0;
  chartIntermediate = 0; //scottish-only
  chartBasic = 0;
  chartStarter = 0; //scottish-only
  if (income >= scot_higher_Rate_Cap) {
      chartTop = (income - scot_higher_Rate_Cap) * scot_top_Rate;
      chartHigher = (scot_higher_Rate_Cap - scot_intermediate_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income)) ) * scot_higher_Rate;
      chartIntermediate = (scot_intermediate_Rate_Cap - scot_basic_Rate_Cap) * scot_intermediate_Rate;
      chartBasic = (scot_basic_Rate_Cap - scot_starter_Rate_Cap) * scot_basic_Rate;
      chartStarter = (scot_starter_Rate_Cap - personal_Allowance_Cap_Basic) * scot_starter_Rate;
    return chartTop + chartHigher + chartIntermediate + chartBasic + chartStarter;
  } else if (income >= scot_intermediate_Rate_Cap) {
      chartHigher = (income - scot_intermediate_Rate_Cap + (personal_Allowance_Cap_Basic - personalAllowanceCap(income)) ) * scot_higher_Rate;
      chartIntermediate = (scot_intermediate_Rate_Cap - scot_basic_Rate_Cap) * scot_intermediate_Rate;
      chartBasic = (scot_basic_Rate_Cap - scot_starter_Rate_Cap) * scot_basic_Rate;
      chartStarter = (scot_starter_Rate_Cap - personal_Allowance_Cap_Basic) * scot_starter_Rate;
    return chartHigher + chartIntermediate + chartBasic + chartStarter;
  } else if (income >= scot_basic_Rate_Cap) {
      chartIntermediate = (income - scot_basic_Rate_Cap) * scot_intermediate_Rate;
      chartBasic = (scot_basic_Rate_Cap - scot_starter_Rate_Cap) * scot_basic_Rate;
      chartStarter = (scot_starter_Rate_Cap - personal_Allowance_Cap_Basic) * scot_starter_Rate;
    return chartIntermediate + chartBasic + chartStarter;
  } else if (income >= scot_starter_Rate_Cap) {
      chartBasic = (income - scot_starter_Rate_Cap) * scot_basic_Rate;
      chartStarter = (scot_starter_Rate_Cap - personal_Allowance_Cap_Basic) * scot_starter_Rate;
    return chartBasic + chartStarter;
  } else if (income >= personal_Allowance_Cap_Basic) {
      chartStarter = (income - personal_Allowance_Cap_Basic) * scot_starter_Rate;
    return chartStarter;
  } else {
    return 0;
  }
}




// personalAllowanceCap - calculates the annual Personal Allowance based on gross income
// Functions it depends on: roundDownToNearest2Pound()
// no different - already defined in "take_home_pay_calculator.js"


// - - - Student Loan Calculation - - - //
// no different - already defined in "take_home_pay_calculator.js"


// - - - Total NI Contributions Calculation - - - //
// no different - already defined in "take_home_pay_calculator.js"
