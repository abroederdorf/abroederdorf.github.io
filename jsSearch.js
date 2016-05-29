/*******************************
* Author: Alicia Broederdorf
* May 26, 2016
* Description: Search Page Script for Alpine Alicia
*******************************/

// Initialize Firebase
var config = {
apiKey: "AIzaSyBzPdO9Fo3M3kflIueWN_fmTtMV_upLygU",
authDomain: "project-5802414869996009310.firebaseapp.com",
databaseURL: "https://project-5802414869996009310.firebaseio.com",
storageBucket: "project-5802414869996009310.appspot.com",
};
firebase.initializeApp(config);


//Trip Report Result Object Constructor
function trObj(id, name, pageLink, imageLink, searchTerms, month, day, year, subregion, region, type, distance, elevation){
	this.id = id;	//assigned auto-incrementing id
	this.name = name;
	this.pageLink = pageLink;
	this.imageLink = imageLink;
	this.searchTerms = searchTerms;
	this.month = month;
	this.day = day;
	this.year = year;
	this.subregion = subregion;
	this.region = region;
	this.type = type;
	this.distance = distance;
	this.elevation = elevation;
}

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

	//Make text input lowercase for comparison with database values
	var str = document.getElementById('searchName').value;
	var searchNameV = str.toLowerCase(); 
		//console.log("Name: " + searchNameV);
		
	//Check that dates
	var formDay, formMonth, formYear, designation, day, month, year, fromDate, toDate;
	for (var i = 0; i < 2; i++)
	{
		formDay = 'searchDay';
		formMonth = 'searchMonth';
		formYear = 'searchYear';
		
		if (i == 0)
			designation = 'From'; 
		else
			designation = 'To';
		
		if (i == 1 && document.getElementById("searchCurrentDate").checked)
		{
			//Reference: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
			var today = new Date();
			day = today.getDate();
			month = today.getMonth()+1; //Jan = 0
			year = today.getFullYear();
		}
		else
		{
			day = document.getElementById(formDay + designation).value;
			month = document.getElementById(formMonth + designation).value;
			year = document.getElementById(formYear + designation).value;
		}
		
		//Check that all date fields are specified
		if ((day != 0) || (month != 0) || (year != 0))
		{
			if ((day == 0) || (month == 0) || (year == 0))
			{
				document.getElementById("dateErrorUnfilled").style.display = "block";
				numErrors++;
			}
		}
		
		if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day == 31))
		{
			document.getElementById("dateErrorDay").style.display = "block";
			numErrors++;
		}
		if (month == 2)
		{
			var yearMod = year % 4;
				//console.log("Year mod: " + yearMod);
			if (yearMod == 0) 
			{
				if (day > 29)
				{
					document.getElementById("dateErrorDay").style.display = "block";
					numErrors++;
				}
			}
			else
			{
				if (day > 28)
				{
					document.getElementById("dateErrorDay").style.display = "block";
					numErrors++;
				}
			}
		}
		
		//Create date strings for use in comparison
		var tempDate;
		if (month < 10)
			tempDate = '0' + month + '/';
		else
			tempDate = month + '/';
			
		if (day < 10)
			tempDate += '0' + day + '/' + year + ' 00:00';
		else
			tempDate += day + '/' + year + ' 00:00';
		
		if (i == 0)
			fromDate = tempDate;
		else
			toDate = tempDate;
	}
	
	//Check that the From date is less than the To date 
		//console.log("To Date: " + toDate + ", From Date: " + fromDate);
	if (new Date(fromDate).getTime() > new Date(toDate).getTime())
	{
		document.getElementById("dateErrorLessThan").style.display = "block";
		numErrors++;
	}
	
	//Check Distance Inputs
	var minDist, maxDist, number;
	number = document.getElementById("searchMinDist").value;
	minDist = Number(number);
	number = document.getElementById("searchMaxDist").value;
	maxDist = Number(number);
	if (minDist > maxDist)
	{
		console.log(minDist > maxDist);
		document.getElementById("distErrorLessThan").style.display = "block";
		numErrors++;
	}
	if ((minDist < 0) || (maxDist < 0))
	{
		document.getElementById("distErrorPositive").style.display = "block";
		numErrors++;
	}
	
	//Check Elevation Inputs
	var minElev, maxElev;
	number = document.getElementById("searchMinElev").value;
	minElev = Number(number);
	number = document.getElementById("searchMaxElev").value;
	maxElev = Number(number);
	if (minElev > maxElev)
	{
		document.getElementById("elevErrorLessThan").style.display = "block";
		numErrors++;
	}
	if ((minElev < 0) || (maxElev < 0))
	{
		document.getElementById("elevErrorPositive").style.display = "block";
		numErrors++;
	}
	
	if (numErrors == 0)
		return true;
	else
		return false;
}
	
