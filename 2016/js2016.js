/***************************
* Name: Alicia Broederdorf
* Date: December 21, 2017
* Description: Functions for using Google charts to draw charts
*****************************/

//Load packages for Google Charts
google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.load('visualization', '1', {packages: ['corechart', 'line']});
google.load("visualization", "1", {packages:["corechart"]});

//Call functions to draw charts
google.setOnLoadCallback(drawSkiDays);
google.setOnLoadCallback(drawGymDifficulty);
google.setOnLoadCallback(drawGymPitches);
google.setOnLoadCallback(drawOutdoorDifficulty);
google.setOnLoadCallback(drawOutdoorLocation);
google.setOnLoadCallback(drawOutdoorType);
google.setOnLoadCallback(drawRunningMileage);
google.setOnLoadCallback(drawRunningElevation);
google.setOnLoadCallback(drawOverallDays);
google.setOnLoadCallback(drawOutdoorDiffTotal);
google.setOnLoadCallback(drawOutdoorDiffCurrent);
google.setOnLoadCallback(drawOutdoorLocTotal);
google.setOnLoadCallback(drawOutdoorLocCurrent);
google.setOnLoadCallback(drawStepsMonthly);

//Stacked column chart to depict ski days, sum of resort and backcountry days
function drawSkiDays() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Year');
      data.addColumn('number', 'Resort Days');
      data.addColumn('number', 'Backcountry Days');

      data.addRows([
        [2009, 3, 0],
        [2010, 12, 0],
        [2011, 15, 1],
        [2012, 11, 1],
        [2013, 17, 2],
        [2014, 15, 0],
        [2015, 11, 1],
        [2016, 3, 1]
      ]);

      var options = {
        title: 'Total Number of Ski Days',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
        isStacked: true,
		legend: { position: 'bottom', maxLines: 1 },
		height: 300,
		width: 700,
        hAxis: {
          title: 'Years',
		  viewWindow: {
            min: [2008],
            max: [2017]
          },
		  format: '####',
		  ticks: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        vAxis: {
          title: 'Number of Days'
        },
		chartArea: {left:50, width: 600},
		colors: ['#38ACEC', '#4CC417']
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('skiDaysChart'));
      chart.draw(data, options);
}

