/*******************************
* Author: Alicia Broederdorf
* Date: January 1, 2016
* Description: Hide divisions when initially viewing
* date page
*******************************/

/***************
* Name: showAllBoxes
* Description: Sets display attribute to block for all accordion divisions
* Input: None
* Output: None, divisions shown
***************/
function showAllBoxes(){
	document.getElementById("containerDate2016").style.display = "block";
	document.getElementById("containerDate2015").style.display = "block";
	document.getElementById("containerDate2014").style.display = "block";
	document.getElementById("containerDate2013").style.display = "block";
	document.getElementById("containerDate2012").style.display = "block";
	document.getElementById("containerDate2011").style.display = "block";
}

/***************
* Name: hideAllBoxes
* Description: Sets display attribute to none for all accordion divisions
* Input: None
* Output: None, divisions hidden
***************/
function hideAllBoxes(){
	document.getElementById("containerDate2016").style.display = "none";
	document.getElementById("containerDate2015").style.display = "none";
	document.getElementById("containerDate2014").style.display = "none";
	document.getElementById("containerDate2013").style.display = "none";
	document.getElementById("containerDate2012").style.display = "none";
	document.getElementById("containerDate2011").style.display = "none";
}

//Initialize Date Page
document.addEventListener('DOMContentLoaded', hideAllBoxes);

//Event Listeners
document.getElementById("showAll").addEventListener('click', showAllBoxes);
document.getElementById("hideAll").addEventListener('click', hideAllBoxes);