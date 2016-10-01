document.addEventListener('DOMContentLoaded',function(){
var newdata;
chrome.tabs.query( {
    active: true,
    lastFocusedWindow: true
},
function(array_of_Tabs) {
    var tab = array_of_Tabs[0];
    chrome.tabs.executeScript(tab.id, 
    	{
    		code: "chrome.storage.sync.set({'info':{'image':document.getElementsByClassName('company-logo')[0].innerHTML,'title':document.getElementsByClassName('js-startup_name')[0].innerHTML,'description':document.getElementsByClassName('js-startup_high_concept')[0].innerHTML,'location':document.getElementsByClassName('js-location_tags')[0].innerHTML,'url':document.getElementsByClassName('u-uncoloredLink company_url')[0].innerHTML}});"});
});
chrome.storage.sync.get('info',function(data){
	var v = document.getElementById('logo');
	v.innerHTML=data.info.image;
	document.getElementById('name').innerHTML=data.info.title;
	document.getElementById('concept').innerHTML=data.info.description;
	document.getElementById('location').innerHTML=data.info.location;
	document.getElementById('link').innerHTML=data.info.url;
    newdata = data.info;
});	
chrome.runtime.onMessage.addListener(function(request) {
  document.getElementsByTagName('html')[0].innerHTML = request;
});
/*--------------jquery POST----------------*/
var button = document.getElementById('post')

button.addEventListener('click',function(){
    //console.log("inside jquery");
    $.post("https://beta.crowdproduct.com/api/product",{
        image:newdata.image,
        title:newdata.title,
        description:newdata.description,
        location:newdata.location,
        url:newdata.url
    }, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
   });
/*--------------jquery POST----------------*/
});
