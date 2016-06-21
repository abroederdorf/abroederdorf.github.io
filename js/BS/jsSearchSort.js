/****************************************
Alicia Broederdorf
June 2, 2016
Contains all functions for sorting data
by a prescribed attribute
****************************************/

//sortData(array)
//Sorts returned results based on specified category (date, name, type, subregion,
//distance, or elevation) and type (asc or desc)
//Input: Array of trOBj
//Output: None
function sortData(array)
{
	var cat, type, str;
	for (var i = 1; i < 7; i++)
	{	
		str = "sortCat" + i;
		if (document.getElementById(str).checked)
			cat = document.getElementById(str).value;
	}
	for (var i = 1; i < 3; i++)
	{	
		str = "sortType" + i;
		if (document.getElementById(str).checked)
			type = document.getElementById(str).value;
	}
	
	//Check what case
	if (cat == 'name')
	{
		if (type == 'asc')
			sortNameAsc(array);
		else
			sortNameDesc(array);
	}
	else if (cat == 'elevation')
	{
		if (type == 'asc')
			sortElevationAsc(array);
		else
			sortElevationDesc(array);
	}
	else if (cat == 'type')
	{
		if (type == 'asc')
			sortTypeAsc(array);
		else
			sortTypeDesc(array);
	}
	else if (cat == 'subregion')
	{
		if (type == 'asc')
			sortSubregionAsc(array);
		else
			sortSubregionDesc(array);
	}
	else if (cat == 'distance')
	{
		if (type == 'asc')
			sortDistanceAsc(array);
		else
			sortDistanceDesc(array);
	}
	else 
	{
		if (type == 'asc')
			sortDateAsc(array);
		else
			sortDateDesc(array);		
	}
}

//sortNameAsc
//Sorts array by name in ascending order
//Input: Array of trObj
//Output: Sorted array
function sortNameAsc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && array[j].name > temp.name)
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortNameDesc
//Sorts array by name in descending order
//Input: Array of trObj
//Output: Sorted array
function sortNameDesc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && array[j].name < temp.name)
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortDateAsc
//Sorts array by date in ascending order
//Input: Array of trObj
//Output: Sorted array
function sortDateAsc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		
		
		while ((j >= 0) && (new Date(array[j].date).getTime() > new Date(temp.date).getTime()))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortDateDesc
//Sorts array by date in descending order
//Input: Array of trObj
//Output: Sorted array
function sortDateDesc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while ((j >= 0) && (new Date(array[j].date).getTime() < new Date(temp.date).getTime()))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}
	
//sortTypeAsc
//Sorts array by type in ascending order
//Input: Array of trObj
//Output: Sorted array
function sortTypeAsc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && array[j].type > temp.type)
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortTypeDesc
//Sorts array by type in descending order
//Input: Array of trObj
//Output: Sorted array
function sortTypeDesc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && array[j].type < temp.type)
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}
	
//sortSubregionAsc
//Sorts array by subregion in ascending order
//Input: Array of trObj
//Output: Sorted array
function sortSubregionAsc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && array[j].subregion > temp.subregion)
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortSubregionDesc
//Sorts array by subregion in descending order
//Input: Array of trObj
//Output: Sorted array
function sortSubregionDesc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && array[j].subregion < temp.subregion)
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}	

//sortDistanceAsc
//Sorts array by distance in ascending order
//Input: Array of trObj
//Output: Sorted array
function sortDistanceAsc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && Number(array[j].distance) > Number(temp.distance))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortDistanceDesc
//Sorts array by distance in descending order
//Input: Array of trObj
//Output: Sorted array
function sortDistanceDesc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && Number(array[j].distance) < Number(temp.distance))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortElevationAsc
//Sorts array by elevation in ascending order
//Input: Array of trObj
//Output: Sorted array
function sortElevationAsc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && Number(array[j].elevation) > Number(temp.elevation))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}

//sortElevationDesc
//Sorts array by elevation in descending order
//Input: Array of trObj
//Output: Sorted array
function sortElevationDesc(array)
{
	var temp;
	for (var i = 0; i < array.length; i++)
	{
		temp = array[i];
		var j = i - 1;
		while (j >= 0 && Number(array[j].elevation) < Number(temp.elevation))
		{
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = temp;
	}
	
	//Display data
	displayDataSearch(array);
}
	
	
