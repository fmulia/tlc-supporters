// Generate impact of a donation.
// Shipeng Xu
// shipxu@paypal.com

function getImpacts(money)
{
	var impactData = [{desc:'a', value:1.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'b', value:2.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'c', value:3.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'d', value:4.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'e', value:5.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'f', value:6.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'g', value:7.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'h', value:8.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'i', value:9.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'j', value:10.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'k', value:11.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'l', value:12.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'m', value:13.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'n', value:14.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'o', value:15.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'p', value:16.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'q', value:17.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'r', value:18.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'s', value:19.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'t', value:20.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'u', value:21.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'v', value:22.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'},
					  {desc:'w', value:23.0, url:'https://www.google.com.sg/images/srpr/logo11w.png'}];
	var impactsNum = 0;
	
	if(money <10){}
	else if(money<=49)  impactsNum = 4;
	else if(money<=99)  impactsNum = 6;
	else if(money<=499) impactsNum = 8;
	else impactsNum = 10;

	// Generating the random impacts
	var pickedImpacts = new Array();
	var pickedImpactsId = new Array();
	for(int i = 0; i < impactsNum; ++i)
	{
		var idPicked;
		do{
			idPicked = Math.floor((Math.random() * impactsNum);
		}while(typeof pickedImpactsId[idPicked] != 'undefined')

		pickedImpactsId[idPicked] = 1;
		pickedImpacts[i] = impactData[idPicked];
	}

	// sorting desc
	pickedImpacts.sort(function(a, b) { 
    	return b.value - a.value;
	});

	var perImpact;
	for(var i = 0; i < impactsNum; ++i)
	{
		perImpact[i] = money / impactsNum;
	}

	for(var i = 0; i < impactsNum - 1; ++i)
	{
		var instances = Math.floor(perImpact[i] / pickedImpacts[i].value);
		pickedImpacts[i].instances = instances;
		var leftover = perImpact[i] - pickedImpacts[i].value * instances;
		perImpact[i] = pickedImpacts[i].value * instances;
		perImpact[i+1] = perImpact[i+1] + leftover;
	}

	var result = new Array();
	for(var i = 0; i < impactsNum; ++i)
	{
		result[i] = [{desc:pickedImpacts[i].desc, num:pickedImpacts[i].instances, url:pickedImpacts[i].url}];
	}
	return result;
}