//Name: displayData
//Description: Add rows to table for all of the data in the animal database
//Input: Animal object array
//Output: Rows added to document table and division shown with results
function displayData(resultObjArray)
{
	var resultDiv = document.getElementById("allResultsDiv");

	//Set division to show results div and modify search div; hide search form
	document.getElementById("searchResultsDiv").style.display = "block";
	document.getElementById("modifySearchDiv").style.display = "block";
	document.getElementById("searchForm").style.display = "None";
	
	//Delete rows from table body
	while (resultDiv.hasChildNodes())
		resultDiv.removeChild(resultDiv.firstChild);
	
	//Add rows with a name key, i.e. valid trip report records
	for (var i = 0; i < resultObjArray.length; i++)
	{
		if (resultObjArray[i].name)
		{
			var divRow = document.createElement('div');
			divRow.className = "resultRow";
			
			//Create picture div
			var picDiv = document.createElement('div');
			picDiv.className = "picFloatDiv";
			var pic = document.createElement('img');
			if (resultObjArray[i].imageLink != '')
				pic.src = resultObjArray[i].imageLink;
			else
				pic.src = "https://c5.staticflickr.com/8/7284/26709392604_67938bb47a_q.jpg";
			pic.width = "100";
			pic.height = "100";
			pic.className = "picture";
			picDiv.appendChild(pic);
			divRow.appendChild(picDiv);
			
			//Create name, type, and location div
			var nameDiv = document.createElement('div');
			nameDiv.className = "nameFloatDiv";
			var header = document.createElement('h4');
			header.innerHTML = "<a href='" + resultObjArray[i].pageLink + "'>" + resultObjArray[i].name + "</a>";
			nameDiv.appendChild(header);
			var par = document.createElement('p');
			par.innerHTML = resultObjArray[i].subregion + ", " + resultObjArray[i].region + "<br>" + resultObjArray[i].type;
			nameDiv.appendChild(par);
			divRow.appendChild(nameDiv);
			
			//Create dist, elev gain, and date div
			var statsDiv = document.createElement('div');
			statsDiv.className = "statsFloatDiv";
			par = document.createElement('p');
			par.innerHTML = "Distance: " + resultObjArray[i].distance + " miles<br>Elevation Gain: " + resultObjArray[i].elevation + "'<br>" + resultObjArray[i].month + "." + resultObjArray[i].day + "." + resultObjArray[i].year;
			statsDiv.appendChild(par);
			divRow.appendChild(statsDiv);
			
			//Create end float div
			var endDiv = document.createElement('div');
			endDiv.className = "endFloat";
			divRow.appendChild(endDiv);
			
			resultDiv.appendChild(divRow); 
		}	
	}
}
	
//Name: search
//Description: Use input from HTML form to search database. Get
//snapshot of data, then use displayData() to update the results 
//Input: HTML form input fields
//Output: Results div shown and rows added with results, or results message
//that nothing was found. Nothing returned from function
/*function search()
{
	var results = [];
	var animalRecords = [];
	
	//Get query parameters
	var type = document.getElementById('searchType').value;
	var color = document.getElementById('searchColor').value;
	
	//Get data
	myData.once("value", function(snapshot){
		var data = snapshot.val()
			//Test: console output to show data returned and number of records
			/*console.log(data);
			console.log("Number of records: " + snapshot.numChildren());*/
		
