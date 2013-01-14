//IMPORTS
var roundDecimal 	= require('../lib/roundDecimal.js').roundDecimal;
var truncate		= require('../lib/truncate.js');

//EXPORTS
exports.TrackPointNMEA = TrackPoint;

function TrackPoint(sentence, utcTime, code, loc, speed, heading){


	var locArray 	= loc.split(',');
	
	var lat			= roundDecimal(locArray[0], 4);
	var latDir		= locArray[1];
	var lng			= roundDecimal(locArray[2], 4);
	var lngDir		= locArray[3];
	
	var latArray	= lat.toString().split('.');
	var lngArray	= lng.toString().split('.');
	
	var latDeg		= latArray[0];
	if(latArray.length > 1){
		var latDec	= eval('.' + latArray[1]);
	}
	else{
		var latDec	= 0;
	}
	
	var lngDeg		= lngArray[0];
	if(lngArray.length > 1){
		var lngDec	= eval('.' + lngArray[1]);
	}
	else{
		var lngDec	= 0;
	}
	
	
	var latMin		= latDec * 60;
	
	
	
	
	
	
	
	
	console.log('Latitude Decimal = ' + lat);
	
	console.log('Latitude = ' + latDeg + ',' + latMin);
	
	console.log('\n');
	
	
	var lngMin	=lngDec * 60;
	
	
	
	console.log('Longitude Decimal = ' + lng);
	console.log('Longitude = ' + lngDeg + ',' + lngMin);
	console.log('\n');
	
	
	
	
	
	
	
	
	
	//Construct lat str
	var latStr		= latDeg.toString();
	
	if(latStr.length == 1){
		latStr = '0' + latStr;
	}
	
	latStr+=latMin;
	
	
	
	var lngStr		= lngDeg.toString();
	
	if(lngStr.length == 1){
		lngStr = '00' + lngStr;
	}
	
	else if(lngStr.length == 2){
		lngStr = '0' + lngStr;
	}
	
	lngStr+=lngMin;
	
	
	
	
	
	
				
	
	
	
	var str = 				sentence 	+ ',' +
						 	utcTime 	+ ',' +
						 	code		+ ',' +
						 	latStr		+ ',' +
						 	latDir		+ ',' +
						 	lngStr		+ ',' +
						 	lngDir 		+ ',' +
						 	speed		+ ',' +
						 	heading		+ '\n';
						 	
	console.log(str);
	console.log('=================');
						 	
	
						
	this.buffer 	= new Buffer(str);
	this.length		= this.buffer.length;
	this.offset		= 0;
}