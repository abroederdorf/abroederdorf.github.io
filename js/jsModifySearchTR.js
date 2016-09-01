/*******************************
* Author: Alicia Broederdorf
* May 31, 2016
* Description: Modify Search trip report Page Script for Alpine Alicia
* to handle the search and displaying search results
*******************************/

//Trip Report Search Object Constructor
function trSearchObj(key, name, month, day, year, subregion, region, type, searchTerms, date, imageSlide){
	this.key = key;
	this.name = name;
	this.month = month;
	this.day = day;
	this.year = year;
	this.subregion = subregion;
	this.region = region;
	this.type = type;
	this.searchTerms = searchTerms;
	this.date = date;
	this.imageSlide = imageSlide;
}

//validateModSearchInput()
//Validate date data provided in the form
//Inout: No direct input, will read values from form fields
//Output: If any errors are found, messages will be displayed before the
//corresponding input field and returns false
function validateModSearchInput()
{
//Check the dates
	var formDay, formMonth, formYear, designation, day, month, year, fromDate, toDate;
	var numErrors = 0;
	
	hideErrorMessagesMod();
	
	for (var i = 0; i < 2; i++)
	{
		formDay = 'searchDay';
		formMonth = 'searchMonth';
		formYear = 'searchYear';
		
		if (i == 0)
			designation = 'From'; 
		else
			designation = 'To';
		
		day = document.getElementById(formDay + designation).value;
		month = document.getElementById(formMonth + designation).value;
		year = document.getElementById(formYear + designation).value;
		
		//Check that all date fields are specified
		if ((day != 0) || (month != 0) || (year != 0))
		{
			if ((day == 0) || (month == 0) || (year == 0))
			{
				$('#modal1').modal('show');
				document.getElementById("dateErrorUnfilled").style.display = "block";
				numErrors++;
			}
		}
		
		if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day == 31))
		{
			$('#modal1').modal('show');
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
					$('#modal1').modal('show');
					document.getElementById("dateErrorDay").style.display = "block";
					numErrors++;
				}
			}
			else
			{
				if (day > 28)
				{
					$('#modal1').modal('show');
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
		$('#modal1').modal('show');
		document.getElementById("dateErrorLessThan").style.display = "block";
		numErrors++;
	}
	
	if (numErrors == 0)
		return true;
	else
		return false;
}

//updateTR(key)
//Gets record for specified trip report, populates the modify form with the associated
//values, and shows the modify form
//Input: Record key from database
//Output: Form is shown with values populated
function updateTR(key)
{
	//Clear values from update form
	document.getElementById("submitName").value = "";
	document.getElementById("submitType").value = " ";
	document.getElementById("submitImage").value = "";
	document.getElementById("submitPage").value = "";
	document.getElementById("submitDistance").value = "";
	document.getElementById("submitElevation").value = "";
	document.getElementById("submitMonth").value = "";
	document.getElementById("submitDay").value = "";
	document.getElementById("submitYear").value = "";
	document.getElementById("submitTerms").value = "";
	document.getElementById("showKey").textContent = "";
	//Locations
	for (var i = 1; i < 8; i++)
	{
		str = "submitLoc" + i;
		document.getElementById(str).checked = false;
	}
	for (var i = 1; i < 26; i++)
	{
		str = "submitSub" + i;
		document.getElementById(str).checked = false;
	}
	
	var name, type, month, day, year, pageLink, imageLink, region, subregion, searchTerms, strDistance, distance, strElevation, elevation, imageSlide;

	//Get key from form submitted
	var keyID = key.value;
	
	firebase.database().refFromURL("https://project-5802414869996009310.firebaseio.com/" + keyID).once("value").then(function(snapshot){
		name = snapshot.val().name;
		type = snapshot.val().type;
		month = snapshot.val().month;
		day = snapshot.val().day;
		year = snapshot.val().year;
		pageLink = snapshot.val().pageLink;
		imageLink = snapshot.val().imageLink;
		region = snapshot.val().region;
		subregion = snapshot.val().subregion;
		searchTerms = snapshot.val().searchTerms;
		strDistance = snapshot.val().distance;
		strElevation = snapshot.val().elevation;
		imageSlide = snapshot.val().imageSlide;
		
		distance = Number(strDistance);
		elevation = Number(strElevation);

		//Put values into update form
		document.getElementById("submitName").value = name;
		document.getElementById("submitType").value = type;
		document.getElementById("submitImage").value = imageLink;
		document.getElementById("submitPage").value = pageLink;
		document.getElementById("submitDistance").value = distance;
		document.getElementById("submitElevation").value = elevation;
		document.getElementById("submitMonth").value = month;
		document.getElementById("submitDay").value = day;
		document.getElementById("submitYear").value = year;
		document.getElementById("submitTerms").value = searchTerms;
		document.getElementById("hiddenKey").value = keyID;
		document.getElementById("showKey").textContent = keyID;
		document.getElementById("submitImageSlide").value = imageSlide;
		
		for (var i = 1; i < 8; i++)
		{
			str = "submitLoc" + i;
			
			if (region == document.getElementById(str).value)
			{
				//console.log("Region: " + region + ", Value: " + document.getElementById(str).value);
				document.getElementById(str).checked = true;
			}
		}
		for (var i = 1; i < 26; i++)
		{
			str = "submitSub" + i;
			
			if (subregion == document.getElementById(str).value)
			{
				document.getElementById(str).checked = true;
				//console.log("Subregion: " + subregion + ", Value: " + document.getElementById(str).value);
			}
		}
		
		document.getElementById("modifyForm").style.display = "block";
		hideErrorMessagesMod();
		
	});

}

