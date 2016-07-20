/*******************************
* Author: Alicia Broederdorf
* Date: January 1, 2016
* Description: Generate accordion divs containing tables of trip
* reports per year based on data in database
*******************************/

var yearArray =[]; //Global array to store years from data to control divs

// Initialize Firebase
var config = {
apiKey: "AIzaSyBzPdO9Fo3M3kflIueWN_fmTtMV_upLygU",
authDomain: "project-5802414869996009310.firebaseapp.com",
databaseURL: "https://project-5802414869996009310.firebaseio.com",
storageBucket: "project-5802414869996009310.appspot.com",
};
firebase.initializeApp(config);

/***************
* Name: showAllBoxes
* Description: Sets display attribute to block for all accordion divisions
* Input: None
* Output: None, divisions shown
***************/
function showAllBoxes(){
	var strCon;
	for (var i = 0; i < yearArray.length; i++)
	{
		strCon = "container" + yearArray[i];
		document.getElementById(strCon).style.display = "block";
	}
}

/***************
* Name: hideAllBoxes
* Description: Sets display attribute to none for all accordion divisions
* Input: None
* Output: None, divisions hidden
***************/
function hideAllBoxes(){
	var strCon;
	for (var i = 0; i < yearArray.length; i++)
	{
		strCon = "container" + yearArray[i];
		document.getElementById(strCon).style.display = "none";
	}
}

//sortDate
//Sorts array by date in descending order
//Input: Array of trObj
//Output: Sorted array
function sortDate(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while ((j >= 0) && (new Date(array[j].date).getTime() < new Date(temp.date).getTime()))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDateData(array);
}

//createYearDiv(year)
//Create new year div that includes another div with a table, table head,
//and table body including header cells
//Input: integer representing year
//Output: New div added to document
function createYearDiv(year){
	var strCon="", strYear = "", strBody="";
	var resultDiv = document.getElementById("TRlist");
	
	//Create first div
	var divAccordion = document.createElement('div');
	divAccordion.className = "accordion";
	resultDiv.appendChild(divAccordion);
	
	//Create toggle button
	var span = document.createElement('span');
	strCon = "container" + year;
	strYear = year;
	span.innerHTML = '<button onclick="toggle(' + "'" +  strCon + "'" + ')" class="btn btn-default">+</button><strong>&nbsp&nbsp' + strYear + '</strong>';
	divAccordion.appendChild(span);
	
	//Create div to hide and show containing table
	var divContainer = document.createElement('div');
	divContainer.id = strCon;
	divAccordion.appendChild(divContainer);
	
	//Create table
	var table = document.createElement('table');
	table.className = "table table-hover";
	divContainer.appendChild(table);
	
	//Create table head with row
	var head = document.createElement('thead');
	table.appendChild(head);
	var row = document.createElement('tr');
	head.appendChild(row);
	
	//Create header cells
	var headCell = document.createElement('td');
	headCell.textContent = 'Mountain/Trail';
	headCell.className = "text-center headerCell";
	row.appendChild(headCell);
	headCell = document.createElement('td');
	headCell.textContent = 'Subregion';
	headCell.className = "text-center headerCell";
	row.appendChild(headCell);
	headCell = document.createElement('td');
	headCell.textContent = 'Date';
	headCell.className = "text-center headerCell";
	row.appendChild(headCell);
	
	//Create table body
	strBody = "body" + year;
	var body = document.createElement('tbody');
	body.id = strBody;
	table.appendChild(body);
}

//createMonthRow(month, year)
//Create month row
//Input: integer representing month and year
//Output: New div added to document
function createMonthRow(month, year){

	var strBody = "body" + year;
	var body = document.getElementById(strBody);
	var monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	//Create month row
	var row = document.createElement('tr');
	body.appendChild(row);
	var cell = document.createElement('td');
	cell.className = "monthRow dateCell";
	cell.colSpan = 3;
	cell.textContent = monthNames[month];
	row.appendChild(cell);
}