/*		snapshot.forEach(function(obj){
			//Add animal records to array
			var keys = obj.key();
			var anim = obj.val();
			var newAnimal = new animal(keys, anim.id, anim.type, anim.color);
			animalRecords.push(newAnimal);
		});	
		
		//Search array for query parameters
		for (var i = 0; i < animalRecords.length; i++)
		{
			//console.log("Key: " + animalRecords[i].key + ", ID: " + animalRecords[i].id + ", Type: " + animalRecords[i].type + ", Color: " + animalRecords[i].id);
			
			var checkBox = document.getElementById('allAnimals').checked;
			if (checkBox)
				results.push(animalRecords[i]);
			else if (type != '')
			{
				if (color != '')
				{
					if (animalRecords[i].type == type && animalRecords[i].color == color)
						results.push(animalRecords[i]);
				}
				else
				{
					if (animalRecords[i].type == type)
						results.push(animalRecords[i]);
				}
			}
			else
			{
				if (color != '')
				{
					if (animalRecords[i].color == color)
						results.push(animalRecords[i]);
				}
				else
					break;
			}
		}
		
		//Test: Console print results array
			/*console.log("Results array:");
			console.log(results);*/
		
		//Print results
/*		if (results.length <= 0)
		{
			document.getElementById("availAnimDiv").style.display = "block";
			document.getElementById("resultsMessage").textContent = "No results, try another search.";
			document.getElementById("resultsTable").style.display = "none";
		}
		else
		{
			document.getElementById("resultsMessage").textContent = "Look at all of these cute animals waiting to join your family";
			displayData(results);
		}
	});
}	*/
	
//submitForm()
//Submits form by first calling validation, then getting data, searching data, and
//display results
//Input: None
//Output: Table of results returned
function submitForm()
{
	if (validateInput())
	{
		//Get data
		console.log("No errors, get data");
		
		//Search data
		var objArray = [];
		var obj1 = new trObj(1, 'Hidden Lake Lookout', 'http://alpinealicia.com/2015/20150621_HiddenLake.html', 'https://c3.staticflickr.com/8/7716/26709395234_1ebfda278d_q.jpg', ['hidden lake lookout', 'hidden', 'lookout'], 6, 21, 15, 'Cascade River Road', 'North Cascades', 'Hike', 8.19, 3717);
		var obj2 = new trObj(2, 'South Early Winters Spire - South Arete', 'http://alpinealicia.com/2014/20140914_SEWS_SouthArete.html', '', ['south early winters spire', 'sews', 'south arete', 'early', 'south early winter spires'], 9, 14, 14, 'Highway 20', 'North Cascades', 'Climb', 6.54, 2333);
		var obj3 = new trObj(3, 'Green Mountain Lookout', 'http://alpinealicia.com/2015/20150426_GreenMountainLookout.html', 'https://c7.staticflickr.com/8/7569/26709397014_09f29f8063_q.jpg', ['green mountain lookout', 'green', 'lookout'], 4, 26, 15, 'North Cascades', 'North Cascades', 'Climb', 7.72, 3445);
		objArray.push(obj1);
		objArray.push(obj2);
		objArray.push(obj3);
		
		//Display data
		displayData(objArray);
	}
	else
		console.log("Validation errors, check form");
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
	document.getElementById("distErrorLessThan").style.display = "none";
	document.getElementById("distErrorPositive").style.display = "none";
	document.getElementById("elevErrorLessThan").style.display = "none";
	document.getElementById("elevErrorPositive").style.display = "none";
}

