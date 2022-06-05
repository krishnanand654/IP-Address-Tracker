
function cipher(str1)
{
   var hex  = str1.toString();
   var str = '';
   for (var n = 0; n < hex.length; n += 2) {
	   str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
   }
   return str;
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com',
		'X-RapidAPI-Key': cipher('31 31 35 63 36 35 32 39 38 64 6D 73 68 38 66 63 61 31 36 66 31 35 39 34 33 38 30 35 70 31 63 35 37 38 36 6A 73 6E 32 63 36 66 34 38 33 66 66 39 36 65')
	}
};