//Name: displayDateData
//Description: Add rows to table for all of the data in the animal database
//Input: Animal object array
//Output: Rows added to document table and division shown with results
function displayDateData(array)
{
	var resultDiv = document.getElementById("TRlist");
	var month, year;
	var strCon="", strYear = "", strBody="";

	//Set division to show results div and modify search div; hide search form
	document.getElementById("TRlist").style.display = "block";
	
	//Delete rows from table body
	while (resultDiv.hasChildNodes())
		resultDiv.removeChild(resultDiv.firstChild);
	
	//Add rows for all trip reports
	for (var i = 0; i< array.length; i++)
	{
		//Create one div per year
		if (i == 0 || array[i].year != year )
		{
			year = array[i].year;
			createYearDiv(year);
			yearArray.push(array[i].year);
		}
		
		//Add month rows
		/*if (i == 0 || array[i].month != month)
		{
			month = array[i].month;
			createMonthRow(array[i].month, array[i].year);
		}*/
		
		//Create trip report row
		//Get body to append row to
		strBody = "body" + array[i].year;
		var body = document.getElementById(strBody);
		
		//Create row
		var row = document.createElement('tr');
		/*if (array[i].type == 'Hike')
			row.className = 'actHike';
		else if (array[i].type == 'Climb')
			row.className = 'actClimb';
		else if (array[i].type == 'Crag')
			row.className = 'actCrag';
		else if (array[i].type == 'Ski')
			row.className = 'actSki';*/
		body.appendChild(row);
		
		//Add cells
		var cell = document.createElement('td');
		cell.className = "text-center cellName";
		cell.innerHTML = '<a href="' + array[i].pageLink + '">' + array[i].name + '</a>';
		//cell.textContent = array[i].name;
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.className = "cellRegion locDateCell";
		cell.textContent = array[i].subregion;
		row.appendChild(cell);
		cell = document.createElement('td');
		cell.className = "cellDate locDateCell";
		var numberYear = array[i].year;
		var yearDigits = Number(numberYear);
		yearDigits -= 2000;
		if (yearDigits < 10)
			yearDigits = '0' + yearDigits;
		console.log("yearDigits: " + yearDigits);
		cell.textContent = array[i].month + '.' + array[i].day + '.' + yearDigits;
		row.appendChild(cell);
	}
	//Hide all divs
	hideAllBoxes();
}
	
//Name: searchDate
//Description: Get snapshot of data, then use displayData() to update the results
//Input: None
//Output: Array of trip report objects to be passed to displayDateData()
function searchDate()
{
	var allRecords = [];
	document.getElementById("showButtons").style.display="none";

	//Get data
	var name, type, month, day, year, distance, elevation, region, subregion, imageLink, pageLink, searchTerms, TR, date;
	
	firebase.database().ref().once("value").then(function(snapshot){
		snapshot.forEach(function(obj){
			var resultObj = obj.val();
				//console.log(resultObj);
			name = obj.val().name;
			type = obj.val().type;
			month = obj.val().month;
			day = obj.val().day;
			year = obj.val().year;
			pageLink = obj.val().pageLink;
			region = obj.val().region;
			subregion = obj.val().subregion;
			
			date = createDate(month, day, year);
			
			TR = new trObj(name, pageLink, imageLink, searchTerms, month, day, year, subregion, region, type, distance, elevation, date);
			allRecords.push(TR);
				//console.log(TR);
		
		});	
		
		//Print results
		if (allRecords.length <= 0)
		{
			document.getElementById("dateStatusMessage").textContent = "No results, something went wrong with the database.";
			displayDateData(allRecords); 
		}
		else
		{
			document.getElementById("showButtons").style.display="block";
				//console.log(allRecords);
			sortDate(allRecords);
			//displayDateData(allRecords); 
		}
	});
}	
	

//Initialize Date Page
document.addEventListener('DOMContentLoaded', searchDate);

//Event Listeners
document.getElementById("showAll").addEventListener('click', showAllBoxes);
document.getElementById("hideAll").addEventListener('click', hideAllBoxes);