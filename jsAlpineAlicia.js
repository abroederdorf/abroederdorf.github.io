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
