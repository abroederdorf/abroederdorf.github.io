/*******************************
* Author: Alicia Broederdorf
* Date: July 5, 2016
* Description: Functions to create navigation bar shown on every page
*******************************/

// Initialize Firebase
var config = {
apiKey: "AIzaSyBzPdO9Fo3M3kflIueWN_fmTtMV_upLygU",
authDomain: "project-5802414869996009310.firebaseapp.com",
databaseURL: "https://project-5802414869996009310.firebaseio.com",
storageBucket: "project-5802414869996009310.appspot.com",
};
firebase.initializeApp(config);

//Trip Report Slide Object Constructor
function trSlideObj(name, month, day, year, date, pageLink, imageLink){
	this.name = name;
	this.month = month;
	this.day = day;
	this.year = year;
	this.date = date;
	this.pageLink = pageLink;
	this.imageLink = imageLink;
}

//Name: buildRecentReports
//Description: Add recent report divs to homepage
//Input: None
//Output: 4 divs are created and returned
function buildRecentReports()
{	
	var results = [];
	
	//Get data snapshot from database
	var name, month, day, year, date, pageLink, imageLink;
	firebase.database().ref().once("value").then(function(snapshot){	
		snapshot.forEach(function(obj){
			var resultObj = obj.val();
				//console.log(resultObj);
			name = obj.val().name;
			month = obj.val().month;
			day = obj.val().day;
			year = obj.val().year;
			pageLink = obj.val().pageLink;
			imageLink = obj.val().imageLink;
			
			date = createDate(month, day, year);
			
			TR = new trSlideObj(name, month, day, year, date, pageLink, imageLink);
			results.push(TR);
		});	
			//console.log(TR);
			
		//Sort by date descending
		var temp;
		for (var i = 0; i < results.length; i++)
		{
			temp = results[i];
			var j = i - 1;
			while ((j >= 0) && (new Date(results[j].date).getTime() < new Date(temp.date).getTime()))
			{
				results[j+1] = results[j];
				j--;
			}
			results[j+1] = temp;
		}
		
		//Create slide items with information from database for 4 most recent reports
		var item, par, aLink, img, str, yrStr, yrDigits;
		var reportsDiv = document.getElementById('mostRecentReports');
		
		for (var i = 0; i < 4; i++)
		{
			var newDiv = document.createElement("div");
			newDiv.className = "recentReports";
			
			var str;
			var yrStr = results[i].year;
			var yrDigits = Number(yrStr);
			yrDigits -= 2000;
			if (yrDigits < 10)
				str = "0" + yrDigits;
			else
				str = yrDigits;
			
			var displayContent = "<center><a href='" + results[i].pageLink + "'><img class='picture' src='" + results[i].imageLink + "' width='150' height='150'><br><span>" + results[i].name + " " + results[i].month + "." + results[i].day + "." + str + "</span></a></center>";
			newDiv.innerHTML = displayContent;
			reportsDiv.appendChild(newDiv);
		}
	});
}


document.addEventListener('DOMContentLoaded', buildRecentReports);