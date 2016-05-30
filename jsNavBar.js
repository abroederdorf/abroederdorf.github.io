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
	var displayContent = "<span id='homeLink'><a href='http://alpinealicia.com'>Home</a>  | </span><span><a href='/search.html'>Search</a> | </span><span id='tripLink'> trip reports by </span><a href='/date.html'><span>Date</span></a></span>";
	newDiv.innerHTML = displayContent;
	
	return newDiv;
}

var navDivBar = document.getElementById('navBar');
navDivBar.appendChild(buildNavDiv());