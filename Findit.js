
var latitude;
var longitude;
var parkedLatitude;
var parkLongitude;
var storage;

function init(){
  document.addEventListener("deviceReady",onDeviceReady, false);
  storage = window.localStorage;
}


function onDeviceReady(){
 var node = document.createElement('Link');
     node.setAttributes('rel','stylesheet');
     node.setAttributes('type', 'text/css');
       if(cordova.platformID == 'ios'){
         node.setAttributes('href','parkItios.css');
         window.StatusBar.overlaysWebview(false);
         window.StatusBar.styleDefault();
       }else{
         node.setAttributes('href','parkItandroid.css');
         window.Statusbar.backgroundColorByHexString('#1565C0')';
      }
      document.getElementsByTagName('head')[0].append.Child(node);
}

function setCss(){
  var node = document.getElementById(elm).style;
  node.setProperty(prop, val);
}

function setParkingLocation(){
  navigator.geolocation.getCurrentPostion(setParkingLocationSuccess, locationError, {enableHighAccuracy:true});
}

function setParkingLocationSuccess(){
  latitude = postion.coords.latitude;
  longitude = postion.coords.longitude;
  storage.setItem('parkedLatitude',latitude);
  storage.setItem('parkedLongitude',longitude);
  navigator.notification.alert("Parking Location was saved successfully");
  showParkingLocation();
}

function locationError(){
  navigator.notification.alert('ErrorCode: ' + error.code + "\nError Message: " + error.message);
}
function showParkingLocation(){
  setCss('directions','visibility','hidden');
  setCss('instructions','display','none');
  var latLong = new google.maps.LatLng(latitude, longitude);
  var map = new google.maps.Map(document.getElementById('map'));
  map.setZoom(16);
  map.setCenter(latLong);
  var marker = new google.maps.Market({
    postion: latLong,
    map: map
  });
  setCss('map','visibility','visible');
}
function getParkingLoaction(){
navigator.geolocation.getCurrentPostion(setParkingLocationSuccess, locationError, {enableHighAccuracy:true});
}



function getParkingLocationSuccess(){
  latitude = postion.coords.latitude;
  longitude = postion.coords.longitude;
  parkedLatitude = storage.getItem('parkedLatitude');
  parkedLongitude = storage.getItem('parkedLongitude');
  showDirections();
}

function showDirections(){
var drender = new google.maps.directionsRenderer;
var dService = new google.maps.DirectionsService;
var curLatLong = new google.maps.LatLng(latitude,longitude);
var parkedLatLong = new google.mapsLatLng(parkedLatitude,parkedLongitude);
var map = new google.maps.Map(document.getElementById('map'));
map.setZoom(16);
map.setCenter(curLatLong);
dRenderer.SetMap(map);
dService.route({
  origin: curLatLong.
  destination: parkedLatLong,
  travelMode: 'DRIVING'
}, function(response,status){
  if(status == 'OK'){
    dRenderer.setDirections(response);
    document.getElementById('directions').innerHTML = '';
    dRenderer.setPanel(docmunet.getElementById('directions'));
  }else{
    navigator.notification.alert("directions failed due to: " + status);
  }
});

  setCss('map','visibility','visible');
  setCss('directions','visibility','visible');
  setCss('instructions','display','none');
  
}
