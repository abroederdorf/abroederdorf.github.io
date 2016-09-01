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

//validateInputAdd()
//Validate all of the input data provided in the form
//Inout: No direct input, will read values from form fields
//Output: If any errors are found, messages will be displayed before the
//corresponding input field and returns false
function validateInputAdd()
{
	var numErrors = 0;
	
	//Hide error messages to start clean
	hideErrorMessagesAdd();

	//Check that name is not empty
	var str = document.getElementById('submitName').value;
	if (str == "")
	{
		$('#modal1').modal('show');
		document.getElementById("nameError").style.display = "block";
		numErrors++;
	}
		
	//Check Date is not empty
	var dateT = $('#submitDatePicker').datepicker('getDate');
	if (dateT == null)
	{
		$('#modal1').modal('show');
		document.getElementById("dateError").style.display = "block";
		numErrors++;
	}
		
	//Check Distance Inputs
	var dist, elev;
	number = document.getElementById("submitDistance").value;
	dist = Number(number);
	number = document.getElementById("submitElevation").value;
	elev = Number(number);
	if ((dist < 0) || (elev < 0))
	{
		$('#modal1').modal('show');
		document.getElementById("distElevError").style.display = "block";
		numErrors++;
	}
	
	if (numErrors == 0)
		return true;
	else
		return false;
}

//submitFormAdd()
//Submits form by first calling validation, then adding data to database
//Input: None
//Output: None
function submitFormAdd()
{
	if (validateInputAdd())
	{
		//Get data
		console.log("No errors, get data");
		var name, type, date, month, day, year, distance, elevation, region, subregion, imageLink, pageLink, searchTerms, imageSlide, loc, str;
		name = document.getElementById('submitName').value;
		type = document.getElementById('submitType').value;
		date = $('#submitDatePicker').datepicker('getDate');
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		distance = document.getElementById('submitDistance').value;
		elevation = document.getElementById('submitElevation').value;
		imageLink = document.getElementById('submitImage').value;
		pageLink = document.getElementById('submitPage').value;
		searchTerms = document.getElementById('submitTerms').value;
		imageSlide = document.getElementById('submitImageSlide').value;
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
		firebase.database().ref().push({name: name, type: type, month: month, day: day, year: year, pageLink: pageLink, imageLink: imageLink, region: region, subregion: subregion, searchTerms: searchTerms, distance: distance, elevation: elevation, imageSlide: imageSlide}, function(error) {
			if (error){
				document.getElementById('statusPanel').style.display = "block";
				document.getElementById('statusPanel').className = "panel panel-danger";
				document.getElementById('submitStatus').textContent = "Data could not be saved." + error;
			}
			else {
				document.getElementById('statusPanel').style.display = "block";
				document.getElementById('statusPanel').className = "panel panel-success";
				document.getElementById('submitStatus').textContent = "Data saved successfully.";
				resetFormAdd();
			}
		});
	}
	else
	{
		console.log("Check form, errors.");
	}
}

//hideErrorMessagesAdd()
//Hides divs that contain the error messages for the input form
//Input: Non
//Output: Nothing, but divs' style.display are set to none
function hideErrorMessagesAdd()
{
	$('#modal1').modal('hide');
	document.getElementById("nameError").style.display = "none";
	document.getElementById("distElevError").style.display = "none";
}

//resetFormAdd()
//Reset form fields to blank
//Input: None
//Output: No values in input fields
function resetFormAdd()
{
	//Text Fields
	document.getElementById("submitName").value = "";
	$("#submitDatePicker").datepicker("clearDates");
	document.getElementById("submitType").value = " ";
	document.getElementById("submitDistance").value = "";
	document.getElementById("submitElevation").value = "";
	document.getElementById("submitImage").value = "";
	document.getElementById("submitPage").value = "";
	document.getElementById("submitTerms").value = "";
	document.getElementById('submitImageSlide').value = "";
	
	//Selection Menus
	document.getElementById("submitType").value = 0;
	
	//Locations
	for (var i = 1; i < 7; i++)
	{
		str = "submitLoc" + i;
		document.getElementById(str).checked = false;
	}
	for (var i = 1; i < 25; i++)
	{
		str = "submitSub" + i;
		document.getElementById(str).checked = false;
	}
	
	//Hide error messages and status
	hideErrorMessagesAdd();
}

function initializePage()
{
	resetFormAdd();
	document.getElementById('statusPanel').style.display = "none";
	$('#modal1').modal('hide');
	
}

//Event Listeners
document.getElementById("resetForm").addEventListener('click', resetFormAdd);
document.getElementById("submitForm").addEventListener('click', submitFormAdd);
document.getElementById("modalCloseBtn").addEventListener('click', hideErrorMessagesAdd);

document.addEventListener('DOMContentLoaded', initializePage);