//resetForm()
//Reset form fields to blank
//Input: None
//Output: No values in input fields
function resetForm()
{
	//Text Fields
	document.getElementById("searchName").value = "";
	document.getElementById("searchMinDist").value = "";
	document.getElementById("searchMaxDist").value = "";
	document.getElementById("searchMinElev").value = "";
	document.getElementById("searchMaxElev").value = "";
	
	//Date
	document.getElementById("searchMonthFrom").value = 0;
	document.getElementById("searchDayFrom").value = 0;
	document.getElementById("searchYearFrom").value = 0;
	document.getElementById("searchMonthTo").value = 0;
	document.getElementById("searchDayTo").value = 0;
	document.getElementById("searchYearTo").value = 0;
	document.getElementById("searchCurrentDate").checked = false;
	
	//Activity Types
	document.getElementById("searchHike").checked = false;
	document.getElementById("searchClimb").checked = false;
	document.getElementById("searchCrag").checked = false;
	document.getElementById("searchBCSki").checked = false;
	
	//Locations
	//North Cascades
	document.getElementById("searchNCallSub").checked = false;
	document.getElementById("search542Sub").checked = false;
	document.getElementById("search20Sub").checked = false;
	document.getElementById("searchCasRiverSub").checked = false;
	document.getElementById("searchNCSub").checked = false;
	document.getElementById("divNCLoc").style.display = "none";
	
	//Central Cascades
	document.getElementById("searchCCallSub").checked = false;
	document.getElementById("search2Sub").checked = false;
	document.getElementById("searchLoopSub").checked = false;
	document.getElementById("searchLworthSub").checked = false;
	document.getElementById("searchEnchantSub").checked = false;
	document.getElementById("searchCWSub").checked = false;
	document.getElementById("searchCCSub").checked = false;
	document.getElementById("divCCLoc").style.display = "none";
	
	//I-90
	document.getElementById("searchI90allSub").checked = false;
	document.getElementById("searchIssaSub").checked = false;
	document.getElementById("searchNBendSub").checked = false;
	document.getElementById("searchSnoqSub").checked = false;
	document.getElementById("searchI90Sub").checked = false;
	document.getElementById("divI90Loc").style.display = "none";
	
	//South Cascades
	document.getElementById("searchSCallSub").checked = false;
	document.getElementById("searchMtRainSub").checked = false;
	document.getElementById("searchTatooshSub").checked = false;
	document.getElementById("searchSCSub").checked = false;
	document.getElementById("divSCLoc").style.display = "none";
	
	//Olympic Peninsula
	document.getElementById("searchOlyLoc").checked = false;
	
	//Outside Washington State
	document.getElementById("searchOWSallSub").checked = false;
	document.getElementById("searchCanSub").checked = false;
	document.getElementById("searchOrSub").checked = false;
	document.getElementById("searchCaliSub").checked = false;
	document.getElementById("searchWestSub").checked = false;
	document.getElementById("searchSouthSub").checked = false;
	document.getElementById("divOWSLoc").style.display = "none";
	
	//Hide error messages
	hideErrorMessages();
}

//checkToggleNC
//Toggles the checkmarks of the north cascade subregions
//Input: None
//Output: Checkmarks changed
function checkToggleNC()
{
	if (document.getElementById('searchNCallSub').checked)
	{
		document.getElementById("search542Sub").checked = true;
		document.getElementById("search20Sub").checked = true;
		document.getElementById("searchCasRiverSub").checked = true;
		document.getElementById("searchNCSub").checked = true;
	}
	else
	{
		document.getElementById("search542Sub").checked = false;
		document.getElementById("search20Sub").checked = false;
		document.getElementById("searchCasRiverSub").checked = false;
		document.getElementById("searchNCSub").checked = false;
	}
}

//checkToggleCC
//Toggles the checkmarks of the central cascade subregions
//Input: None
//Output: Checkmarks changed
function checkToggleCC()
{
	if (document.getElementById('searchCCallSub').checked)
	{
		document.getElementById("search2Sub").checked = true;
		document.getElementById("searchLoopSub").checked = true;
		document.getElementById("searchLworthSub").checked = true;
		document.getElementById("searchEnchantSub").checked = true;
		document.getElementById("searchCWSub").checked = true;
		document.getElementById("searchCCSub").checked = true;
	}
	else
	{
		document.getElementById("search2Sub").checked = false;
		document.getElementById("searchLoopSub").checked = false;
		document.getElementById("searchLworthSub").checked = false;
		document.getElementById("searchEnchantSub").checked = false;
		document.getElementById("searchCWSub").checked = false;
		document.getElementById("searchCCSub").checked = false;
	}
}

