//EXPORTS
exports.milesToDegrees = milesToDegrees;

//IMPORTS
var roundDecimal = require('./roundDecimal.js').roundDecimal;

function milesToDegrees(coords, distMiles, headingDegrees) {
	var currentLat 		= coords[0];
	
	var headingRadians	= headingDegrees * (Math.PI/180.0);
	
	var xComponent	= Math.abs(Math.cos(headingRadians));
	var yComponent	= Math.abs(Math.sin(headingRadians));
	
	var latDistMiles	= xComponent * distMiles;
	var lngDistMiles	= yComponent * distMiles;
	
	latDistMiles	= roundDecimal(latDistMiles, 5);
	lngDistMiles	= roundDecimal(lngDistMiles, 5);
	
	
	
	var latDeg	= latDistMiles / 69.11;
	var lngDeg	= lngDistMiles / (Math.abs(Math.cos(currentLat*(Math.PI/180))) * 69.11);
	
	
	
	return [latDeg, lngDeg];
}