
// Initialize Firebase
var config = {
apiKey: "AIzaSyBzPdO9Fo3M3kflIueWN_fmTtMV_upLygU",
authDomain: "project-5802414869996009310.firebaseapp.com",
databaseURL: "https://project-5802414869996009310.firebaseio.com",
storageBucket: "project-5802414869996009310.appspot.com",
};
firebase.initializeApp(config);

//Trip Report Slide Object Constructor
function trSlideObj(name, month, day, year, date, pageLink, imageSlide){
	this.name = name;
	this.month = month;
	this.day = day;
	this.year = year;
	this.date = date;
	this.pageLink = pageLink;
	this.imageSlide = imageSlide;
}

//Create slides for homepage
function createSlides()
{
	var results = [];
	
	//Get data snapshot from database
	var name, month, day, year, date, pageLink, imageSlide;
	firebase.database().ref().once("value").then(function(snapshot){	
		snapshot.forEach(function(obj){
			var resultObj = obj.val();
				//console.log(resultObj);
			name = obj.val().name;
			month = obj.val().month;
			day = obj.val().day;
			year = obj.val().year;
			pageLink = obj.val().pageLink;
			imageSlide = obj.val().imageSlide;
			
			date = createDate(month, day, year);
			
			TR = new trSlideObj(name, month, day, year, date, pageLink, imageSlide);
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
		var innerCar = document.getElementById('myInnerCar');
		
		for (var i = 0; i < 4; i++)
		{
			//Create item div
			item = document.createElement('div');
			if (i == 0)
				item.className = "item active";
			else
				item.className = "item";
			innerCar.appendChild(item);
			
			//Create paragraph title
			par = document.createElement('p');
			par.className = "text-center slide-title";
			str = results[i].name + " " + results[i].month + "." + results[i].day + ".";
			yrStr = results[i].year;
			yrDigits = Number(yrStr);
			yrDigits -= 2000;
			if (yrDigits < 10)
				str += "0" + yrDigits;
			else
				str += yrDigits;
			par.textContent = str;
			item.appendChild(par);
			
			//Create link
			aLink = document.createElement('a');
			aLink.href = results[i].pageLink;
			item.appendChild(aLink);
			
			//Create image
			img = document.createElement('img');
			img.className = "slidePicture";
			img.src = results[i].imageSlide;
			aLink.appendChild(img);
			
		}
	
	});
}

document.addEventListener('DOMContentLoaded', createSlides);