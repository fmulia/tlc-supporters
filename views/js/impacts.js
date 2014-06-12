// Generate impact of a donation.

function getImpacts(money)
{
	var impactData = [{desc:'a', value:1.0, url:'https://.png', impact_instances:0},
					  {desc:'b', value:2.0, url:'https://.png', impact_instances:0},
					  {desc:'c', value:3.0, url:'https://.png', impact_instances:0},
					  {desc:'d', value:4.0, url:'https://.png', impact_instances:0},
					  {desc:'e', value:5.0, url:'https://.png', impact_instances:0},
					  {desc:'f', value:6.0, url:'https://.png', impact_instances:0},
					  {desc:'g', value:7.0, url:'https://.png', impact_instances:0},
					  {desc:'h', value:8.0, url:'https://.png', impact_instances:0},
					  {desc:'i', value:9.0, url:'https://.png', impact_instances:0},
					  {desc:'j', value:10.0, url:'https://.png', impact_instances:0},
					  {desc:'k', value:11.0, url:'https://.png', impact_instances:0},
					  {desc:'l', value:12.0, url:'https://.png', impact_instances:0},
					  {desc:'m', value:13.0, url:'https://.png', impact_instances:0},
					  {desc:'n', value:14.0, url:'https://.png', impact_instances:0},
					  {desc:'o', value:15.0, url:'https://.png', impact_instances:0},
					  {desc:'p', value:16.0, url:'https://.png', impact_instances:0},
					  {desc:'q', value:17.0, url:'https://.png', impact_instances:0},
					  {desc:'r', value:18.0, url:'https://.png', impact_instances:0},
					  {desc:'s', value:19.0, url:'https://.png', impact_instances:0},
					  {desc:'t', value:20.0, url:'https://.png', impact_instances:0},
					  {desc:'u', value:21.0, url:'https://.png', impact_instances:0},
					  {desc:'v', value:22.0, url:'https://.png', impact_instances:0},
					  {desc:'w', value:23.0, url:'https://.png', impact_instances:0}];
	var impactsNum = 0;

	console.log(impactData);
	
	if(money <10){}
	else if(money<=49)  impactsNum = 4;
	else if(money<=99)  impactsNum = 6;
	else if(money<=499) impactsNum = 8;
	else impactsNum = 10;

	console.log('Money: '+money+' impactsNum: '+impactsNum);

	// Generating the random impacts
	var pickedImpacts = new Array();
	var pickedImpactsId = new Array();
	for(var i = 0; i < impactsNum; ++i)
	{
		var idPicked;
		do{
			idPicked = Math.floor((Math.random() * impactData.length));
		}while(typeof pickedImpactsId[idPicked] != 'undefined')

		console.log('picked: ' + idPicked);

		pickedImpactsId[idPicked] = 1;
		pickedImpacts[i] = JSON.parse(JSON.stringify(impactData[idPicked]));
	}

	console.log(pickedImpacts);
	
	// sorting desc
	pickedImpacts.sort(function(a, b) { 
    	return b.value - a.value;
	});



	var perImpact = new Array();
	for(var i = 0; i < impactsNum; ++i)
	{
		perImpact[i] = money / impactsNum;
	}

	for(var i = 0; i < impactsNum - 1; ++i)
	{
		var impact_instances = Math.floor(perImpact[i] / pickedImpacts[i].value);
		console.log('i:'+i+' impacts:'+impact_instances);
		pickedImpacts[i].impact_instances = impact_instances;
		var leftover = perImpact[i] - pickedImpacts[i].value * impact_instances;
		perImpact[i] = pickedImpacts[i].value * impact_instances;
		perImpact[i+1] = perImpact[i+1] + leftover;
	}

	var result = new Array();
	for(var i = 0; i < impactsNum; ++i)
	{
		var count = 0;
		if(pickedImpacts[i].impact_instances>0)
		{
			result[count] = [{desc:pickedImpacts[i].desc, num:pickedImpacts[i].impact_instances, url:pickedImpacts[i].url}];
			++count;
		}
	}
	return result;
}


//Get all the URL get params
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();


function main(state){
	if(state == 1){
		//branch: track amount
	}
	else if(state == 2){
		//branch: display postcard and donate links
		var money = 10;//get this dynamically later
		var outputs = getImpacts(money);
		displayPostcard("#postcard1", outputs);
	}
	else if(state == 3){
		//branch: redirect back from paypal and display the link
		var postcard = buildPostcardContentFromQueryString();
		displayPostcard("#postcard2", postcard);
	}
}

function displayPostcard(id, contents){
	//TODO: display the postcard
}

function buildPostcardContentFromQueryString(){
	var contents = [];
	var breakdown = urlParams['card'].split(';');
	var item;
	for (var i = breakdown.length - 1; i >= 0; i--) {
		item = breakdown[i].split(':');
		contents.push({item[0]: item[1]});
	};
	return contents;
}