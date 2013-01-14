module.exports = Truncate;


function Truncate(number, places)
{
	if (number.toString().indexOf('.') != -1)
	{
		var str = number.toString().split('.')[0] + '.' + number.toString().split('.')[1].substring(0, places);
		
		return parseFloat(str);
	}
	else
	{
		return number;
	}
}
