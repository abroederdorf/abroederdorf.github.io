/*******************************
* Author: Alicia Broederdorf
* Date: February 7, 2016
* Description: Functions to create navigation bar shown on every page
*******************************/


//Name: buildNavDiv
//Description: Create div and add innerHTML content to create links for navigation
//Input: None
//Output: 1 div is created and returned
function buildNavDiv()
{
	var newDiv = document.createElement("div");
	var displayContent = "<nav class='navbar navbar-default navbar-fixed-top'><div class='container-fluid'><div class='navbar-header'><button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#collapsedNav'><span class='sr-only'>Toggle navigation</span><span class='icon-bar'></span><span class='icon-bar'></span></button><a href='http://alpinealicia.com/indexBS.html' class='navbar-brand' id='pageTitle'><strong><span class='glyphicon glyphicon-tree-conifer'></span>   Alpine Alicia</strong></a></div><div class='collapse navbar-collapse'><ul class='nav navbar-nav'><li role='presentation'><a href='http://alpinealicia.com/search.html'><span class='glyphicon glyphicon-search'></span>   Search</a></li><li role='presentation'><a href='http://alpinealicia.com/date.html'><span class='glyphicon glyphicon-calendar'></span>   By Date</a></li></ul><span class='navbar-text navbar-right' id='siteSlogan'><span class='glyphicon glyphicon-edit'></span>     Trip reports from my hikes, climbs, and other adventures</span></div></div></nav>";
	newDiv.innerHTML = displayContent;
	
	return newDiv;
}

var navDivBar = document.getElementById('navBar');
navDivBar.appendChild(buildNavDiv());