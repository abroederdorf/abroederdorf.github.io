/*******************************
* Author: Alicia Broederdorf
* May 28, 2016
* Description: Add trip report Page Script for Alpine Alicia
*******************************/

// Initialize Firebase
var config = {
apiKey: "AIzaSyBzPdO9Fo3M3kflIueWN_fmTtMV_upLygU",
authDomain: "project-5802414869996009310.firebaseapp.com",
databaseURL: "https://project-5802414869996009310.firebaseio.com",
storageBucket: "project-5802414869996009310.appspot.com",
};
firebase.initializeApp(config);


//validateInput()
//Validate all of the input data provided in the form
//Inout: No direct input, will read values from form fields
//Output: If any errors are found, messages will be displayed before the
//corresponding input field and returns false
function validateInput()
{
	var numErrors = 0;
	
	//Hide error messages to start clean
	hideErrorMessages();

	//Check that name is not empty
	var str = document.getElementById('submitName').value;
	if (str == "")
	{
		document.getElementById("nameError").style.display = "block";
		numErrors++;
	}
		
	//Check the dates
	var number1 = document.getElementById("submitMonth").value;
	var month = Number(number1);
	if (month < 1 || month > 12)
	{
		document.getElementById("monthError").style.display = "block";
		numErrors++;
	}
	
	var number2 = document.getElementById("submitYear").value;
	var year = Number(number2);
	if (year < 2008)
	{
		document.getElementById("yearError").style.display = "block";
		numErrors++;
	}
	
	var number3 = document.getElementById("submitDay").value;
	var day = Number(number3);
	if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
	{
		if (day < 1 || day > 30)
		{
			document.getElementById("dayError").style.display = "block";
			numErrors++;
		}
	}
	else if (month == 2)
	{
		var yearMod = year % 4;
			//console.log("Year mod: " + yearMod);
		if (yearMod == 0) 
		{
			if (day < 1 || day > 29)
			{
				document.getElementById("dayError").style.display = "block";
				numErrors++;
			}
		}
		else
		{
			if (day < 1 || day > 28)
			{
				document.getElementById("dayError").style.display = "block";
				numErrors++;
			}
		}
	}
	else
	{
		if (day < 1 || day > 31)
		{
			document.getElementById("dayError").style.display = "block";
			numErrors++;
		}
	}	
		
	
	//Check Distance Inputs
	var dist, elev;
	number = document.getElementById("submitDistance").value;
	dist = Number(number);
	number = document.getElementById("submitElevation").value;
	elev = Number(number);
	if ((dist < 0) || (elev < 0))
	{
		document.getElementById("distElevError").style.display = "block";
		numErrors++;
	}
	
	if (numErrors == 0)
		return true;
	else
		return false;
}

//submitForm()
//Submits form by first calling validation, then adding data to database
//Input: None
//Output: None
function submitForm()
{
	if (validateInput())
	{
		//Get data
		//console.log("No errors, get data");
		var name, type, month, day, year, distance, elevation, region, subregion, imageLink, pageLink, searchTerms, keyId, str;
		name = document.getElementById('submitName').value;
		type = document.getElementById('submitType').value;
		month = document.getElementById('submitMonth').value;
		day = document.getElementById('submitDay').value;
		year = document.getElementById('submitYear').value;
		distance = document.getElementById('submitDistance').value;
		elevation = document.getElementById('submitElevation').value;
		imageLink = document.getElementById('submitImage').value;
		pageLink = document.getElementById('submitPage').value;
		searchTerms = document.getElementById('submitTerms').value;
		keyId = document.getElementById('hiddenKey').value;
		
		var bool = false;
		for (var i = 1; i < 7; i++)
		{
			str = "submitLoc" + i;
			if (document.getElementById(str).checked)
			{
				region = document.getElementById(str).value;
				bool = true;
			}
		}
		if (!bool)
			region = "";
		bool = false;
		for (var i = 1; i < 25; i++)
		{
			str = "submitSub" + i;
			if (document.getElementById(str).checked)
			{
				subregion = document.getElementById(str).value;
				bool = true;
			}
		}
		if (!bool)
			subregion = "";
		
		//Add trip report to database
		firebase.database().refFromURL("https://project-5802414869996009310.firebaseio.com/" + keyId).set({name: name, type: type, month: month, day: day, year: year, pageLink: pageLink, imageLink: imageLink, region: region, subregion: subregion, searchTerms: searchTerms, distance: distance, elevation: elevation}, function(error) {
			if (error){
				document.getElementById('operationStatus').textContent = "Trip report could not be updated." + error;
			}
			else {
				document.getElementById('operationStatus').textContent = "Trip report updated successfully.";
				resetForm();
			}
		});
	}
	else
	{
		console.log("Check form, errors.");
	}
	
	document.getElementById("modifyForm").style.display = "none";
	submitSearchForm();
}

//hideErrorMessages()
//Hides divs that contain the error messages for the input form
//Input: Non
//Output: Nothing, but divs' style.display are set to none
function hideErrorMessages()
{
	document.getElementById("dateErrorUnfilled").style.display = "none";
	document.getElementById("dateErrorDay").style.display = "none";
	document.getElementById("dateErrorLessThan").style.display = "none";
	document.getElementById("nameError").style.display = "none";
	document.getElementById("monthError").style.display = "none";
	document.getElementById("dayError").style.display = "none";
	document.getElementById("yearError").style.display = "none";
	document.getElementById("distElevError").style.display = "none";
	
}

//resetSearchForm()
//Reset form fields to blank
//Input: None
//Output: No values in input fields
function resetSearchForm()
{
	//Text Fields
	document.getElementById("searchName2").value = "";
	document.getElementById("searchMonthFrom").value = "";
	document.getElementById("searchDayFrom").value = "";
	document.getElementById("searchYearFrom").value = "";
	document.getElementById("searchMonthTo").value = "";
	document.getElementById("searchDayTo").value = "";
	document.getElementById("searchYearTo").value = "";
	
	//Hide error messages
	hideErrorMessages();
}

//initializePage()
//Hide update and results divisions, make sure form is clear
//Input: None
//Output: Divs hidden
function initializePage()
{
	resetSearchForm();
	document.getElementById("modifyForm").style.display = "none";
	document.getElementById("resultsTableDiv").style.display = "none";
}

//Event Listeners
document.getElementById("resetSearchForm").addEventListener('click', resetSearchForm);
document.getElementById("submitSearchForm").addEventListener('click', submitSearchForm);
document.getElementById("submitModifyForm").addEventListener('click', submitForm);

document.addEventListener('DOMContentLoaded', initializePage);