//checkToggleI90
//Toggles the checkmarks of the I90 subregions
//Input: None
//Output: Checkmarks changed
function checkToggleI90()
{
	if (document.getElementById('searchI90allSub').checked)
	{
		document.getElementById("searchIssaSub").checked = true;
		document.getElementById("searchNBendSub").checked = true;
		document.getElementById("searchSnoqSub").checked = true;
		document.getElementById("searchI90Sub").checked = true;
	}
	else
	{
		document.getElementById("searchIssaSub").checked = false;
		document.getElementById("searchNBendSub").checked = false;
		document.getElementById("searchSnoqSub").checked = false;
		document.getElementById("searchI90Sub").checked = false;
	}
}

//checkToggleSC
//Toggles the checkmarks of the south cascade subregions
//Input: None
//Output: Checkmarks changed
function checkToggleSC()
{
	if (document.getElementById('searchSCallSub').checked)
	{
		document.getElementById("searchMtRainSub").checked = true;
		document.getElementById("searchTatooshSub").checked = true;
		document.getElementById("searchSCSub").checked = true;
	}
	else
	{
		document.getElementById("searchMtRainSub").checked = false;
		document.getElementById("searchTatooshSub").checked = false;
		document.getElementById("searchSCSub").checked = false;
	}
}

//checkToggleOWS
//Toggles the checkmarks of the outside washington state subregions
//Input: None
//Output: Checkmarks changed
function checkToggleOWS()
{
	if (document.getElementById('searchOWSallSub').checked)
	{
		document.getElementById("searchCanSub").checked = true;
		document.getElementById("searchOrSub").checked = true;
		document.getElementById("searchCaliSub").checked = true;
		document.getElementById("searchWestSub").checked = true;
		document.getElementById("searchSouthSub").checked = true;
	}
	else
	{
		document.getElementById("searchCanSub").checked = false;
		document.getElementById("searchOrSub").checked = false;
		document.getElementById("searchCaliSub").checked = false;
		document.getElementById("searchWestSub").checked = false;
		document.getElementById("searchSouthSub").checked = false;
	}
}

//searchFormToggle
//Shows the search form and hides and modify search button
//Input: None
//Output: Divs are hidden and shown
function searchFormToggle()
{
	toggle("searchForm");
	toggle("modifySearchDiv");
}

//Initialize Page
function initializePage()
{
	resetForm();
	document.getElementById("activityDescriptions").style.display = "none";
	document.getElementById("searchResultsDiv").style.display = "none";
	document.getElementById("modifySearchDiv").style.display = "none";
}

//Event Listeners
document.getElementById("resetForm").addEventListener('click', resetForm);
document.getElementById("submitForm").addEventListener('click', submitForm);
document.getElementById("searchNCLoc").addEventListener('click', function() {toggle("divNCLoc");});
document.getElementById("searchNCallSub").addEventListener('click', checkToggleNC);
document.getElementById("searchCCLoc").addEventListener('click', function() {toggle("divCCLoc");});
document.getElementById("searchCCallSub").addEventListener('click', checkToggleCC);
document.getElementById("searchI90Loc").addEventListener('click', function() {toggle("divI90Loc");});
document.getElementById("searchI90allSub").addEventListener('click', checkToggleI90);
document.getElementById("searchSCLoc").addEventListener('click', function() {toggle("divSCLoc");});
document.getElementById("searchSCallSub").addEventListener('click', checkToggleSC);
document.getElementById("searchOWSLoc").addEventListener('click', function() {toggle("divOWSLoc");});
document.getElementById("searchOWSallSub").addEventListener('click', checkToggleOWS);
document.getElementById("modifySearchButton").addEventListener('click', searchFormToggle);

//Initialize Page
document.addEventListener('DOMContentLoaded', initializePage);