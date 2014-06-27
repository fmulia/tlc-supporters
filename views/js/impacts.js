// Generate impact of a donation.

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

var donationAmt = '';
var returnUrl = '';
var cancelUrl = window.location;
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
			result[count] = {desc:pickedImpacts[i].desc, num:pickedImpacts[i].impact_instances, url:pickedImpacts[i].url};
			++count;
		}
	}
	return result;
}

var postcard = '';
var money = '';
function init(){
	if(getCookie("postcard") != ""){
		postcard = JSON.parse(getCookie("postcard"));
		money = getCookie("money");
		setCookie("postcard", "", 1);
		setCookie("money", "", 1);
		main(3);
	}
	else if(urlParams['state'] != null){
		main(parseInt(urlParams['state']));
	}
	else{
		main(1);
	}
}

function main(state){
	if(state == 1){
		//branch: track amount
		document.getElementById("donation").className = "display";
		document.getElementById("showImpact").className = "nodisplay";
		document.getElementById("shareImpact").className = "nodisplay";
	}
	else if(state == 2){
		//branch: display postcard and donate links
		money = parseInt(document.getElementById("amount").value);
		if(isNaN(money)){
			alert("Please enter a valid value");
			return;
		}
		if(money < 10){
			alert("Please enter an amount higher than $10");
			return;
		}
		var siteStr = "sandbox";
		var emailAddr = "fmulia-us-donate@paypal.com";
		var donationMsg = "Donation+for+This+Life+Cambodia"
		document.getElementById("donationAmount").innerHTML = money;
		document.getElementById("donationURL").href = "https://" + siteStr + 
			".paypal.com/cgi-bin/webscr?cmd=_donations&no_shipping=0&no_note=1&submit=Donate&business=" + emailAddr + 
			"&item_name=" + donationMsg + "&amount=" + money + "&currency_code=USD&return=" + encodeURIComponent(window.location)  + "&cancel=" + encodeURIComponent(window.location);
		document.getElementById("donation").className = "nodisplay"
		document.getElementById("showImpact").className = "display"
		document.getElementById("shareImpact").className = "nodisplay"
		
		postcard = getImpacts(money);
		displayPostcard(postcard, 1);
	}
	else if(state == 3){
		//branch: redirect back from paypal and display the link
		if(postcard == ''){
			postcard = buildPostcardContentFromQueryString();
		}
		document.getElementById("donationAmount-1").innerHTML = money;
		document.getElementById("donation").className = "nodisplay";
		document.getElementById("showImpact").className = "nodisplay";
		document.getElementById("shareImpact").className = "display";
		displayPostcard(postcard, 2);
		var shareLink = "http://www.thislifecambodia.org/donations" + buildQueryString(postcard);
		console.log(shareLink);
		//grab document element and pass the url to it
		document.getElementById("share").href = "http://www.facebook.com/sharer/sharer.php?u=" + shareLink;
		document.getElementById("share").target = "_blank";
	}
}

function displayPostcard(contents, mode){
	//TODO: display the postcard
	if(mode == 1){
		var disp_pre = "impact-";
		var disp_val = "impactval-";
	}
	else{
		var disp_pre = "impact3-";
		var disp_val = "impact3val-";
	}
	for (var i = contents.length - 1; i >= 0; i--) {
		document.getElementById(disp_pre + contents[i].desc).className = "shareimpacts display shareimpact-" + contents[i].desc;
		document.getElementById(disp_val + contents[i].desc).innerHTML = contents[i].num;
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
	var string = '?state=3&card=';
	for (var i = contents.length - 1; i >= 0; i--) {
		string += contents[i].desc + ':' + contents[i].num + ';'; 
	};
	return string;
}
function startCookie(){
	setCookie("postcard", JSON.stringify(postcard), 1);
	setCookie("money", '' + money)
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

window.onload = setTimeout(init, 1000);
