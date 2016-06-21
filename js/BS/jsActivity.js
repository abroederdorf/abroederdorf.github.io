/*******************************
* Author: Alicia Broederdorf
* Date: January 1, 2016
* Description: Hide divisions when initially viewing
* activity page
*******************************/

/***************
* Name: showAllBoxes
* Description: Sets display attribute to block for all accordion divisions
* Input: None
* Output: None, divisions shown
***************/
function showAllBoxes(){
	document.getElementById('containerActHike').style.display = 'block';
	document.getElementById('containerActClimb').style.display = 'block';
	document.getElementById('containerActCrag').style.display = 'block';
	document.getElementById('containerActSki').style.display = 'block';
}

/***************
* Name: hideAllBoxes
* Description: Sets display attribute to none for all accordion divisions
* Input: None
* Output: None, divisions hidden
***************/
function hideAllBoxes(){
	document.getElementById('containerActHike').style.display = 'none';
	document.getElementById('containerActClimb').style.display = 'none';
	document.getElementById('containerActCrag').style.display = 'none';
	document.getElementById('containerActSki').style.display = 'none';
}

//Initialize Date Page
document.addEventListener('DOMContentLoaded', hideAllBoxes);

//Event Listeners
document.getElementById("showAll").addEventListener('click', showAllBoxes);
document.getElementById("hideAll").addEventListener('click', hideAllBoxes);
