var dgram = require('dgram').createSocket('udp4');


var FAIRFAX 	= '38.8528,N,077.3044,W';
var ROANOKE		= '37.2769,N,079.9557,W';




//Destination options
var PORT 		= 5500;
var ADDRESS		= 'localhost';

//Track message options
var nmeaTypeStr 	= '$GPRMC';
var time			= 123519;
var timeStr			= '';
var codeStr			= 'A';
var lat				= 36;
var latStr			= '';
var latHeadingStr	= 'N';
var lng				= 78;
var lngStr			= '';
var lngHeadingStr	= 'W';
var speedStr		= '22.4';

var msgCount = 0;
setInterval(function(){

	var trackObject = createTrackObject();
	//console.log(trackObject[);
	sendTrack(trackObject);
	
	moveObject();
	
	
	if(msgCount == 10){
		clearInterval();
	}

}, 1000);


function createTrackObject(){
	
	updateStrs();
	

	var msgStr 		= nmeaTypeStr + ',' + timeStr + ',' + codeStr + ',' + latStr + ',' + latHeadingStr + ',' + lngStr + ',' + lngHeadingStr + ',' + speedStr;
	console.log(msgStr);
	
	var msgBuffer 	= new Buffer(msgStr);
	var msgOffset	= 0;
	var msgLength	= msgStr.length;
	
	
	var trackObject = {
						'msgBuffer':msgBuffer,
						'msgOffset':msgOffset,
						'msgLength':msgLength
					};
	
	return trackObject;
}

function moveObject(){
	var heading = 090;
	var speed	= 500; 	//
	var units	= 'mph'
	
	var latSpeed	= Math.cos(heading);
	var longSpeed	= Math.sin(heading);
	
	var latComp		= speed / 69.11;
	var longComp	= speed / (69.11 * Math.cos(lng));
	
	
	
	//Add degree amounts
	lat		+= latComp;
	lng 	+= longComp;
	time	+= 1000;
	

	//correctCoords();
}


function updateStrs(){
	timeStr = time.toString();
	
	
	latStr	= lat.toString();
	
	if(latStr.split('.')[0].length < 2){
		latStr = '0' + latStr;
	}
	
	lngStr	= lng.toString();
	
	if(lngStr.split('.')[0].length == 1){
		lngStr = '00' + lngStr;
	}
	else if (lngStr.split('.')[0].length == 2){
		lngStr = '0' + lngStr;
	}


}

/*
function correctCoords(){
	/*
	if(latDeg>=90){
		
	}
	
	if(latDeg<=0{
	
	}
	*/
	
		


}

*/
	
function sendTrack(trackObject){
	
	dgram.send(trackObject['msgBuffer'], trackObject['msgOffset'], trackObject['msgLength'], PORT, ADDRESS);
}