//removeTR(key)
//Removes trip report data record from database
//Input: Record key from database
//Output: Record permanently removed from database
function removeTR(key)
{
	//Get key from form submitted
	var keyID = key.value;
	
	//Callback function to display message as to success of removal
	var oncomplete = function(error){
		if (error){
			document.getElementById('statusPanel').className = "panel panel-danger";
			document.getElementById('statusPanel').style.display = "block";
			document.getElementById('operationStatus').textContent = "Removal failed.";
		}else{
			document.getElementById('statusPanel').className = "panel panel-success";
			document.getElementById('statusPanel').style.display = "block";
			document.getElementById('operationStatus').textContent = "Removal successful.";
		}
	};
	
	//Remove animal from database
	firebase.database().refFromURL("https://project-5802414869996009310.firebaseio.com/" + keyID).remove(oncomplete);
		
	//Show updated results
	submitModSearchForm();
}

//toggleDiv(obj)
//Get form object and toggle the display attribute of the corresponding
//inner div that houses the confirmation for removal of a trip report
//Input: Must pass object
//Output: None - div is shown or hidden
function toggleDiv(obj)
{	
	//Get ID
	var id = obj.value;
	
	var divId = "divInner" + id;
	toggle(divId);
}

//Name: displayDataModSearch
//Description: Add rows to table for all of the data in the animal database
//Input: Animal object array
//Output: Rows added to document table and division shown with results
function displayDataModSearch(resultObjArray)
{
	var resultBody = document.getElementById("resultsTblBody");
	
	//Delete rows from table body
	while (resultBody.hasChildNodes())
		resultBody.removeChild(resultBody.firstChild);
	
	//Add rows with a name key, i.e. valid trip report records
	for (var i = 0; i < resultObjArray.length; i++)
	{
		if (resultObjArray[i].name)
		{
			var row = document.createElement('tr');
			row.id = resultObjArray[i].key;
			//Name
			var cell = document.createElement('td');
			cell.textContent = resultObjArray[i].name;
			row.appendChild(cell);
			//Date
			cell = document.createElement('td');
			cell.textContent = resultObjArray[i].month + "." + resultObjArray[i].day + "." + resultObjArray[i].year;
			row.appendChild(cell);
			//Type
			cell = document.createElement('td');
			cell.textContent = resultObjArray[i].type;
			row.appendChild(cell);
			//Location
			cell = document.createElement('td');
			var str = "";
			if (resultObjArray[i].subregion != "")
				str += resultObjArray[i].subregion;
			if ((resultObjArray[i].subregion != "") && (resultObjArray[i].region != ""))
				str += ", ";
			if (resultObjArray[i].region != "")
				str += resultObjArray[i].region;
			cell.textContent = str;
			row.appendChild(cell);
			
			//Create Update Button in Form
			cell = document.createElement("td");
			var newInput = document.createElement("button");
			newInput.setAttribute("type", "button");
			newInput.innerHTML = '<span class="glyphicon glyphicon-pencil"></span> Update';
			newInput.style.textAlign = "center";
			newInput.className = "btn btn-default";
			newInput.value = resultObjArray[i].key;
			newInput.addEventListener('click', function(){updateTR(this);});
			cell.appendChild(newInput);
			row.appendChild(cell);
			
			//Create Delete Button in Form	
			var strIn = "divInner" + i;
			cell = document.createElement("td");
			var divOuter = document.createElement("div");
			cell.appendChild(divOuter);
			//Remove button
			var newInput = document.createElement("button");
			newInput.setAttribute("type", "button");
			newInput.innerHTML = '<span class="glyphicon glyphicon-remove"></span> Remove';
			newInput.style.textAlign = "center";
			newInput.className = "btn btn-warning";
			newInput.value = i;
			newInput.addEventListener('click', function(){toggleDiv(this);});
			divOuter.appendChild(newInput);
			//Inner Div
			var divInner = document.createElement("div");
			divInner.id = strIn;
			divInner.style.display = "none";
			divOuter.appendChild(divInner);
			//Span
			var span = document.createElement("span");
			span.textContent = "Confirm:";
			divInner.appendChild(span);
			//Yes button
			var newInput = document.createElement("button");
			newInput.setAttribute("type", "button");
			newInput.textContent = "Yes";
			newInput.style.textAlign = "center";
			newInput.className = "btn btn-success buttonYes";
			newInput.value = resultObjArray[i].key;
			newInput.addEventListener('click', function(){removeTR(this);});
			divInner.appendChild(newInput);
			//No button
			var newInput = document.createElement("button");
			newInput.setAttribute("type", "button");
			newInput.textContent = "No";
			newInput.style.textAlign = "center";
			newInput.className = "btn btn-danger";
			newInput.value = i;
			newInput.addEventListener('click', function(){toggleDiv(this);});
			divInner.appendChild(newInput);
			row.appendChild(cell);
			
			resultBody.appendChild(row); 
		}	
	}
}

