
//locationFilter(tempResults)
//Iterates through data array to find elements that match locations
//specified in HTML form
//Input: Gets values of checkboxes corresponding to locations from
//HTML form
//Output: Outputs array with only those elements that match the 
//locations specified; if no locations are specified entire initial 
//array is passed to next filter
function locationFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var Q542Sub, Q20Sub, QCCRSub, QNCSub, Q2Sub, QLoopSub, QLworthSub, QEnchSub, QCWSub, QCCSub, QIssSub, QNBSub, QSnoqSub, QI90Sub, QMtRSub, QTatSub, QSCSub, QOlyReg, QCanSub, QORSub, QCaliSub, QWestSub, QSouthSub, QOWSSub;
	
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


	//Search through regions
	//source array splice: http://www.w3schools.com/jsref/jsref_splice.asp
	var returned, startingNum, endingNum, startingI;
	var endArray = new trObj('','EOA');  //Create end sentinel for array
	tempResults.push(endArray);
	if (QOlyReg || Q542Sub || Q20Sub || QCCRSub || QNCSub || Q2Sub || QLoopSub || QLworthSub || QEnchSub || QCWSub || QCCSub || QIssSub || QNBSub || QSnoqSub || QI90Sub || QMtRSub || QTatSub || QSCSub || QCanSub || QORSub || QCaliSub || QWestSub || QSouthSub || QOWSSub)
	{
		var i = 0;
		while(tempResults[i].pageLink != 'EOA')
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
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (Q542Sub)
			{
				if (tempResults[i].subregion == "Highway 542")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (Q20Sub)
			{
				if (tempResults[i].subregion == "Highway 20")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QCCRSub)
			{
				if (tempResults[i].subregion == "Cascade River Road")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QNCSub)
			{
				if (tempResults[i].subregion == "North Cascades")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
				
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (Q2Sub)
			{
				if (tempResults[i].subregion == "Highway 2")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QLoopSub)
			{
				if (tempResults[i].subregion == "Mountain Loop Highway")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QLworthSub)
			{
				if (tempResults[i].subregion == "Leavenworth")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QEnchSub)
			{
				if (tempResults[i].subregion == "Enchantments")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QCWSub)
			{
				if (tempResults[i].subregion == "Central Washington")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QCCSub)
			{
				if (tempResults[i].subregion == "Central Cascades")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QIssSub)
			{
				if (tempResults[i].subregion == "Issaquah")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QNBSub)
			{
				//console.log(tempResults[i]);
				if (tempResults[i].subregion == "North Bend")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QSnoqSub)
			{
				if (tempResults[i].subregion == "Snoqualmie Pass")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QI90Sub)
			{
				if (tempResults[i].subregion == "I-90")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QMtRSub)
			{
				if (tempResults[i].subregion == "Mount Rainier")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QTatSub)
			{
				if (tempResults[i].subregion == "Tatoosh Range")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QSCSub)
			{
				if (tempResults[i].subregion == "South Cascades")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QCanSub)
			{
				if (tempResults[i].subregion == "Canada")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QORSub)
			{
				if (tempResults[i].subregion == "Oregon")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QCaliSub)
			{
				if (tempResults[i].subregion == "California")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QWestSub)
			{
				if (tempResults[i].subregion == "West")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (QSouthSub)
			{
				if (tempResults[i].subregion == "South")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
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
				//console.log("Start: " + startingNum + ", End: " + endingNum);
			if (endingNum != startingNum)
				i = startingI;
			else
				i++;
		}
	}
	else
	{
		tempResults.pop(); //get rid of end sentinel
		//No location filters so add all reports in temp results to final results array, no filter to apply
		for (var i = 0; i < tempResults.length; i++)
		{
			results[i] = tempResults[i];
		}
	}
	
	//Call next filter
	activityFilter(results);
}

//activityFilter(tempResults)
//Iterates through data array to find elements that match activities
//specified in HTML form
//Input: Gets values of checkboxes corresponding to activities from
//HTML form
//Output: Outputs array with only those elements that match the 
//activities specified; if no activities are specified entire initial 
//array is passed to next filter
function activityFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var Qhike, Qclimb, Qcrag, Qski;
	
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
	
	
	//Search through activity type
	var endArray = new trObj('','EOA');  //Create end sentinel for array
	tempResults.push(endArray); //Add end sentinel to results
	if (Qhike || Qclimb || Qcrag || Qski)
	{
		var i = 0;
		while(tempResults[i].pageLink != 'EOA')
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
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (Qclimb)
			{
				if (tempResults[i].type == "Climb")
				{
					returned = tempResults.splice(i, 1);
					results.push(returned[0]);
				}
			}
			if (tempResults[i].pageLink == 'EOA')
				break;
			if (Qcrag)
			{
				if (tempResults[i].type != "")
				{
					if (tempResults[i].type == "Crag")
					{
						returned = tempResults.splice(i, 1);
						results.push(returned[0]);
					}
				}
			}
			if (tempResults[i].pageLink == 'EOA')
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
		tempResults.pop(); //get rid of end sentinel
		for (var i = 0; i < tempResults.length; i++)
		{
			results[i] = tempResults[i];
		}
	}	
	
	//Call next filter
	minDistanceFilter(results);
}

//minDistanceFilter(tempResults)
//Iterates through data array to find elements that are greater than
//the minimum distance specified in HTML form
//Input: Gets value of searchMinDist element from HTML form
//Output: Outputs array with only those elements that are greater
//than the specified min distance; if no distance is specified entire initial 
//array is passed to next filter
function minDistanceFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var QdistanceMin;
	
	//Minimum distance
	QdistanceMin = document.getElementById('searchMinDist').value;

	
	//Search distance minimum
	if (QdistanceMin != "")
	{
		var minDist = Number(QdistanceMin);
		for (var i = 0; i < tempResults.length; i++)
		{
			//console.log("Record distance: " + tempResults[i].distance);
			if (tempResults[i].distance != "")
			{
				if (tempResults[i].distance >= minDist)
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
	
	//Call next filter
	maxDistanceFilter(results);
}

//maxDistanceFilter(tempResults)
//Iterates through data array to find elements that are less than
//the maximum distance specified in HTML form
//Input: Gets value of searchMaxDist element from HTML form
//Output: Outputs array with only those elements that are less
//than the specified max distance; if no distance is specified entire initial 
//array is passed to next filter
function maxDistanceFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var QdistanceMax;
	
	//Maximum distance
	QdistanceMax = document.getElementById('searchMaxDist').value;
	
	//Search distance maximum
	if (QdistanceMax != "")
	{
		var maxDist = Number(QdistanceMax);
		for (var i = 0; i < tempResults.length; i++)
		{
			if (tempResults[i].distance != "")
			{
				if (tempResults[i].distance <= maxDist)
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

	//Call next filter
	minElevationFilter(results);
}

//minElevationFilter(tempResults)
//Iterates through data array to find elements that are greater than
//the minimum elevation specified in HTML form
//Input: Gets value of searchMinElev element from HTML form
//Output: Outputs array with only those elements that are greater
//than the specified min elevation; if no elevation is specified entire initial 
//array is passed to next filter
function minElevationFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var QelevationMin;
	
	//Elevation gain minimum
	QelevationMin = document.getElementById('searchMinElev').value;
	
	
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

	//Call next filter
	maxElevationFilter(results);
}

//maxElevationFilter(tempResults)
//Iterates through data array to find elements that are less than
//the maximum elevation specified in HTML form
//Input: Gets value of searchMaxElev element from HTML form
//Output: Outputs array with only those elements that are less
//than the specified max elevation; if no elevation is specified entire initial 
//array is passed to next filter
function maxElevationFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var QelevationMax;
	
	//Max elevation gain
	QelevationMax = document.getElementById('searchMaxElev').value;
	
	
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
	
	//Call next filter
	fromDateFilter(results);	
}

//fromDateFilter(tempResults)
//Iterates through data array to find elements that are greater than
//the from date specified in HTML form
//Input: Gets value of from date elements from HTML form
//Output: Outputs array with only those elements that are greater
//than the specified from date; if no from date is specified entire initial 
//array is passed to next filter
function fromDateFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var QmonthFrom, QdayFrom, QyearFrom, QdateFrom;
	
	//From Date
	QmonthFrom = document.getElementById('searchMonthFrom').value;
	QdayFrom = document.getElementById('searchDayFrom').value;
	QyearFrom = document.getElementById('searchYearFrom').value;
	QdateFrom = createDate(QmonthFrom, QdayFrom, QyearFrom);
	
	
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
	
	//Call next function
	toDateFilter(results);
}

//toDateFilter(tempResults)
//Iterates through data array to find elements that are less than
//the to date specified in HTML form
//Input: Gets value of to date elements from HTML form
//Output: Outputs array with only those elements that are less
//than the specified to date; if no to date is specified entire initial 
//array is passed to next filter
function toDateFilter(tempResults)
{
	var results = [];

	//Get query parameters
	var QmonthTo, QdayTo, QyearTo, QdateTo;
	
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

	//Call next function
	nameFilter(results);
}

//nameFilter(tempResults)
//Iterates through data array, iterating through each objects searchTerms key
// to see if an element is equal to the string specified in the name field of
// the HTML form. Resulting array is passed to displayDataSearch() to display results
//Input: Gets value of searchName emelent from HTML form
//Output: Outputs array with only those elements that that have a search term element
//equal to the name element; if no name string is specified entire initial
//array is output array. Output array passed to displayDataSearch() to display results
function nameFilter(tempResults)
{
	var results = [];

	//Get query parameter
	var Qname;
	
	//Name
	Qname = document.getElementById('searchName').value;
	
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
		/*console.log("Results array:");
		console.log(results);*/
	
	//Print results
	if (results.length <= 0)
	{
		document.getElementById("searchResultsMessage").textContent = "No results, try another search.";
		displayDataSearch(results); 
	}
	else
	{
		document.getElementById("searchResultsMessage").textContent = results.length + " Trip Reports Returned";
			//console.log(results);
		sortData(results); 
	}
}
