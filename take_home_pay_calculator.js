// taxPayable_function - calculates the total tax payable based on gross income
// - depends on personalAllowanceCap_function(), and therefore roundDownToNearest2Pound_function() also.
// Declarations for taxPayable_function():
var basic_Rate, higher_Rate, additional_Rate, basic_Rate_Cap, higher_Rate_Cap;
basic_Rate = 0.20;
higher_Rate = 0.40;
additional_Rate = 0.45;
basic_Rate_Cap = 45000;
higher_Rate_Cap = 150000;
//#if gross_Income >= higher_Rate_Cap, tax_Payable = (( gross_Income - higher_Rate_Cap ) * additional_Rate ) + (( higher_Rate_Cap - basic_Rate_Cap ) * higher_Rate ) + (( basic_Rate_Cap - personal_Allowance_Cap ) * basic_Rate ), 
//#elseif gross_Income >= basic_Rate_Cap, tax_Payable = (( gross_Income - basic_Rate_Cap ) * higher_Rate ) + (( higher_Rate_Cap - personal_Allowance_Cap ) * basic_Rate ), 
//#elseif gross_Income >= personal_Allowance_Cap, tax_Payable = (gross_Income - personal_Allowance_Cap ) * basic_Rate, 
//#else tax_Payable = 0 
function taxPayable_function(gross_Income) {
	if (gross_Income >= higher_Rate_Cap) {
		console.log("higher")
		return ((gross_Income - higher_Rate_Cap) * additional_Rate) + ((higher_Rate_Cap - basic_Rate_Cap) * higher_Rate) + ((basic_Rate_Cap - personalAllowanceCap_function(gross_Income)) * basic_Rate);
	} else if(gross_Income >= basic_Rate_Cap) {
		console.log("yes")
		return ((gross_Income - basic_Rate_Cap) * higher_Rate) + ((basic_Rate_Cap - personalAllowanceCap_function(gross_Income)) * basic_Rate);
	} else if(gross_Income >= personalAllowanceCap_function(gross_Income)) {
		return (gross_Income - personalAllowanceCap_function(gross_Income)) * basic_Rate;
	} else {
		return 0;
	}
}


// personalAllowanceCap_function - calculates the annual Personal Allowance based on gross income
// Declarations for personalAllowanceCap_function():
var personal_Allowance_Cap_Basic, personal_Allowance_Max_Income, personal_Allowance_Min_Income;
personal_Allowance_Cap_Basic = 11500;
personal_Allowance_Max_Income = 123000;
personal_Allowance_Min_Income = 100000;
function roundDownToNearest2Pound_function(gross_Income){ //rounds a number down to the nearest multiple £2.00
	return 2 * Math.floor(gross_Income/2);
}
function taxable_Income() {
	return gross_Income - personalAllowanceCap_function(gross_Income);
}
//#if gross_Income >= personal_Allowance_Max_Income, personal_Allowance_Cap = 0, 
//#elseif gross_Income >= personal_Allowance_Min_Income, personal_Allowance_Cap = personal_Allowance_Cap_Basic - (( roundDownToNearest2Pound_function( gross_Income ) - personal_Allowance_Min_Income ) * 0.5 ), 
//#else personal_Allowance_Cap = personal_Allowance_Cap_Basic
function personalAllowanceCap_function(gross_Income) { //takes per annum Gross Income as an input, returns annual Personal Allowance
	if (gross_Income >= personal_Allowance_Max_Income) {
		return  0;
	} else if (gross_Income >= personal_Allowance_Min_Income) {
		return personal_Allowance_Cap_Basic - ((roundDownToNearest2Pound_function(gross_Income) - personal_Allowance_Min_Income) * 0.5 );
	} else {
		return personal_Allowance_Cap_Basic;
	}
}



// - - - // 

// planXStudentLoan_function - calculates the annual student loan plan (X = 1 or 2) repayment payable based on gross income
// Declarations for plan1StudentLoan_function() and plan2StudentLoanFunction():
var plan_1_Student_Loan_Threshold, plan_1_Student_Loan_Rate, plan_2_Student_Loan_Threshold, plan_2_Student_Loan_Rate;
plan_1_Student_Loan_Threshold = 17775;
plan_1_Student_Loan_Rate = 0.09;
plan_2_Student_Loan_Threshold = 21000;
plan_2_Student_Loan_Rate = 0.09;
//#if gross_Income > plan_n_Student_Loan_Threshold, then plan_n_Student_Loan = ( gross_Income - plan_n_Student_Loan_Threshold ) * plan_n_Student_Loan_Rate, 
//#else plan_n_Student_Loan = 0
function plan1StudentLoan_function(gross_Income) { //takes per annum Gross Income as an input, returns annual Plan 1 Student Loan payable
	if (gross_Income > plan_1_Student_Loan_Threshold) {
		return (gross_Income - plan_1_Student_Loan_Threshold) * plan_1_Student_Loan_Rate;
	} else {
		return 0;
	}
}
function plan2StudentLoan_function(gross_Income) { //takes per annum Gross Income as an input, returns annual Plan 2 Student Loan payable
	if (gross_Income > plan_2_Student_Loan_Threshold) {
		return (gross_Income - plan_2_Student_Loan_Threshold) * plan_2_Student_Loan_Rate;
	} else {
		return 0;
	}
}



// - - - //

// totalNIConts_function - works out the annual employee NI Contributions payable based on gross income
// Declarations for totalNIConts_function():
var basic_NI_Conts_Min_Income, higher_NI_Conts_Min_Income, basic_NI_Conts_Rate, higher_NI_Conts_Rate;
basic_NI_Conts_Min_Income = 8164;
basic_NI_Conts_Rate = 0.12;
higher_NI_Conts_Min_Income = 45032;
higher_NI_Conts_Rate = 0.02;
//#if gross_Income > higher_NI_Conts_Min_Income, then total_NI_Conts = (( gross_Income - higher_NI_Conts_Min_Income ) * higher_NI_Conts_Rate ) + basic_NI_Conts_Rate * ( higher_NI_Conts_Min_Income - basic_NI_Conts_Min_Income ), 
//#elseif gross_Income > basic_NI_Conts_Min_Income, then total_NI_Conts = ( gross_Income - basic_NI_Conts_Min_Income ) * basic_NI_Conts_Rate, 
//#else total_NI_Conts = 0
function totalNIConts_function(gross_Income){ //takes per annum Gross Income as an input, returns annual NI Contributions payable
	if (gross_Income > higher_NI_Conts_Min_Income) { 
		return ((gross_Income - higher_NI_Conts_Min_Income) * higher_NI_Conts_Rate) + ((higher_NI_Conts_Min_Income - basic_NI_Conts_Min_Income) * basic_NI_Conts_Rate);
	}else if (gross_Income > basic_NI_Conts_Min_Income) {
		return (gross_Income - basic_NI_Conts_Min_Income) * basic_NI_Conts_Rate; 
	} else {
		return 0;
	}
}

