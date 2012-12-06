var should = require('should');

function convert() {
}

describe('Distance to lat-long', function(){
	it('converts', function(){
		convert(38.53, 77.17, 5, 500).should.equal([38.6, 77.4]);
		
		
		
	});
});