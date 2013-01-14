exports.TrackController = TrackController;

//IMPORTS
var dgram 			= require('dgram');
var milesToDegrees	= require('./milesToDegrees.js').milesToDegrees;
var roundDecimal 	= require('./roundDecimal.js').roundDecimal;
var TrackPointNMEA	= require('./trackPointNMEA.js').TrackPointNMEA;



//TRACK CONTROLLER OBJECT
function TrackController(){
	this.dgramSocket		= dgram.createSocket('udp4');
	this.updateTime			= 1000;	//Simulation update time in milliseconds This should be 1000 by default and represents
									//realtime updating since Atlas updates at once/sec
	
	
	this.utcHr		=	12;
	this.utcMin		=	35;
	this.utcSec		= 	30;
	
	this.lat		= 	37.5;
	this.latDir		=	'N';
	this.lng		= 	78.0;
	this.lngDir		=	'W';
	
	this.kph		=	50;
	this.mph		= 	this.kph * 1.15078;
	this.accel		= 	10;
	
	this.heading	=	275.5;
	

	this.TrackPointNMEA = '';
	
	
	//Internal Simulate Function
	this.simulate = function(){

		//Destination
		var destination = 'localhost' + ':' + '5500';
	
		//Keep track of reference to TrackController object
		var tcRef = this;
		setInterval(function(){
		
			tcRef.update();
			
	
			tcRef.TrackPointNMEA = new TrackPointNMEA(	sentence 	= '$GPRMC',
													utcTime		= tcRef.utcHr.toString() + tcRef.utcMin.toString() + tcRef.utcSec.toString(),
													code		= 'A',
													loc			= tcRef.lat.toString() + ',' + tcRef.latDir.toString() + ',' + tcRef.lng.toString() + ',' + tcRef.lngDir.toString(),
													speed		= tcRef.kph.toString(),
													heading		= tcRef.heading.toString()
												);
												
			tcRef.sendTrackTo(destination);
		
		//Time interval to send tracks to Atlas
		//Atlas updates once per second.  Any more tracks than this per second get accumulated together, 
		//and joined into however many points were crossed in that 1 sec interval.  Much less accurate
		}, tcRef.updateTime);

	};
	
	
	
	//Internal Update Function
	this.update = function(){
	
		//Update time
		this.utcSec+=this.updateTime/1000;
		console.log(this.utcSec);
	
	
		//Check seconds
		if(this.utcSec >= 60){
			this.utcSec-=60;
			this.utcMin++;
		
		}
	
		//Check minutes
		if(this.utcMin >= 60){
			this.utcMin-=60;
			this.utcHr++;
		}
	
		//Check hours
		if(this.utcHr >= 13){
			this.utcHr-=12;
		}
		
		//Update heading
		this.heading+=1;
		
		//Update speed
		this.kph+=this.accel;
		this.mph		= this.kph * 1.15078;
		
		this.accel+=.001;
		
		if(this.heading >= 360){
			this.heading-=360;
		}
	
		
		var miles	= this.mph / 3600;
		
	
		var degrees = milesToDegrees([this.lat,this.lng], miles, this.heading);
		var latChange = degrees[0];
		var lngChange = degrees[1];
		
		
		// 0 <--> 90 is quadrant 1
		if(this.heading >=0 && this.heading <90){
			if(this.latDir == 'N'){
				this.lat+=latChange;
			}
			else if(this.latDir =='S'){
				this.lat-=latChange;
			}
			
			if(this.lngDir == 'E'){
				this.lng+=lngChange;
			}
			else if(this.lngDir == 'W'){
				this.lng-=lngChange;
			}
		}
		else if(this.heading >=90 && this.heading <180){
			if(this.latDir == 'N'){
				this.lat-=latChange;
			}
			else if(this.latDir =='S'){
				this.lat+=latChange;
			}
			
			if(this.lngDir == 'E'){
				this.lng+=lngChange;
			}
			else if(this.lngDir == 'W'){
				this.lng-=lngChange;
			}
		}
		else if (this.heading >= 180 && this.heading < 270){
			if(this.latDir == 'N'){
				this.lat-=latChange;
			}
			else if(this.latDir =='S'){
				this.lat+=latChange;
			}
			
			if(this.lngDir == 'E'){
				this.lng-=lngChange;
			}
			else if(this.lngDir == 'W'){
				this.lng+=lngChange;
			}
		}
		
		else if(this.heading >=270 && this.heading <360){
			if(this.latDir == 'N'){
				this.lat+=latChange;
			}
			else if(this.latDir =='S'){
				this.lat-=latChange;
			}
			
			if(this.lngDir == 'E'){
				this.lng-=lngChange;
			}
			else if(this.lngDir == 'W'){
				this.lng+=lngChange;
			}
		}
		
	};	
}

//SEND TRACK TO LOCATION
//===================================================
TrackController.prototype.sendTrackTo = function(destination){
	var host 	= destination.split(':')[0];
	var port	= destination.split(':')[1];
	
	var buffer	= this.TrackPointNMEA['buffer'];
	var offset	= this.TrackPointNMEA['offset'];
	var length	= this.TrackPointNMEA['length'];
	

	this.dgramSocket.send(buffer, offset, length, port, host);
};

TrackController.prototype.update = function(){
	this.utcSec+=1;
	
	console.log(this.utcSec);
	
	//Check seconds
	if(this.utcSec >= 60){
		this.utcSec-=60;
		this.utcMin++;
		
	}
	
	//Check minutes
	if(this.utcMin >= 60){
		this.utcMin-=60;
		this.utcHr++;
	}
	
	//Check hours
	if(this.utcHr >= 13){
		this.utcHr-=12;
	}
	
	var miles	= this.mph / 3600;
	
	var degrees = milesToDegrees([this.lat,this.lng], miles, this.heading);
	
	this.lat+=degrees[0];
	this.lng+=degrees[1];

};

