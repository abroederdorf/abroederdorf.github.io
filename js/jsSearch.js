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

//validateInputSearch()
//Validate all of the input data provided in the form
//Inout: No direct input, will read values from form fields
//Output: If any errors are found, messages will be displayed before the
//corresponding input field and returns false
function validateInputSearch()
{
	var numErrors = 0;
	
	//Hide error messages to start clean
	hideErrorMessagesSearch();

	//Make text input lowercase for comparison with database values
	var str = document.getElementById('searchName').value;
	var searchNameV = str.toLowerCase(); 
		//console.log("Name: " + searchNameV);
		
	//Get From Date
	var dateF = $('#dateFromPicker').datepicker('getDate');
	if (dateF != null)
	{
		var yearF = dateF.getFullYear();
		var monthF = dateF.getMonth() + 1;
		var dayF = dateF.getDate();
	}
	else
	{
		var yearF = "1970";
		var monthF = "1";
		var dayF = "1";
	}
	var fromDate = createDate(monthF, dayF, yearF);
	console.log(fromDate);
	
	//Get To Date
	var dateT = $('#dateToPicker').datepicker('getDate');
	if (dateT != null)
	{
		var yearT = dateT.getFullYear();
		var monthT = dateT.getMonth() + 1;
		var dayT = dateT.getDate();
	}
	else
	{
		var today = new Date();
		var yearT = today.getFullYear();
		var monthT = today.getMonth() + 1;
		var dayT = today.getDate();
	}
	var toDate = createDate(monthT, dayT, yearT);
	console.log(toDate);
	
	//Check that the From date is less than the To date 
		//console.log("To Date: " + toDate + ", From Date: " + fromDate);
	if (new Date(fromDate).getTime() > new Date(toDate).getTime())
	{
		$('#modal1').modal('show');
		document.getElementById("dateErrorLessThan").style.display = "block";
		numErrors++;
	}
	
	//Check Distance Inputs
	var minDist, maxDist, number1, number2;
	number1 = document.getElementById("searchMinDist").value;
	number2 = document.getElementById("searchMaxDist").value;
	if ((number1 != "") && number2 != "")
	{
		minDist = Number(number1);
		maxDist = Number(number2);
		if (minDist > maxDist)
		{
			$('#modal1').modal('show');
			document.getElementById("distErrorLessThan").style.display = "block";
			numErrors++;
		}
		if ((minDist < 0) || (maxDist < 0))
		{
			$('#modal1').modal('show');
			document.getElementById("distErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number1 != "")
	{
		minDist = Number(number1);
		if (minDist < 0)
		{
			$('#modal1').modal('show');
			document.getElementById("distErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number2 != "")
	{
		maxDist = Number(number2);
		if (maxDist < 0)
		{
			$('#modal1').modal('show');
			document.getElementById("distErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	
	//Check Elevation Inputs
	var minElev, maxElev;	
	number1 = document.getElementById("searchMinElev").value;
	number2 = document.getElementById("searchMaxElev").value;
	if ((number1 != "") && number2 != "")
	{
		minElev = Number(number1);
		maxElev = Number(number2);
		if (minElev > maxElev)
		{
			$('#modal1').modal('show');
			document.getElementById("elevErrorLessThan").style.display = "block";
			numErrors++;
		}
		if ((minElev < 0) || (maxElev < 0))
		{
			$('#modal1').modal('show');
			document.getElementById("elevErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number1 != "")
	{
		minElev = Number(number1);
		if (minElev < 0)
		{
			$('#modal1').modal('show');
			document.getElementById("elevErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number2 != "")
	{
		maxElev = Number(number2);
		if (maxElev < 0)
		{
			$('#modal1').modal('show');
			document.getElementById("elevErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	
	//If any errors found, return false
	if (numErrors == 0)
		return true;
	else
		return false;
}
	
//Name: displayDataSearch()
//Description: Add rows to table for all of the data in the animal database
//Input: Animal object array
//Output: Rows added to document table and division shown with results
function displayDataSearch(resultObjArray)
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
		if (resultObjArray[i].pageLink)
		{
			var divRow = document.createElement('div');
			divRow.className = "resultRow container col-xs-12";
			
			//Create picture div
			var picDiv = document.createElement('div');
			picDiv.className = "col-sm-2 hidden-xs";
			var pic = document.createElement('img');
			if (resultObjArray[i].imageLink != '')
				pic.src = resultObjArray[i].imageLink;
			else
				pic.src = "https://c5.staticflickr.com/8/7284/26709392604_67938bb47a_q.jpg";
			pic.width = "100";
			pic.height = "100";
			pic.className = "resultPicture";
			picDiv.appendChild(pic);
			divRow.appendChild(picDiv);
			
			//Create name, type, and location div
			var nameDiv = document.createElement('div');
			nameDiv.className = "col-xs-6";
			var header = document.createElement('h4');
			var str = "";
			if (resultObjArray[i].pageLink != "")
				header.innerHTML = "<a href='" + resultObjArray[i].pageLink + "'>" + resultObjArray[i].name + "</a>";
			else
				header.textContent = resultObjArray[i].name;
			nameDiv.appendChild(header);
			var par = document.createElement('p');
			str = "";
			if (resultObjArray[i].subregion != "")
				str += resultObjArray[i].subregion;
			if ((resultObjArray[i].subregion != "") && (resultObjArray[i].region != ""))
				str += ", ";
			if (resultObjArray[i].region != "")
				str += resultObjArray[i].region;
			str += "<br>" + resultObjArray[i].type;
			par.innerHTML = str;
			nameDiv.appendChild(par);
			divRow.appendChild(nameDiv);
			
			//Create dist, elev gain, and date div
			var statsDiv = document.createElement('div');
			statsDiv.className = "col-xs-4";
			par = document.createElement('p');
			str = "";
			if (resultObjArray[i].distance != "")
				str += "Distance: " + resultObjArray[i].distance + " miles<br>";
			if (resultObjArray[i].elevation != "")
				str += "Elevation Gain: " + resultObjArray[i].elevation + "'<br>";
			if (resultObjArray[i].month != "")
				str += resultObjArray[i].month + ".";
			if (resultObjArray[i].day != "")
				str += resultObjArray[i].day + ".";
			if (resultObjArray[i].year != "")
				str += resultObjArray[i].year;
			par.innerHTML = str;
			statsDiv.appendChild(par);
			divRow.appendChild(statsDiv);
			
			resultDiv.appendChild(divRow); 
		}	
	}
}
	
//Name: getDatasearch()
//Description:  Get snapshot of data, then call first filter 
//Input: None
//Output: None
function getDataSearch()
{
	var tempResults = [];

	//Get data
	var name, type, month, day, year, distance, elevation, region, subregion, imageLink, pageLink, searchTerms, TR, date;
	
	firebase.database().ref().once("value").then(function(snapshot){
		var data = snapshot.val()
			//Test: console output to show data returned and number of records
			//console.log(data);
			//console.log("Number of records: " + snapshot.numChildren());
			
			//var parsedData = Object.keys(snapshot.val());
			//console.log(parsedData);		
		
		snapshot.forEach(function(obj){
			var resultObj = obj.val();
				//console.log(resultObj);
			name = obj.val().name;
			type = obj.val().type;
			month = obj.val().month;
			day = obj.val().day;
			year = obj.val().year;
			pageLink = obj.val().pageLink;
			imageLink = obj.val().imageLink;
			region = obj.val().region;
			subregion = obj.val().subregion;
			searchTerms = obj.val().searchTerms;
			distance = obj.val().distance;
			elevation = obj.val().elevation;
			
			date = createDate(month, day, year);
			
			TR = new trObj(name, pageLink, imageLink, searchTerms, month, day, year, subregion, region, type, distance, elevation, date);
			tempResults.push(TR);
				//console.log(TR);
		
		});	
		
		//Start sending data through filters to get final search results
		locationFilter(tempResults);
	});
}	
	
//submitFormSearch()
//Submits form by first calling validation, then getting data, searching data, and
//display results
//Input: None
//Output: Table of results returned
function submitFormSearch()
{
	//Hide results panels
	document.getElementById("resultsPanel").style.display = "none";
	document.getElementById("noResultsPanel").style.display = "none";
	
	if (validateInputSearch())
	{
		//Get data
		console.log("No errors, get data");
		
		//Search data
		getDataSearch();
	}
	else
		console.log("Validation errors, check form");
}

//hideErrorMessagesSearch()
//Hides divs that contain the error messages for the input form
//Input: Non
//Output: Nothing, but divs' style.display are set to none
function hideErrorMessagesSearch()
{
	document.getElementById("dateErrorLessThan").style.display = "none";
	document.getElementById("distErrorLessThan").style.display = "none";
	document.getElementById("distErrorPositive").style.display = "none";
	document.getElementById("elevErrorLessThan").style.display = "none";
	document.getElementById("elevErrorPositive").style.display = "none";
	$('#modal1').modal('hide');
}

//resetFormSearch()
//Reset form fields to blank
//Input: None
//Output: No values in input fields
function resetFormSearch()
{
	//Text Fields
	document.getElementById("searchName").value = "";
	document.getElementById("searchMinDist").value = "";
	document.getElementById("searchMaxDist").value = "";
	document.getElementById("searchMinElev").value = "";
	document.getElementById("searchMaxElev").value = "";
	
	//Date
	$("#dateFromPicker").datepicker("clearDates");
	$("#dateToPicker").datepicker("clearDates");
	
	//Activity Types
	document.getElementById("searchHike").checked = false;
	document.getElementById("searchClimb").checked = false;
	document.getElementById("searchCrag").checked = false;
	document.getElementById("searchBCSki").checked = false;
	
	//Locations
	//North Cascades
	document.getElementById("search542Sub").checked = false;
	document.getElementById("search20Sub").checked = false;
	document.getElementById("searchCasRiverSub").checked = false;
	document.getElementById("searchNCSub").checked = false;
	document.getElementById("searchNCLoc").checked = false;
	document.getElementById("divNCLoc").style.display = "none";
	
	//Central Cascades
	document.getElementById("search2Sub").checked = false;
	document.getElementById("searchLoopSub").checked = false;
	document.getElementById("searchLworthSub").checked = false;
	document.getElementById("searchEnchantSub").checked = false;
	document.getElementById("searchCWSub").checked = false;
	document.getElementById("searchCCSub").checked = false;
	document.getElementById("searchCCLoc").checked = false;
	document.getElementById("divCCLoc").style.display = "none";
	
	//I-90
	document.getElementById("searchIssaSub").checked = false;
	document.getElementById("searchNBendSub").checked = false;
	document.getElementById("searchSnoqSub").checked = false;
	document.getElementById("searchI90Sub").checked = false;
	document.getElementById("searchI90Loc").checked = false;
	document.getElementById("divI90Loc").style.display = "none";
	
	//South Cascades
	document.getElementById("searchMtRainSub").checked = false;
	document.getElementById("searchTatooshSub").checked = false;
	document.getElementById("searchSCSub").checked = false;
	document.getElementById("searchSCLoc").checked = false;
	document.getElementById("divSCLoc").style.display = "none";
	
	//Olympic Peninsula
	document.getElementById("searchOlyLoc").checked = false;
	
	//Outside Washington State
	document.getElementById("searchCanSub").checked = false;
	document.getElementById("searchOrSub").checked = false;
	document.getElementById("searchCaliSub").checked = false;
	document.getElementById("searchWestSub").checked = false;
	document.getElementById("searchSouthSub").checked = false;
	document.getElementById("searchOWSSub").checked = false;
	document.getElementById("searchOWSLoc").checked = false;
	document.getElementById("divOWSLoc").style.display = "none";
	
	//Hide error messages
	hideErrorMessagesSearch();
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

//resultSortInitialize
//Set sort options to date and desc
function resultSortInitialize()
{
	document.getElementById('sortCat1').checked = true;
	document.getElementById('sortType2').checked = true;
}

//Initialize Page
function initializePageSearch()
{
	resetFormSearch();
	document.getElementById("resultsPanel").style.display = "none";
	document.getElementById("noResultsPanel").style.display = "none";
	document.getElementById("searchResultsDiv").style.display = "none";
	document.getElementById("modifySearchDiv").style.display = "none";
	resultSortInitialize();
}

//Event Listeners
document.getElementById("resetForm").addEventListener('click', resetFormSearch);
document.getElementById("submitForm").addEventListener('click', submitFormSearch);
document.getElementById("sortData").addEventListener('click', submitFormSearch);
document.getElementById("searchNCLoc").addEventListener('click', function() {toggle("divNCLoc");});
document.getElementById("searchNCLoc").addEventListener('click', checkToggleNC);
document.getElementById("searchCCLoc").addEventListener('click', function() {toggle("divCCLoc");});
document.getElementById("searchCCLoc").addEventListener('click', checkToggleCC);
document.getElementById("searchI90Loc").addEventListener('click', function() {toggle("divI90Loc");});
document.getElementById("searchI90Loc").addEventListener('click', checkToggleI90);
document.getElementById("searchSCLoc").addEventListener('click', function() {toggle("divSCLoc");});
document.getElementById("searchSCLoc").addEventListener('click', checkToggleSC);
document.getElementById("searchOWSLoc").addEventListener('click', function() {toggle("divOWSLoc");});
document.getElementById("searchOWSLoc").addEventListener('click', checkToggleOWS);
document.getElementById("modifySearchButton").addEventListener('click', searchFormToggle);
document.getElementById("modalCloseBtn").addEventListener('click', hideErrorMessagesSearch);

//Initialize Page
document.addEventListener('DOMContentLoaded', initializePageSearch);