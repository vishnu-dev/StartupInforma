document.addEventListener('DOMContentLoaded',function(){
chrome.tabs.query( {
    active: true,
    lastFocusedWindow: true
},
function(array_of_Tabs) {
    var tab = array_of_Tabs[0];
    chrome.tabs.executeScript(tab.id, 
    	{
    		code: "chrome.storage.sync.set({'info':{'logo':document.getElementsByClassName('company-logo')[0].innerHTML,'name':document.getElementsByClassName('js-startup_name')[0].innerHTML,'concept':document.getElementsByClassName('js-startup_high_concept')[0].innerHTML,'location':document.getElementsByClassName('js-location_tags')[0].innerHTML,'link':document.getElementsByClassName('u-uncoloredLink company_url')[0].innerHTML}});"});
});
chrome.storage.sync.get('info',function(data){
	var v = document.getElementById('logo');
	v.innerHTML=data.info.logo;
	document.getElementById('name').innerHTML=data.info.name;
	document.getElementById('concept').innerHTML=data.info.concept;
	document.getElementById('location').innerHTML=data.info.location;
	document.getElementById('link').innerHTML=data.info.link;
});	
chrome.runtime.onMessage.addListener(function(request) {
  document.getElementsByTagName('html')[0].innerHTML = request;
});

});