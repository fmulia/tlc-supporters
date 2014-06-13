// Generate impact of a donation.
				  
function getImpacts(money)
{
	var impactData = [{desc:'1', value:13.88, url:'images/icons-impacts/icon-big-ideas.jpg', impact_instances:0},
				  {desc:'2', value:1.39, url:'images/icons-impacts/icon-bikes.jpg', impact_instances:0},
				  {desc:'3', value:0.5, url:'images/icons-impacts/icon-books.jpg', impact_instances:0},
				  {desc:'4', value:1.25, url:'images/icons-impacts/icon-citizens-rights.jpg', impact_instances:0},
				  //{desc:'5', value:0.5, url:'images/icons-impacts/icon-communities-priorities.jpg', impact_instances:0},
				  {desc:'6', value:1.04, url:'images/icons-impacts/icon-community-campaigns.jpg', impact_instances:0},
				  {desc:'7', value:0.28, url:'images/icons-impacts/icon-community-consultations.jpg', impact_instances:0},
				  //{desc:'8', value:0.8, url:'images/icons-impacts/icon-crcp.jpg', impact_instances:0},
				  {desc:'9', value:22.50, url:'images/icons-impacts/icon-families.jpg', impact_instances:0},
				  {desc:'10', value:16.67, url:'images/icons-impacts/icon-futures.jpg', impact_instances:0},
				  {desc:'11', value:4.17, url:'images/icons-impacts/icon-health-care.jpg', impact_instances:0},
				  {desc:'12', value:25.00, url:'images/icons-impacts/icon-scholarship.jpg', impact_instances:0},
				  //{desc:'13', value:0.13, url:'images/icons-impacts/icon-school-community.jpg', impact_instances:0},
				  {desc:'14', value:1.9, url:'images/icons-impacts/icon-school-support.jpg', impact_instances:0},
				  {desc:'15', value:12.5, url:'images/icons-impacts/icon-self-sustaining.jpg', impact_instances:0},
				  {desc:'16', value:0.69, url:'images/icons-impacts/icon-solar-lamp.jpg', impact_instances:0},
				  {desc:'17', value:3.60, url:'images/icons-impacts/icon-teachers.jpg', impact_instances:0},
				  {desc:'18', value:0.66, url:'images/icons-impacts/icon-tool-kits.jpg', impact_instances:0}];
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
		document.getElementById("donation").className = "display";
		document.getElementById("showImpact").className = "nodisplay"
	}
	else if(state == 2){
		var money = parseInt(document.getElementById("amount").value);
		if(isNaN(money)){
			alert("Please enter a valid value");
			return;
		}
		document.getElementById("donation").className = "nodisplay"
		document.getElementById("showImpact").className = "display"
		//branch: display postcard and donate links
		var outputs = getImpacts(money);
		displayPostcard(outputs);
	}
	else if(state == 3){
		//branch: redirect back from paypal and display the link
		var postcard = buildPostcardContentFromQueryString();
		displayPostcard(postcard);
	}
}

function displayPostcard(contents){
	//TODO: display the postcard
	for (var i = contents.length - 1; i >= 0; i--) {
		document.getElementById("impact-" + contents[i].desc).className = "impacts display"
	};
}

function buildPostcardContentFromQueryString(){
	var contents = [];
	var breakdown = urlParams['card'].split(';');
	var item;
	for (var i = breakdown.length - 1; i >= 0; i--) {
		item = breakdown[i].split(':');
		contents.push({ desc: item[0], num:parseInt(item[1])});
	};
	return contents;
}

function buildQueryString(contents){
	var string = 'card=';
	for (var i = contents.length - 1; i >= 0; i--) {
		string += contents[i].desc + ':' + contents[i].num + ';'; 
	};
	return string;
}