//Line chart to depict average difficulty per month of gym climbing
function drawGymDifficulty() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Month');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['Jan', 10.856, 11.057, 11.10, 9.33],    ['Feb', 11.488, 13.233, 11.26, 9.5],   ['Mar', 7.857, 11.253, 10.69, 9.55],  
  ['Apr', 9.857, 11.893, 10.19, 0],   ['May', 0, 0, 11.666, 0],  ['Jun', 6.5, 0, 9.487, 0],
	['Jul', 5.2, 0, 9.65, 0],    ['Aug', 7.955, 9.429, 9.25, 0],   ['Sep', 9.76, 10.372, 0, 0],  
  ['Oct', 11.2, 9.611, 9.222, 0],   ['Nov', 11.8, 11.257, 0, 0],  ['Dec', 9.278, 10.653, 9.937, 7.3]
	]);

	var options = {
		title: 'Average Difficulty',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 300,
		width: 700,
		legend: { 
			position: 'bottom', 
			maxLines: 3 
		},
		hAxis: {
		  title: 'Month'
		},
		vAxis: {
		  title: 'Average Difficulty',
		  gridlines: { 
			count: 6 
		  }
		},
		chartArea: {left:50, width: 600},
		colors: ['#0000FF', '#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('gymClimbingAvgDiff'));
	chart.draw(data, options);
}

//Line chart to depict number of pitches per month of gym climbing
function drawGymPitches() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Month');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['Jan', 64, 51, 49, 16],    ['Feb', 46, 74, 41, 8],   ['Mar', 7, 37, 46, 10],  
  ['Apr', 17, 28, 19, 0],   ['May', 0, 0, 9, 0],  ['Jun', 21, 0, 48, 0],
	['Jul', 10, 0, 10, 0],    ['Aug', 16, 11, 10, 0],   ['Sep', 25, 46, 0, 0],  
  ['Oct', 27, 58, 9, 0],   ['Nov', 10, 58, 0, 0],   ['Dec', 16, 76, 8, 21]
	]);

	var options = {
		title: 'Number of Pitches',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 300,
		width: 700,
		legend: { 
			position: 'bottom', maxLines: 3 
		},
		hAxis: {
		  title: 'Month'
		},
		vAxis: {
		  title: 'Number of Pitches',
		  gridlines: { count: 6 }
		},
		chartArea: {left:50, width: 600},
		colors: ['#0000FF', '#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('gymClimbingNumPitch'));
	chart.draw(data, options);
}

//Line chart to depict difficulty of pitches per year of outdoor climbing
function drawOutdoorDifficulty() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Rating');
	data.addColumn('number', '2010');
	data.addColumn('number', '2011');
	data.addColumn('number', '2012');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['5-', 0, 2, 12, 10, 2, 3, 0],    ['5.4', 2, 12, 3, 2, 4, 2, 0],   ['5.5', 1, 16, 10, 2, 9, 2, 0],  
  ['5.6', 5, 14, 19, 16, 42, 16, 1],   ['5.7', 4, 24, 24, 13, 28, 3, 0],  ['5.8', 1, 14, 26, 2, 28, 3, 0],
	['5.9', 5, 5, 14, 3, 8, 4, 0],    ['5.10a', 0, 3, 6, 1, 12, 1, 0],   ['5.10b', 0, 4, 4, 1, 3, 0, 0],  
  ['5.10c', 0, 0, 3, 1, 0, 0, 0],   ['5.10d', 0, 0, 1, 0, 0, 0, 0],  ['5.11a', 0, 1, 0, 0, 0, 0, 0]
	]);

	var options = {
		title: 'Difficulty of Pitches',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 360,
		width: 700,
		legend: { position: 'bottom', maxLines: 3 },
		hAxis: {
		  title: 'Rating'
		},
		vAxis: {
		  title: 'Number of Pitches',
		  gridlines: { count: 6 }
		},
		chartArea: {left:50, width: 600},
		colors: [ '#B93B8F', '#8467D7','#FFA500', '#0000FF', '#800000', '#008000', '#B93B8F']
	};

	var chart = new google.visualization.LineChart(document.getElementById('outdoorDiffClimbs'));
	chart.draw(data, options);
}

//Line chart to depict location of pitches per year of outdoor climbing
function drawOutdoorLocation() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Location');
	data.addColumn('number', '2010');
	data.addColumn('number', '2011');
	data.addColumn('number', '2012');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['1', 4, 9, 2, 0, 1, 0, 1], ['2', 0, 5, 0, 0, 0, 0, 0], ['3', 8, 17, 27, 22, 44, 17, 0],  
  ['4', 0, 9, 0, 0, 4, 0, 0], ['5', 0, 3, 3, 7, 0, 0, 0],  ['6', 0, 19, 28, 0, 7, 0, 0],   
  ['7', 0, 7, 6, 3, 5, 3, 0], ['8', 0, 3, 3, 5, 0, 2, 0], ['9', 0, 1, 0, 3, 0, 0, 0],  
  ['10', 0, 0, 0, 0, 5, 0, 0], ['11', 0, 8, 11, 0, 6, 0, 0], ['12', 6, 14, 33, 5, 31, 0, 0], 
	['13', 0, 0, 9, 6, 33, 12, 0]
	]);

	var options = {
		title: 'Location of Climbs',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 300,
		width: 700,
		legend: { position: 'bottom', maxLines: 3 },
		hAxis: {
		  title: 'Location'
		},
		vAxis: {
		  title: 'Number of Routes',
		  gridlines: { count: 6 }
		},
		chartArea: {left:50, width: 600},
		colors: [ '#B93B8F', '#8467D7','#FFA500', '#0000FF', '#800000', '#008000', '#B93B8F']
	};

	var chart = new google.visualization.LineChart(document.getElementById('outdoorLocations'));
	chart.draw(data, options);
}

