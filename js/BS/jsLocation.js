/*******************************
* Author: Alicia Broederdorf
* Date: January 1, 2016
* Description: Hide divisions when initially viewing
* location page
*******************************/

/***************
* Name: showAllBoxes
* Description: Sets display attribute to block for all accordion divisions
* Input: None
* Output: None, divisions shown
***************/
function showAllBoxes(){
	document.getElementById("sectionCascadeRiverRoad").style.display = 'block';
	document.getElementById('sectionHwy20').style.display = 'block';
	document.getElementById('sectionHwy542').style.display = 'block';
	document.getElementById('sectionNCascades').style.display = 'block';
	document.getElementById('sectionCCascades').style.display = 'block';
	document.getElementById('sectionCWash').style.display = 'block';
	document.getElementById('sectionEnchantments').style.display = 'block';
	document.getElementById('sectionHwy2').style.display = 'block';
	document.getElementById('sectionLeavenworth').style.display = 'block';
	document.getElementById('sectionMtnLoopHwy').style.display = 'block';
	document.getElementById('sectionI90').style.display = 'block';
	document.getElementById('sectionIssaquah').style.display = 'block';
	document.getElementById('sectionNBend').style.display = 'block';
	document.getElementById('sectionSnoqPass').style.display = 'block';
	document.getElementById('sectionMtRainier').style.display = 'block';
	document.getElementById('sectionSCascades').style.display = 'block';
	document.getElementById('sectionTatoosh').style.display = 'block';
	document.getElementById('containerOlyPen').style.display = 'block';
	document.getElementById('sectionCanada').style.display = 'block';
	document.getElementById('sectionSouth').style.display = 'block';
	document.getElementById('sectionWest').style.display = 'block';
	document.getElementById('sectionCalifornia').style.display = 'block';
	document.getElementById('sectionOregon').style.display = 'block';
	document.getElementById('containerNCascades').style.display = 'block';
	document.getElementById('containerCCascades').style.display = 'block';
	document.getElementById('containerI90').style.display = 'block';
	document.getElementById('containerSCascades').style.display = 'block';
	document.getElementById('containerOutState').style.display = 'block';
}

/***************
* Name: hideAllBoxes
* Description: Sets display attribute to none for all accordion divisions
* Input: None
* Output: None, divisions hidden
***************/
function hideAllBoxes(){
	document.getElementById("sectionCascadeRiverRoad").style.display = "none";
	document.getElementById('sectionHwy20').style.display = 'none';
	document.getElementById('sectionHwy542').style.display = 'none';
	document.getElementById('sectionNCascades').style.display = 'none';
	document.getElementById('sectionCCascades').style.display = 'none';
	document.getElementById('sectionCWash').style.display = 'none';
	document.getElementById('sectionEnchantments').style.display = 'none';
	document.getElementById('sectionHwy2').style.display = 'none';
	document.getElementById('sectionLeavenworth').style.display = 'none';
	document.getElementById('sectionMtnLoopHwy').style.display = 'none';
	document.getElementById('sectionI90').style.display = 'none';
	document.getElementById('sectionIssaquah').style.display = 'none';
	document.getElementById('sectionNBend').style.display = 'none';
	document.getElementById('sectionSnoqPass').style.display = 'none';
	document.getElementById('sectionMtRainier').style.display = 'none';
	document.getElementById('sectionSCascades').style.display = 'none';
	document.getElementById('sectionTatoosh').style.display = 'none';
	document.getElementById('containerOlyPen').style.display = 'none';
	document.getElementById('sectionCanada').style.display = 'none';
	document.getElementById('sectionSouth').style.display = 'none';
	document.getElementById('sectionWest').style.display = 'none';
	document.getElementById('sectionCalifornia').style.display = 'none';
	document.getElementById('sectionOregon').style.display = 'none';
	document.getElementById('containerNCascades').style.display = 'none';
	document.getElementById('containerCCascades').style.display = 'none';
	document.getElementById('containerI90').style.display = 'none';
	document.getElementById('containerSCascades').style.display = 'none';
	document.getElementById('containerOutState').style.display = 'none';
}

//Initialize Date Page
document.addEventListener('DOMContentLoaded', hideAllBoxes);

//Event Listeners
document.getElementById("showAll").addEventListener('click', showAllBoxes);
document.getElementById("hideAll").addEventListener('click', hideAllBoxes);