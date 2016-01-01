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

//Initialize Location Page
document.getElementById("sectionCascadeRiverRoad").style.display = "none";
document.getElementById('sectionHwy20').style.display = 'none';
document.getElementById('sectionHwy542').style.display = 'none';
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