//Stacked column chart to depict type of routes per year of outdoor climbing
function drawOutdoorType() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Year');
      data.addColumn('number', 'Top Rope');
      data.addColumn('number', 'Trad Follow');
	  data.addColumn('number', 'Sport');
      data.addColumn('number', 'Trad Lead');
	  data.addColumn('number', 'Trad Lead Swap');

      data.addRows([
        [2010, 16, 0, 2, 0, 0],
        [2011, 25, 8, 26, 23, 13],
        [2012, 51, 7, 12, 17, 35],
        [2013, 17, 0, 4, 7, 23],
        [2014, 50, 16, 11, 24, 35],
        [2015, 14, 0, 8, 9, 3], 
        [2016, 1, 0, 0, 0, 0]
      ]);

      var options = {
        title: 'Type of Climbs',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
        isStacked: true,
		legend: { position: 'bottom', maxLines: 3 },
		height: 300,
		width: 700,
        hAxis: {
          title: 'Years',
		  viewWindow: {
            min: [2009],
            max: [2017]
          },
		  format: '####',
		  ticks: [2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        vAxis: {
          title: 'Number of Routes'
        },
		chartArea: {left:50, width: 600},
		colors: ['#38ACEC', '#4CC417', '#800000', '#FFA500', '#B93B8F']
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('outdoorType'));
      chart.draw(data, options);
}

//Line chart to depict mileage per month for running
function drawRunningMileage() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Month');
	data.addColumn('number', '2012');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['Jan', 39.12, 50.69, 0, 0,0],    ['Feb', 17.41, 71.63, 2.07, 0, 0],   ['Mar',0, 53.13, 4.15, 0, 0],  
  ['Apr', 3, 57.9, 3.14, 0, 0, 0, 0],   ['May', 38.05, 5.01, 0, 0, 0],  ['Jun', 49.58, 24.71, 0, 0, 0],
	['Jul', 59.53, 5.21, 0, 0, 0],    ['Aug', 67.2, 30.05, 0, 0, 0],   ['Sep', 54.47, 48.12, 0, 0, 0],  
  ['Oct', 36.29, 77.34, 9.68, 0, 0],   ['Nov', 70.79, 69.98, 12.52, 0, 0],  ['Dec', 58.3, 33.16, 0, 0, 0],
	]);

	var options = {
		title: 'Mileage by Month',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 300,
		width: 700,
		legend: { position: 'bottom', maxLines: 3 },
		hAxis: {
		  title: 'Month'
		},
		vAxis: {
		  title: 'Total Miles',
		  gridlines: { count: 6 }
		},
		chartArea: {left:50, width: 600},
		colors: ['#FFA500', '#0000FF', '#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('runningMileage'));
	chart.draw(data, options);
}

//Line chart to depict elevation per month for running
function drawRunningElevation() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Month');
	data.addColumn('number', '2012');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['Jan', 0, 2470, 0, 0, 0],    ['Feb', 0, 3235, 107, 0, 0],   ['Mar', 0, 2643, 191, 0, 0],  
  ['Apr', 0, 2472, 164, 0, 0],   ['May', 1579, 110, 0, 0, 0],  ['Jun', 1847, 1564, 0, 0, 0],
	['Jul', 2141, 329, 0, 0, 0],    ['Aug', 2502, 1764, 0, 0, 0],   ['Sep', 1766, 2191, 0, 0, 0],  
  ['Oct', 1405, 1948, 614, 0, 0],   ['Nov', 3161, 3426, 998, 0, 0],  ['Dec', 2172, 1959, 0, 0, 0],
	]);

	var options = {
		title: 'Elevation by Month',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 300,
		width: 700,
		legend: { position: 'bottom', maxLines: 3 },
		hAxis: {
		  title: 'Month'
		},
		vAxis: {
		  title: 'Total Elevation [feet]',
		  gridlines: { count: 6 }
		},
		chartArea: {left:100, width: 600},
		colors: ['#FFA500', '#0000FF', '#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('runningElevation'));
	chart.draw(data, options);
}

//Pie chart to depict number of days spent per activity for overall stats
function drawOverallDays() {
	var data = google.visualization.arrayToDataTable([
	  ['Activity', 'Number of Days'],
	  ['Hiking',     10],
	  ['Running',     0],
	  ['Outside Rock Climbing',  1],
	  ['Gym Climbing', 7],
	  ['Skiing',    4]
	]);

	var options = {
	  title: 'How I Spent My Active Days',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 16,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 700,
	  height: 300,
	  backgroundColor: 'transparent'
	};

	var chart = new google.visualization.PieChart(document.getElementById('overallDays'));
	chart.draw(data, options);
}

//Pie chart to depict difficulty of outdoor climbs for all years
function drawOutdoorDiffTotal() {
	var data = google.visualization.arrayToDataTable([
	  ['Rating', 'Number of Pitches'],
	  ['5-', 29],
	  ['5.4', 25],
	  ['5.5', 40],
	  ['5.6', 113],
	  ['5.7', 96],
	  ['5.8', 74],
	  ['5.9', 39],
	  ['5.10a', 23],
	  ['5.10b', 12],
	  ['5.10c', 4],
	  ['5.10d', 1],
	  ['5.11a', 1]
	]);

	var options = {
	  title: 'Difficulty of All Outdoor Climbing Pitches',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: 'transparent'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorDiffPieTotal'));
	chart.draw(data, options);
}

//Pie chart to depict difficulty of outdoor climbs for current year
function drawOutdoorDiffCurrent() {
	var data = google.visualization.arrayToDataTable([
	  ['Rating', 'Number of Pitches'],
	  ['5-', 0],
	  ['5.4', 0],
	  ['5.5', 0],
	  ['5.6', 1],
	  ['5.7', 0],
	  ['5.8', 0],
	  ['5.9', 0],
	  ['5.10a', 0],
	  ['5.10b', 0],
	  ['5.10c', 0],
	  ['5.10d', 0],
	  ['5.11a', 0]
	]);

	var options = {
	  title: 'Difficulty of Outdoor Climbing Pitches in 2016',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: 'transparent'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorDiffPieCurrent'));
	chart.draw(data, options);
}

//Pie chart to depict location of outdoor climbs for all years
function drawOutdoorLocTotal() {
	var data = google.visualization.arrayToDataTable([
	  ['Location', 'Number of Pitches'],
	  ['Exit 38', 17],
	  ['Index', 5],
	  ['Leavenworth', 135],
	  ['Mazama', 13],
	  ['Tieton', 13],
	  ['Vantage', 54],
	  ['North Cascades', 24],
	  ['Central Cascades', 13],
	  ['South Cascades', 4],
	  ['Mt Erie', 5],
	  ['Smith', 25],
	  ['Squamish', 89],
	  ['Out of State', 60]
	]);

	var options = {
	  title: 'Location of All Outdoor Climbing Pitches',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: 'transparent'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorLocPieTotal'));
	chart.draw(data, options);
}

//Pie chart to depict location of outdoor climbs for current year
function drawOutdoorLocCurrent() {
	var data = google.visualization.arrayToDataTable([
	  ['Location', 'Number of Pitches'],
	  ['Exit 38', 1],
	  ['Index', 0],
	  ['Leavenworth', 0],
	  ['Mazama', 0],
	  ['Tieton', 0],
	  ['Vantage', 0],
	  ['North Cascades', 0],
	  ['Central Cascades', 0],
	  ['South Cascades', 0],
	  ['Mt Erie', 0],
	  ['Smith', 0],
	  ['Squamish', 0],
	  ['Out of State', 0]
	]);

	var options = {
	  title: 'Location of Outdoor Climbing Pitches in 2016',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: 'transparent'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorLocPieCurrent'));
	chart.draw(data, options);
}

//Line chart to depict steps per month 
function drawStepsMonthly() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Month');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');
  data.addColumn('number', '2016');

	data.addRows([
	['Jan', 0, 198300, 157665],    ['Feb', 0, 215989, 163115],   ['Mar', 0, 257487, 184236],  
  ['Apr', 0, 199932, 185759],   ['May', 0, 212319, 195289],  ['Jun', 0, 346706, 241814],
	['Jul', 0, 300509, 339291],    ['Aug', 303340, 243670, 329360],   ['Sep', 288083, 286882, 160228],  
  ['Oct', 245026, 164057, 143484],   ['Nov', 255106, 110484, 144179],  ['Dec', 212604, 158217, 189841],
	]);

	var options = {
		title: 'Steps by Month',
		titleTextStyle: {
			color: '#000000',
			fontSize: 16,
			fontName: 'Arial',
			bold: true
		},
		height: 300,
		width: 700,
		legend: { position: 'bottom', maxLines: 3 },
		hAxis: {
		  title: 'Month'
		},
		vAxis: {
		  title: 'Total Steps',
		  gridlines: { count: 6 }
		},
		chartArea: {left:100, width: 600},
		colors: ['#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('monthlySteps'));
	chart.draw(data, options);
}

