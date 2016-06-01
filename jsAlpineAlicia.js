/*******************************
* Author: Alicia Broederdorf
* Date: December 31, 2015
* Description: Functions to support Alpine Alicia web site
*******************************/

//Name: toggle
//Description: Toggles display property of element
//Input: Document Id of element to toggle display property of
//Output: No output, HTML elements will be shown or hidden on page
function toggle(id){
	var div = document.getElementById(id);
	if (div.style.display == "none")
		div.style.display = "block";
	else
		div.style.display = "none";
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

//Google analytics tracking
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-71952475-1', 'auto');
  ga('send', 'pageview', location.pathname);
 