/*******************************
* Author: Alicia Broederdorf
* May 28, 2016
* Description: Modify trip report Page Script for Alpine Alicia
* to handle the update form and updating the database
*******************************/

// Initialize Firebase
var config = {
apiKey: "AIzaSyBzPdO9Fo3M3kflIueWN_fmTtMV_upLygU",
authDomain: "project-5802414869996009310.firebaseapp.com",
databaseURL: "https://project-5802414869996009310.firebaseio.com",
storageBucket: "project-5802414869996009310.appspot.com",
};
firebase.initializeApp(config);

//validateInputUpdate()
//Validate all of the input data provided in the form
//Inout: No direct input, will read values from form fields
//Output: If any errors are found, messages will be displayed before the
//corresponding input field and returns false
function validateInputUpdate()
{
	var numErrors = 0;
	
	//Hide error messages to start clean
	hideErrorMessagesMod();

	//Check that name is not empty
	var str = document.getElementById('submitName').value;
	if (str == "")
	{
		$('#modal2').modal('show');
		document.getElementById("nameError").style.display = "block";
		numErrors++;
	}
		
	//Check Date is not empty
	var dateT = $('#submitDatePicker').datepicker('getDate');
	if (dateT == null)
	{
		$('#modal2').modal('show');
		document.getElementById("dateEmptyError").style.display = "block";
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
		$('#modal2').modal('show');
		document.getElementById("distElevError").style.display = "block";
		numErrors++;
	}
	
	if (numErrors == 0)
		return true;
	else
		return false;
}

//submitUpdateForm()
//Submits form by first calling validation, then adding data to database
//Input: None
//Output: None
function submitUpdateForm()
{
	if (validateInputUpdate())
	{
		//Get data
		//console.log("No errors, get data");
		var name, type, date, month, day, year, distance, elevation, region, subregion, imageLink, pageLink, imageSlide, searchTerms, keyId, str;
		name = document.getElementById('submitName').value;
		type = document.getElementById('submitType').value;
		date = $('#submitDatePicker').datepicker('getDate');
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		distance = document.getElementById('submitDistance').value;
		elevation = document.getElementById('submitElevation').value;
		imageLink = document.getElementById('submitImage').value;
		imageSlide = document.getElementById('submitImageSlide').value;
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
		firebase.database().refFromURL("https://project-5802414869996009310.firebaseio.com/" + keyId).set({name: name, type: type, month: month, day: day, year: year, pageLink: pageLink, imageLink: imageLink, region: region, subregion: subregion, searchTerms: searchTerms, distance: distance, elevation: elevation, imageSlide: imageSlide}, function(error) {
			if (error){
				document.getElementById('statusPanel').className = "panel panel-danger";
				document.getElementById('statusPanel').style.display = "block";
				document.getElementById('operationStatus').textContent = "Trip report could not be updated." + error;
			}
			else {
				document.getElementById('statusPanel').className = "panel panel-success";
				document.getElementById('statusPanel').style.display = "block";
				document.getElementById('operationStatus').textContent = "Trip report updated successfully.";
				
			}
			
			submitModSearchForm();
		});
	}
	else
	{
		console.log("Check form, errors.");
	}
	
	
}

//initializePageMod()
//Hide update and results divisions, make sure form is clear
//Input: None
//Output: Divs hidden
function initializePageMod()
{
	resetModSearchForm();
	document.getElementById("modifyForm").style.display = "none";
	document.getElementById("resultsTableDiv").style.display = "none";
}

//Event Listeners
document.getElementById("resetSearchForm").addEventListener('click', resetModSearchForm);
document.getElementById("submitSearchForm").addEventListener('click', submitModSearchForm);
document.getElementById("submitModifyForm").addEventListener('click', submitUpdateForm);
document.getElementById("modalCloseBtn").addEventListener('click', hideErrorMessagesMod);
document.getElementById("modalCloseBtn2").addEventListener('click', hideErrorMessagesMod);

document.addEventListener('DOMContentLoaded', initializePageMod);