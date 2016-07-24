/***************************
* Name: Alicia Broederdorf
* Date: January 3, 2016
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
        [2015, 11, 1]
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
            max: [2016]
          },
		  format: '####',
		  ticks: [2009, 2010, 2011, 2012, 2013, 2014, 2015]
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

	data.addRows([
	['Jan', 6.746, 6.815, 6.99],    ['Feb', 7.104, 8.658, 6.98],   ['Mar', 4.571, 7.089, 6.71],  ['Apr', 5.750, 7.483, 6.15],   ['May', 0, 0, 7.333],  ['Jun', 3.750, 0, 5.6964],
	['Jul', 3.1, 0, 5.65],    ['Aug', 4.644, 5.571, 5.45],   ['Sep', 5.64, 6.378, 0],  ['Oct', 6.673, 5.793, 5.222],   ['Nov', 7.1, 6.964, 0],  ['Dec', 5.194, 6.612, 5.937]
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

	data.addRows([
	['Jan', 64, 51, 49],    ['Feb', 46, 74, 41],   ['Mar', 7, 37, 46],  ['Apr', 17, 28, 19],   ['May', 0, 0, 9],  ['Jun', 21, 0, 48],
	['Jul', 10, 0, 10],    ['Aug', 16, 11, 10],   ['Sep', 25, 46, 0],  ['Oct', 27, 58, 9],   ['Nov', 10, 58, 0],   ['Dec', 16, 76, 8]
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

	data.addRows([
	['5-', 0, 2, 12, 10, 3, 3],    ['5.4', 2, 12, 3, 2, 12, 2],   ['5.5', 1, 16, 10, 2, 9, 2],  ['5.6', 5, 14, 19, 16, 37, 16],   ['5.7', 4, 24, 24, 13, 30, 3],  ['5.8', 1, 14, 26, 2, 21, 3],
	['5.9', 5, 5, 14, 3, 7, 4],    ['5.10a', 0, 3, 6, 1, 12, 1],   ['5.10b', 0, 4, 4, 1, 3, 0],  ['5.10c', 0, 0, 3, 1, 0, 0],   ['5.10d', 0, 0, 1, 0, 0, 0],  ['5.11a', 0, 1, 0, 0, 0, 0]
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
		colors: [ '#B93B8F', '#8467D7','#FFA500', '#0000FF', '#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('outdoorDiffClimbs'));
	chart.draw(data, options);
}

//Line chart to depict location of routes per year of outdoor climbing
function drawOutdoorLocation() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Location');
	data.addColumn('number', '2010');
	data.addColumn('number', '2011');
	data.addColumn('number', '2012');
	data.addColumn('number', '2013');
	data.addColumn('number', '2014');
	data.addColumn('number', '2015');

	data.addRows([
	['1', 4, 9, 2, 0, 1, 0],    ['2', 0, 5, 0, 0, 0, 0],   ['3', 8, 13, 22, 11, 39, 14],  ['4', 0, 9, 0, 0, 4, 0],   
	['5', 0, 3, 3, 7, 0, 0],  ['6', 0, 19, 28, 0, 7, 0],   ['7', 0, 2, 1, 1, 2, 1],    ['8', 0, 1, 1, 1, 0, 1],   
	['9', 0, 1, 0, 3, 0, 0],  ['10', 0, 0, 0, 0, 5, 0],   ['11', 0, 3, 11, 0, 2, 0],   ['12', 6, 6, 18, 11, 27, 0], 
	['13', 0, 0, 9, 0, 23, 12]
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
		colors: [ '#B93B8F', '#8467D7','#FFA500', '#0000FF', '#800000', '#008000']
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
        [2011, 25, 4, 22, 17, 3],
        [2012, 51, 7, 12, 17, 8],
        [2013, 17, 0, 4, 7, 6],
        [2014, 49, 16, 11, 24, 10],
        [2015, 14, 0, 8, 5, 1]
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
            max: [2016]
          },
		  format: '####',
		  ticks: [2010, 2011, 2012, 2013, 2014, 2015]
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

	data.addRows([
	['Jan', 39.12, 50.69, 0, 0],    ['Feb', 17.41, 71.63, 2.07, 0],   ['Mar',0, 53.13, 4.15, 0],  ['Apr', 3, 57.9, 3.14, 0],   ['May', 38.05, 5.01, 0, 0],  ['Jun', 49.58, 24.71, 0, 0],
	['Jul', 59.53, 5.21, 0, 0],    ['Aug', 67.2, 30.05, 0, 0],   ['Sep', 54.47, 48.12, 0, 0],  ['Oct', 36.29, 77.34, 9.68, 0],   ['Nov', 70.79, 69.98, 12.52, 0],  ['Dec', 58.3, 33.16, 0, 0],
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

	data.addRows([
	['Jan', 0, 2470, 0, 0],    ['Feb', 0, 3235, 107, 0],   ['Mar', 0, 2643, 191, 0],  ['Apr', 0, 2472, 164, 0],   ['May', 1579, 110, 0, 0],  ['Jun', 1847, 1564, 0, 0],
	['Jul', 2141, 329, 0, 0],    ['Aug', 2502, 1764, 0, 0],   ['Sep', 1766, 2191, 0, 0],  ['Oct', 1405, 1948, 614, 0],   ['Nov', 3161, 3426, 998, 0],  ['Dec', 2172, 1959, 0, 0],
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
	  ['Hiking',     17],
	  ['Running',     0],
	  ['Outside Rock Climbing',  7],
	  ['Gym Climbing', 26],
	  ['Skiing',    12]
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
	  ['5-', 30],
	  ['5.4', 33],
	  ['5.5', 40],
	  ['5.6', 107],
	  ['5.7', 98],
	  ['5.8', 67],
	  ['5.9', 38],
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
	  backgroundColor: '#CFECEC'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorDiffPieTotal'));
	chart.draw(data, options);
}

//Pie chart to depict difficulty of outdoor climbs for current year
function drawOutdoorDiffCurrent() {
	var data = google.visualization.arrayToDataTable([
	  ['Rating', 'Number of Pitches'],
	  ['5-', 3],
	  ['5.4', 2],
	  ['5.5', 2],
	  ['5.6', 16],
	  ['5.7', 3],
	  ['5.8', 3],
	  ['5.9', 4],
	  ['5.10a', 1],
	  ['5.10b', 0],
	  ['5.10c', 0],
	  ['5.10d', 0],
	  ['5.11a', 0]
	]);

	var options = {
	  title: 'Difficulty of Outdoor Climbing Pitches in 2015',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: '#CFECEC'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorDiffPieCurrent'));
	chart.draw(data, options);
}

//Pie chart to depict location of outdoor climbs for all years
function drawOutdoorLocTotal() {
	var data = google.visualization.arrayToDataTable([
	  ['Rating', 'Number of Routes'],
	  ['Exit 38', 16],
	  ['Index', 5],
	  ['Leavenworth', 107],
	  ['Mazama', 13],
	  ['Tieton', 13],
	  ['Vantage', 54],
	  ['North Cascades', 7],
	  ['Central Cascades', 4],
	  ['South Cascades', 4],
	  ['Mt Erie', 5],
	  ['Smith', 16],
	  ['Squamish', 68],
	  ['Out of State', 44]
	]);

	var options = {
	  title: 'Location of All Outdoor Climbing Routes',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: '#CFECEC'
	};

	var chart = new google.visualization.PieChart(document.getElementById('outdoorLocPieTotal'));
	chart.draw(data, options);
}

//Pie chart to depict location of outdoor climbs for current year
function drawOutdoorLocCurrent() {
	var data = google.visualization.arrayToDataTable([
	  ['Rating', 'Number of Routes'],
	  ['Exit 38', 0],
	  ['Index', 0],
	  ['Leavenworth', 14],
	  ['Mazama', 0],
	  ['Tieton', 0],
	  ['Vantage', 0],
	  ['North Cascades', 1],
	  ['Central Cascades', 1],
	  ['South Cascades', 0],
	  ['Mt Erie', 0],
	  ['Smith', 0],
	  ['Squamish', 0],
	  ['Out of State', 12]
	]);

	var options = {
	  title: 'Location of Outdoor Climbing Routes in 2015',
	  titleTextStyle: {
		color: '#000000',
		fontSize: 14,
		fontName: 'Arial',
		bold: true
	},
	  pieHole: 0.3,
	  width: 375,
	  height: 200,
	  backgroundColor: '#CFECEC'
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

	data.addRows([
	['Jan', 0, 198300],    ['Feb', 0, 215989],   ['Mar', 0, 257487],  ['Apr', 0, 199932],   ['May', 0, 212319],  ['Jun', 0, 346706],
	['Jul', 0, 300509],    ['Aug', 303340, 243670],   ['Sep', 288083, 286882],  ['Oct', 245026, 164057],   ['Nov', 255106, 110484],  ['Dec', 212604, 158217],
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
		chartArea: {left:50, width: 600},
		colors: ['#800000', '#008000']
	};

	var chart = new google.visualization.LineChart(document.getElementById('monthlySteps'));
	chart.draw(data, options);
}
