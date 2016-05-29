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
	var number = document.getElementById("submitMonth").value;
	var month = Number(number);
	if (month < 1 || month > 12)
	{
		document.getElementById("monthError").style.display = "block";
		numErrors++;
	}
	
	var number = document.getElementById("submitYear").value;
	var year = Number(number);
	if (year < 2008)
	{
		document.getElementById("yearError").style.display = "block";
		numErrors++;
	}
	
	var number = document.getElementById("submitDay").value;
	var day = Number(number);
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
				if (day > 29)
				{
					document.getElementById("dayError").style.display = "block";
					numErrors++;
				}
			}
			else
			{
				if (day > 28)
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
		console.log("No errors, get data");
		var name, type, month, day, year, distance, elevation, region, subregion, imageLink, pageLink, searchTerms, loc, str;
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
		for (var i = 1; i < 7; i++)
		{
			str = "submitLoc" + i;
			if (loc = document.getElementById(str).checked)
				region = document.getElementById(str).value;
		}
		for (var i = 1; i < 23; i++)
		{
			str = "submitSub" + i;
			if (loc = document.getElementById(str).checked)
				subregion = document.getElementById(str).value;
		}
		
		//Add trip report to database
		firebase.database().ref().push({name: name, type: type, month: month, day: day, year: year, pageLink: pageLink, imageLink: imageLink, region: region, subregion: subregion, searchTerms: searchTerms, distance: distance, elevation: elevation}, function(error) {
			if (error){
				document.getElementById('submitStatus').textContent = "Data could not be saved." + error;
			}
			else {
				document.getElementById('submitStatus').textContent = "Data saved successfully.";
				resetForm();
			}
		});
	}
	else
	{
		console.log("Check form, errors.");
	}
}

//hideErrorMessages()
//Hides divs that contain the error messages for the input form
//Input: Non
//Output: Nothing, but divs' style.display are set to none
function hideErrorMessages()
{
	document.getElementById("nameError").style.display = "none";
	document.getElementById("monthError").style.display = "none";
	document.getElementById("dayError").style.display = "none";
	document.getElementById("yearError").style.display = "none";
	document.getElementById("distElevError").style.display = "none";
}

//resetForm()
//Reset form fields to blank
//Input: None
//Output: No values in input fields
function resetForm()
{
	//Text Fields
	document.getElementById("submitName").value = "";
	document.getElementById("submitMonth").value = "";
	document.getElementById("submitDay").value = "";
	document.getElementById("submitYear").value = "";
	document.getElementById("submitDistance").value = "";
	document.getElementById("submitElevation").value = "";
	
	//Selection Menus
	document.getElementById("submitType").value = 0;
	
	//Locations
	for (var i = 1; i < 7; i++)
		{
			str = "submitLoc" + i;
			document.getElementById(str).checked = false;
		}
		for (var i = 1; i < 23; i++)
		{
			str = "submitSub" + i;
			document.getElementById(str).checked = false;
		}
	
	//Hide error messages
	hideErrorMessages();
}

//Event Listeners
document.getElementById("resetForm").addEventListener('click', resetForm);
document.getElementById("submitForm").addEventListener('click', submitForm);

document.addEventListener('DOMContentLoaded', resetForm);