//submitModSearchForm()
//Submits search form by getting data, then displaying data that fits criteria
//Input: None
//Output: None
function submitModSearchForm()
{
	var results = [];
	var tempResults = [];
	
	//Hide update form section
	document.getElementById("modifyForm").style.display = "none";
	
	if (validateModSearchInput())
	{
	
		//Get query parameters
		var Qname, QmonthFrom, QdayFrom, QyearFrom, QdateFrom, QmonthTo, QdayTo, QyearTo, QdateTo;
		
		//Name query parameters
		Qname = document.getElementById('searchName2').value;

		//From Date
		QmonthFrom = document.getElementById('searchMonthFrom').value;
		QdayFrom = document.getElementById('searchDayFrom').value;
		QyearFrom = document.getElementById('searchYearFrom').value;
		QdateFrom = createDate(QmonthFrom, QdayFrom, QyearFrom);
		
		//To Date
		QmonthTo = document.getElementById('searchMonthTo').value;
		QdayTo = document.getElementById('searchDayTo').value;
		QyearTo = document.getElementById('searchYearTo').value;
		QdateTo = createDate(QmonthTo, QdayTo, QyearTo);	
		
		
		//Get data
		var name, type, month, day, year, region, subregion, searchTerms, TR, date, keys;
		
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
				keys = obj.key;
				name = obj.val().name;
				type = obj.val().type;
				month = obj.val().month;
				day = obj.val().day;
				year = obj.val().year;
				region = obj.val().region;
				subregion = obj.val().subregion;
				searchTerms = obj.val().searchTerms;
				
				date = createDate(month, day, year);
				
				TR = new trSearchObj(keys, name, month, day, year, subregion, region, type, searchTerms, date);
				tempResults.push(TR);
					//console.log(TR);
			
			});	
			
			//Search from date 
			if (QdateFrom != "0/0/ 00:00")
			{
				for (var i = 0; i < tempResults.length; i++)
				{
					if (tempResults[i].date != "0/0/ 00:00")
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
			if (QdateTo != "0/0/ 00:00")
			{
				for (var i = 0; i < tempResults.length; i++)
				{
					if (tempResults[i].date != "0/0/ 00:00")
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

			if (Qname != "")
			{
				Qlower = Qname.toLowerCase(); 	//make name query parameter all lower case
				for (var i = 0; i < tempResults.length; i++)
				{
					//Split search term string into individual array elements
					terms = tempResults[i].searchTerms;
					//console.log(tempResults[i].searchTerms);
					res = terms.replace("[", "");
					terms = res.replace("]", "");
					termArray = terms.split(", ");
					
					//Iterate over term array to see if it matches name query parameter
					for (var j = 0; j < termArray.length; j++)
					{
						termLower = termArray[j].toLowerCase();
						//console.log("Qname: " + Qlower + ", Term: " + termLower);
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
				//console.log("Results array:");
				//console.log(results);
				//console.log('Results length: ' + results.length);
			
			//Print results
			document.getElementById("resultsTableDiv").style.display="block";
			if (results.length <= 0)
			{
				document.getElementById('resultsPanel').className = "panel panel-default";
				document.getElementById("resultsStatus").textContent = "No results, try another search.";
				document.getElementById("resultsTab").style.display="none";
				displayDataModSearch(results); 
			}
			else
			{
				document.getElementById('resultsPanel').className = "panel panel-success";
				document.getElementById("resultsStatus").textContent = results.length + " Trip Reports Returned";
				document.getElementById("resultsTab").style.display="block";
					//console.log(results);
				displayDataModSearch(results); 
			}
		});
	}
	else
	{
		console.log("Check form, errors.");
	}
	
}

//hideErrorMessagesMod()
//Hides divs that contain the error messages for the input form
//Input: Non
//Output: Nothing, but divs' style.display are set to none
function hideErrorMessagesMod()
{
	$('#modal1').modal('hide');
	document.getElementById("dateErrorUnfilled").style.display = "none";
	document.getElementById("dateErrorDay").style.display = "none";
	document.getElementById("dateErrorLessThan").style.display = "none";
	
	$('#modal2').modal('hide');
	document.getElementById("nameError").style.display = "none";
	document.getElementById("monthError").style.display = "none";
	document.getElementById("dayError").style.display = "none";
	document.getElementById("yearError").style.display = "none";
	document.getElementById("distElevError").style.display = "none";
	
	document.getElementById("statusPanel").style.display = "none";
}

//resetModSearchForm()
//Reset form fields to blank
//Input: None
//Output: No values in input fields
function resetModSearchForm()
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
	hideErrorMessagesMod();
}

