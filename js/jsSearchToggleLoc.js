/****************************************
Alicia Broederdorf
June 2, 2016
Contains all functions for toggling the
checkboxes for the different locations
****************************************/

//checkToggleNC
//Toggles the checkmarks of the north cascade subregions
//Input: None
//Output: Checkmarks changed
function checkToggleNC()
{
	if (document.getElementById('searchNCLoc').checked)
	{
		document.getElementById("search542Sub").checked = true;
		document.getElementById("search20Sub").checked = true;
		document.getElementById("searchCasRiverSub").checked = true;
		document.getElementById("searchNCSub").checked = true;
	}
	else
	{
		document.getElementById("search542Sub").checked = false;
		document.getElementById("search20Sub").checked = false;
		document.getElementById("searchCasRiverSub").checked = false;
		document.getElementById("searchNCSub").checked = false;
	}
}

//checkToggleCC
//Toggles the checkmarks of the central cascade subregions
//Input: None
//Output: Checkmarks changed
function checkToggleCC()
{
	if (document.getElementById('searchCCLoc').checked)
	{
		document.getElementById("search2Sub").checked = true;
		document.getElementById("searchLoopSub").checked = true;
		document.getElementById("searchLworthSub").checked = true;
		document.getElementById("searchEnchantSub").checked = true;
		document.getElementById("searchCWSub").checked = true;
		document.getElementById("searchCCSub").checked = true;
	}
	else
	{
		document.getElementById("search2Sub").checked = false;
		document.getElementById("searchLoopSub").checked = false;
		document.getElementById("searchLworthSub").checked = false;
		document.getElementById("searchEnchantSub").checked = false;
		document.getElementById("searchCWSub").checked = false;
		document.getElementById("searchCCSub").checked = false;
	}
}

//checkToggleI90
//Toggles the checkmarks of the I90 subregions
//Input: None
//Output: Checkmarks changed
function checkToggleI90()
{
	if (document.getElementById('searchI90Loc').checked)
	{
		document.getElementById("searchIssaSub").checked = true;
		document.getElementById("searchNBendSub").checked = true;
		document.getElementById("searchSnoqSub").checked = true;
		document.getElementById("searchI90Sub").checked = true;
	}
	else
	{
		document.getElementById("searchIssaSub").checked = false;
		document.getElementById("searchNBendSub").checked = false;
		document.getElementById("searchSnoqSub").checked = false;
		document.getElementById("searchI90Sub").checked = false;
	}
}

//checkToggleSC
//Toggles the checkmarks of the south cascade subregions
//Input: None
//Output: Checkmarks changed
function checkToggleSC()
{
	if (document.getElementById('searchSCLoc').checked)
	{
		document.getElementById("searchMtRainSub").checked = true;
		document.getElementById("searchTatooshSub").checked = true;
		document.getElementById("searchSCSub").checked = true;
	}
	else
	{
		document.getElementById("searchMtRainSub").checked = false;
		document.getElementById("searchTatooshSub").checked = false;
		document.getElementById("searchSCSub").checked = false;
	}
}

//checkToggleOWS
//Toggles the checkmarks of the outside washington state subregions
//Input: None
//Output: Checkmarks changed
function checkToggleOWS()
{
	if (document.getElementById('searchOWSLoc').checked)
	{
		document.getElementById("searchCanSub").checked = true;
		document.getElementById("searchOrSub").checked = true;
		document.getElementById("searchCaliSub").checked = true;
		document.getElementById("searchWestSub").checked = true;
		document.getElementById("searchSouthSub").checked = true;
		document.getElementById("searchOWSSub").checked = true;	
	}
	else
	{
		document.getElementById("searchCanSub").checked = false;
		document.getElementById("searchOrSub").checked = false;
		document.getElementById("searchCaliSub").checked = false;
		document.getElementById("searchWestSub").checked = false;
		document.getElementById("searchSouthSub").checked = false;
		document.getElementById("searchOWSSub").checked = false;	
	}
}
