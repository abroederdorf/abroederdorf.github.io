/*******************************
* Author: Alicia Broederdorf
* Date: april 9, 2017
* Description: Controls for weather page
*******************************/

var divArray = ["avyInner", "cragInner", "ccInner", "ncInner", "esInner", "olyInner", "volInner", "skiInner"];

/***************
* Name: showAllBoxes
* Description: Sets display attribute to block for all accordion divisions
* Input: None
* Output: None, divisions shown
***************/
function showAllBoxes(){
	for (var i = 0; i < divArray.length; i++)
		document.getElementById(divArray[i]).style.display = "block";
}

/***************
* Name: hideAllBoxes
* Description: Sets display attribute to none for all accordion divisions
* Input: None
* Output: None, divisions hidden
***************/
function hideAllBoxes(){
	for (var i = 0; i < divArray.length; i++)
		document.getElementById(divArray[i]).style.display = "none";
}

//Initialize Date Page
document.addEventListener('DOMContentLoaded', hideAllBoxes);

//Event Listeners
document.getElementById("showAll").addEventListener('click', showAllBoxes);
document.getElementById("hideAll").addEventListener('click', hideAllBoxes);