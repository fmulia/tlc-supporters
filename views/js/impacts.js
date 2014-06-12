// Generate impact of a donation.

function getImpacts(money)
{
	var impactData = [{desc:'a', value:13.88, url:'images/icons-impacts/icon-big-ideas.jpg', impact_instances:0},
					  {desc:'b', value:1.39, url:'images/icons-impacts/icon-bikes.jpg', impact_instances:0},
					  {desc:'c', value:0.5, url:'images/icons-impacts/icon-books.jpg', impact_instances:0},
					  {desc:'d', value:1.25, url:'images/icons-impacts/icon-citizens-rights.jpg', impact_instances:0},
					  //{desc:'e', value:0.5, url:'images/icons-impacts/icon-communities-priorities.jpg', impact_instances:0},
					  {desc:'f', value:1.04, url:'images/icons-impacts/icon-community-campaigns.jpg', impact_instances:0},
					  {desc:'g', value:0.28, url:'images/icons-impacts/icon-community-consultations.jpg', impact_instances:0},
					  //{desc:'h', value:0.8, url:'images/icons-impacts/icon-crcp.jpg', impact_instances:0},
					  {desc:'i', value:22.50, url:'images/icons-impacts/icon-families.jpg', impact_instances:0},
					  {desc:'j', value:16.67, url:'images/icons-impacts/icon-futures.jpg', impact_instances:0},
					  {desc:'k', value:4.17, url:'images/icons-impacts/icon-health-care.jpg', impact_instances:0},
					  {desc:'l', value:25.00, url:'images/icons-impacts/icon-scholarship.jpg', impact_instances:0},
					  //{desc:'m', value:0.13, url:'images/icons-impacts/icon-school-community.jpg', impact_instances:0},
					  {desc:'n', value:1.9, url:'images/icons-impacts/icon-school-support.jpg', impact_instances:0},
					  {desc:'o', value:12.5, url:'images/icons-impacts/icon-self-sustaining.jpg', impact_instances:0},
					  {desc:'p', value:0.69, url:'images/icons-impacts/icon-solar-lamp.jpg', impact_instances:0},
					  {desc:'q', value:3.60, url:'images/icons-impacts/icon-teachers.jpg', impact_instances:0},
					  {desc:'r', value:0.66, url:'images/icons-impacts/icon-tool-kits.jpg', impact_instances:0}];
	var impactsNum = 0;
	
	if(money <10){}
	else if(money<=49)  impactsNum = 4;
	else if(money<=99)  impactsNum = 6;
	else if(money<=499) impactsNum = 8;
	else impactsNum = 10;

	// Generating the random impacts
	var pickedImpacts = new Array();
	var pickedImpactsId = new Array();
	for(var i = 0; i < impactsNum; ++i)
	{
		var idPicked;
		do{
			idPicked = Math.floor((Math.random() * impactData.length));
		}while(typeof pickedImpactsId[idPicked] != 'undefined')

		pickedImpactsId[idPicked] = 1;
		pickedImpacts[i] = JSON.parse(JSON.stringify(impactData[idPicked]));
	}


	// sorting desc
	pickedImpacts.sort(function(a, b) { 
    	return b.value - a.value;
	});

	

	var perImpact = new Array();
	for(var i = 0; i < impactsNum; ++i)
	{
		perImpact[i] = money / impactsNum;
	}

	for(var i = 0; i < impactsNum; ++i)
	{
		var impact_instances = Math.floor(perImpact[i] / pickedImpacts[i].value);
		pickedImpacts[i].impact_instances = impact_instances;
		var leftover = perImpact[i] - pickedImpacts[i].value * impact_instances;
		if(i+1 < impactsNum)
			perImpact[i+1] = perImpact[i+1] + leftover;		
	}

	var result = new Array();
	var count = 0;
	for(var i = 0; i < impactsNum; ++i)
	{
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
		contents.push({ 'id': item[0], 'amt':item[1]});
	};
	return contents;
}