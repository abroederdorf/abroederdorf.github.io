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
function trObj(name, pageLink, imageLink, searchTerms, month, day, year, subregion, region, type, distance, elevation, date){
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
	this.date = date;
}

//createDate()
//Takes a month, day, and year and creates a date string
//Input: month, day, year integers
//Output: date string
function createDate(month, day, year)
{
	var tempDate;
	if (month < 10)
		tempDate = '0' + month + '/';
	else
		tempDate = month + '/';
		
	if (day < 10)
		tempDate += '0' + day + '/' + year + ' 00:00';
	else
		tempDate += day + '/' + year + ' 00:00';
	
	return tempDate;
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
		var tempDate = createDate(month, day, year);		
		
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
	var minDist, maxDist, number1, number2;
	number1 = document.getElementById("searchMinDist").value;
	number2 = document.getElementById("searchMaxDist").value;
	if ((number1 != "") && number2 != "")
	{
		minDist = Number(number1);
		maxDist = Number(number2);
		if (minDist > maxDist)
		{
			document.getElementById("distErrorLessThan").style.display = "block";
			numErrors++;
		}
		if ((minDist < 0) || (maxDist < 0))
		{
			document.getElementById("distErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number1 != "")
	{
		minDist = Number(number1);
		if (minDist < 0)
		{
			document.getElementById("distErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number2 != "")
	{
		maxDist = Number(number2);
		if (maxDist < 0)
		{
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
			document.getElementById("elevErrorLessThan").style.display = "block";
			numErrors++;
		}
		if ((minElev < 0) || (maxElev < 0))
		{
			document.getElementById("elevErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number1 != "")
	{
		minElev = Number(number1);
		if (minElev < 0)
		{
			document.getElementById("elevErrorPositive").style.display = "block";
			numErrors++;
		}
	}
	else if (number2 != "")
	{
		maxElev = Number(number2);
		if (maxElev < 0)
		{
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
			var str = "";
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
			statsDiv.className = "statsFloatDiv";
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
function search()
{
	var results = [];
	var tempResults = [];
	var allRecords = [];
	
	//Get query parameters
	var Qname, QmonthFrom, QdayFrom, QyearFrom, QdateFrom, QmonthTo, QdayTo, QyearTo, QdateTo, QdistanceMin, QdistanceMax, QelevationMin, QelevationMax, Qhike, Qclimb, Qcrag, Qski, Q542Sub, Q20Sub, QCCRSub, QNCSub, Q2Sub, QLoopSub, QLworthSub, QEnchSub, QCWSub, QCCSub, QIssSub, QNBSub, QSnoqSub, QI90Sub, QMtRSub, QTatSub, QSCSub, QOlyReg, QCanSub, QORSub, QCaliSub, QWestSub, QSouthSub, QOWSSub;
	
	//Name, distances, and elevation gains
	Qname = document.getElementById('searchName').value;
	QdistanceMin = document.getElementById('searchMinDist').value;
	QelevationMin = document.getElementById('searchMinElev').value;
	QdistanceMax = document.getElementById('searchMaxDist').value;
	QelevationMax = document.getElementById('searchMaxElev').value;

	//From Date
	QmonthFrom = document.getElementById('searchMonthFrom').value;
	QdayFrom = document.getElementById('searchDayFrom').value;
	QyearFrom = document.getElementById('searchYearFrom').value;
	QdateFrom = createDate(QmonthFrom, QdayFrom, QyearFrom);
	
	//To Date
	if (document.getElementById("searchCurrentDate").checked)
	{
		//Reference: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
		var today = new Date();
		QdayTo = today.getDate();
		QmonthTo = today.getMonth()+1; //Jan = 0
		QyearTo = today.getFullYear();
	}
	else
	{
		QmonthTo = document.getElementById('searchMonthTo').value;
		QdayTo = document.getElementById('searchDayTo').value;
		QyearTo = document.getElementById('searchYearTo').value;
	}
	QdateTo = createDate(QmonthTo, QdayTo, QyearTo);
	
	//Activity types
	if (document.getElementById("searchHike").checked)
		Qhike = true;
	else
		Qhike = false;
	if (document.getElementById("searchClimb").checked)
		Qclimb = true;
	else
		Qclimb = false;
	if (document.getElementById("searchCrag").checked)
		Qcrag = true;
	else
		Qcrag = false;
	if (document.getElementById("searchBCSki").checked)
		Qski = true;
	else
		Qski = false;
	
	//North Cascades Region
	if (document.getElementById("search542Sub").checked)
		Q542Sub = true;
	else
		Q542Sub = false;
	if (document.getElementById("search20Sub").checked)
		Q20Sub = true;
	else
		Q20Sub = false;
	if (document.getElementById("searchCasRiverSub").checked)
		QCCRSub = true;
	else
		QCCRSub = false;
	if (document.getElementById("searchNCSub").checked)
		QNCSub = true;
	else
		QNCSub = false;
	
	//Central Cascades Region
	if (document.getElementById("search2Sub").checked)
		Q2Sub = true;
	else
		Q2Sub = false;
	if (document.getElementById("searchLoopSub").checked)
		QLoopSub = true;
	else
		QLoopSub = false;
	if (document.getElementById("searchLworthSub").checked)
		QLworthSub = true;
	else
		QLworthSub = false;
	if (document.getElementById("searchEnchantSub").checked)
		QEnchSub = true;
	else
		QEnchSub = false;
	if (document.getElementById("searchCWSub").checked)
		QCWSub = true;
	else
		QCWSub = false;
	if (document.getElementById("searchCCSub").checked)
		QCCSub = true;
	else
		QCCSub = false;
	
	//I-90 Region
	if (document.getElementById("searchIssaSub").checked)
		QIssSub = true;
	else
		QIssSub = false;
	if (document.getElementById("searchNBendSub").checked)
		QNBSub = true;
	else
		QNBSub = false;
	if (document.getElementById("searchSnoqSub").checked)
		QSnoqSub = true;
	else
		QSnoqSub = false;
	if (document.getElementById("searchI90Sub").checked)
		QI90Sub = true;
	else
		QI90Sub = false;
	
	//South Cascades Region	
	if (document.getElementById("searchMtRainSub").checked)
		QMtRSub = true;
	else
		QMtRSub = false;
	if (document.getElementById("searchTatooshSub").checked)
		QTatSub = true;
	else
		QTatSub = false;
	if (document.getElementById("searchSCSub").checked)
		QSCSub = true;
	else
		QSCSub = false;
	
	//Olympic Peninsula Region
	if (document.getElementById("searchOlyLoc").checked)
		QOlyReg = true;
	else
		QOlyReg = false;
	
	//Outside Washington State Region
	if (document.getElementById("searchCanSub").checked)
		QCanSub = true;
	else
		QCanSub = false;
	if (document.getElementById("searchOrSub").checked)
		QORSub = true;
	else
		QORSub = false;
	if (document.getElementById("searchCaliSub").checked)
		QCaliSub = true;
	else
		QCaliSub = false;
	if (document.getElementById("searchWestSub").checked)
		QWestSub = true;
	else
		QWestSub = false;
	if (document.getElementById("searchSouthSub").checked)
		QSouthSub = true;
	else
		QSouthSub = false;
	if (document.getElementById("searchOWSSub").checked)
		QOWSSub = true;
	else
		QOWSSub = false;
	
	
	
	
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
			allRecords.push(TR);
				//console.log(TR);
		
		});	
		
		
		
		//Search array for query parameters
		//Qname, QdateFrom, QdateTo, QdistanceMin, QdistanceMax, QelevationMin, QelevationMax, 		
		for (var i = 0; i < allRecords.length; i++)
		{
			tempResults[i] = allRecords[i];
		}
		
		//Search through regions
		//source array splice: http://www.w3schools.com/jsref/jsref_splice.asp
		var returned, startingNum, endingNum, startingI;
		if (QOlyReg || Q542Sub || Q20Sub || QCCRSub || QNCSub || Q2Sub || QLoopSub || QLworthSub || QEnchSub || QCWSub || QCCSub || QIssSub || QNBSub || QSnoqSub || QI90Sub || QMtRSub || QTatSub || QSCSub || QCanSub || QORSub || QCaliSub || QWestSub || QSouthSub || QOWSSub)
		{
			var i = 0;
			while(i < tempResults.length)
			{
				startingNum = tempResults.length;
				startingI = i;
				
				if (QOlyReg)
				{
					if (tempResults[i].region == "Olympic Peninsula")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (Q542Sub)
				{
					if (tempResults[i].subregion == "Highway 542")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (Q20Sub)
				{
					if (tempResults[i].subregion == "Highway 20")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QCCRSub)
				{
					if (tempResults[i].subregion == "Cascade River Road")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QNCSub)
				{
					if (tempResults[i].subregion == "North Cascades")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
					
				}
				if (tempResults.length == 0)
					break;
				if (Q2Sub)
				{
					if (tempResults[i].subregion == "Highway 2")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QLoopSub)
				{
					if (tempResults[i].subregion == "Mountain Loop Highway")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QLworthSub)
				{
					if (tempResults[i].subregion == "Leavenworth")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QEnchSub)
				{
					if (tempResults[i].subregion == "Enchantments")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QCWSub)
				{
					if (tempResults[i].subregion == "Central Washington")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QCCSub)
				{
					if (tempResults[i].subregion == "Central Cascades")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QIssSub)
				{
					if (tempResults[i].subregion == "Issaquah")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QNBSub)
				{
					if (tempResults[i].subregion == "North Bend")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QSnoqSub)
				{
					if (tempResults[i].subregion == "Snoqualmie Pass")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QI90Sub)
				{
					if (tempResults[i].subregion == "I-90")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QMtRSub)
				{
					if (tempResults[i].subregion == "Mount Rainier")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QTatSub)
				{
					if (tempResults[i].subregion == "Tatoosh Range")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QSCSub)
				{
					if (tempResults[i].subregion == "South Cascades")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QCanSub)
				{
					if (tempResults[i].subregion == "Canada")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QORSub)
				{
					if (tempResults[i].subregion == "Oregon")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QCaliSub)
				{
					if (tempResults[i].subregion == "California")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QWestSub)
				{
					if (tempResults[i].subregion == "West")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QSouthSub)
				{
					if (tempResults[i].subregion == "South")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (QOWSSub)
				{
					if (tempResults[i].subregion == "Outside Washington State")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				
				//Increment i if record did not match criteria, otherwise check that index again as the past element was removed 
				endingNum = tempResults.length;
				if (endingNum != startingNum)
					i = startingI;
				else
					i++;
			}
		}
		else
		{
			//No location filters so add all reports in temp results to final results array, no filter to apply
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}
		
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search through activity type
		if (Qhike || Qclimb || Qcrag || Qski)
		{
			var i = 0;
			while(i < tempResults.length)
			{
				startingNum = tempResults.length;
				startingI = i;
				
				if (Qhike)
				{
					if (tempResults[i].type == "Hike")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (Qclimb)
				{
					if (tempResults[i].type == "Climb")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (Qcrag)
				{
					if (tempResults[i].type == "Crag")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				if (tempResults.length == 0)
					break;
				if (Qski)
				{
					if (tempResults[i].type == "Ski")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
				
				//Increment i if record did not match criteria, otherwise check that index again as the past element was removed 
				endingNum = tempResults.length;
				if (endingNum != startingNum)
					i = startingI;
				else
					i++;
				
				//console.log("Ending: " + endingNum + ", i: " + i);
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}	
		
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search distance minimum
		if (QdistanceMin != "")
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				//console.log("Record distance: " + tempResults[i].distance);
				if (tempResults[i].distance != "")
				{
					if (tempResults[i].distance >= QdistanceMin)
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}	
		
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search distance maximum
		if (QdistanceMax != "")
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				if (tempResults[i].distance != "")
				{
					if (tempResults[i].distance <= QdistanceMax)
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}

		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search elevation gain minimum
		if (QelevationMin != "")
		{
			var minElev = Number(QelevationMin);
			for (var i = 0; i < tempResults.length; i++)
			{
				if (tempResults[i].elevation != "")
				{
					if (tempResults[i].elevation >= minElev)
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}	
		
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search elevation gain maximum
		if (QelevationMax != "")
		{
			var maxElev = Number(QelevationMax);
			for (var i = 0; i < tempResults.length; i++)
			{
				if (tempResults[i].elevation != "")
				{
					if (tempResults[i].elevation <= maxElev)
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}		
		
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search from date 
		if (QdateFrom != "00/00/0 00:00")
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				if (tempResults[i].date != "00/00/0 00:00")
				{
					if (new Date(QdateFrom).getTime() <= new Date(tempResults[i].date).getTime())
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}		
		
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
		
		//Search to date 
		if (QdateTo != "00/00/0 00:00")
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				if (tempResults[i].date != "00/00/0 00:00")
				{
					if (new Date(QdateTo).getTime() >= new Date(tempResults[i].date).getTime())
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}
	
		//Assign results to temp results and clear results to get only those that make it through this filter
		tempResults = [];
		for (var i = 0; i < results.length; i++)
		{
			tempResults[i] = results[i];
		}
		results = [];
	
		//Search name with search term field
		var terms, res, termArray, Qlower, termLower;
		/*tempArray = tempResults[0].searchTerms;
		console.log(tempArray);
		console.log(tempArray.length);
		
		var res = tempArray.replace("[", "");
		tempArray = res;
		res = tempArray.replace("]", "");
		tempArray = res;
		res = tempArray.split(", ");
		console.log(res);
		console.log("Length: " + res.length);*/

		if (Qname != "")
		{
			Qlower = Qname.toLowerCase(); 	//make name query parameter all lower case
			for (var i = 0; i < tempResults.length; i++)
			{
				//Split search term string into individual array elements
				terms = tempResults[i].searchTerms;
				res = terms.replace("[", "");
				terms = res.replace("]", "");
				termArray = terms.split(", ");
				
				//Iterate over term array to see if it matches name query parameter
				for (var j = 0; j < termArray.length; j++)
				{
					termLower = termArray[j].toLowerCase();
					console.log("Qname: " + Qlower + ", Term: " + termLower);
					if (Qlower == termLower)
						results.push(tempResults[i]);
				}
			}
		}
		else
		{
			for (var i = 0; i < tempResults.length; i++)
			{
				results[i] = tempResults[i];
			}
		}
		
		//Test: Console print results array
			/*console.log("Results array:");
			console.log(results);*/
		
		//Print results
		if (results.length <= 0)
		{
			document.getElementById("searchResultsMessage").textContent = "No results, try another search.";
			displayData(results); 
		}
		else
		{
			document.getElementById("searchResultsMessage").textContent = results.length + " Trip Reports Returned";
				//console.log(results);
			displayData(results); 
		}
	});
}	
	
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
		var obj1 = new trObj('Hidden Lake Lookout', 'http://alpinealicia.com/2015/20150621_HiddenLake.html', 'https://c3.staticflickr.com/8/7716/26709395234_1ebfda278d_q.jpg', ['hidden lake lookout', 'hidden', 'lookout'], 6, 21, 15, 'Cascade River Road', 'North Cascades', 'Hike', 8.19, 3717);
		var obj2 = new trObj('South Early Winters Spire - South Arete', 'http://alpinealicia.com/2014/20140914_SEWS_SouthArete.html', '', ['south early winters spire', 'sews', 'south arete', 'early', 'south early winter spires'], 9, 14, 14, 'Highway 20', 'North Cascades', 'Climb', 6.54, 2333);
		var obj3 = new trObj('Green Mountain Lookout', 'http://alpinealicia.com/2015/20150426_GreenMountainLookout.html', 'https://c7.staticflickr.com/8/7569/26709397014_09f29f8063_q.jpg', ['green mountain lookout', 'green', 'lookout'], 4, 26, 15, 'North Cascades', 'North Cascades', 'Climb', 7.72, 3445);
		objArray.push(obj1);
		objArray.push(obj2);
		objArray.push(obj3);
		
		//Display data
		search();
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
	zeroToDate();
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
	document.getElementById("searchOWSSub").checked = false;
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
		document.getElementById("searchOWSSub").checked = true;
	}
	else
	{
		document.getElementById("searchCanSub").checked = false;
		document.getElementById("searchOrSub").checked = false;
		document.getElementById("searchCaliSub").checked = false;
		document.getElementById("searchWestSub").checked = false;
		document.getElementById("searchSouthSub").checked = false;
		document.getElementById("searchOWSSub").checked = false;
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

//zeroToDate()
//Set to date to 0/0/0 if current date selected
//Input: None
//Output: To date fields all set to 0
function zeroToDate()
{
	document.getElementById("searchMonthTo").value = 0;
	document.getElementById("searchDayTo").value = 0;
	document.getElementById("searchYearTo").value = 0;
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
document.getElementById("searchCurrentDate").addEventListener('click', zeroToDate);

//Initialize Page
document.addEventListener('DOMContentLoaded', initializePage);