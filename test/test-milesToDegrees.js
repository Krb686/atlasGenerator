var should 			= require('should');
var milesToDegrees	= require('./milesToDegrees.js').milesToDegrees;



describe('Distance to lat-long', function(){
	it('converts', function(){

		milesToDegrees([0, 0], 69.11, 0).should.eql([1, 0]);
		milesToDegrees([0, 0], 69.11, 90).should.eql([0, 1]);
		milesToDegrees([0, 0], 69.11, 180).should.eql([1, 0]);
		milesToDegrees([0, 0], 69.11, 270).should.eql([0, 1]);
		
		
		
		
	});
});