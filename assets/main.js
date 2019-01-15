$(document).ready(function () {



// Google Maps API (key)
var googleAPIKey = "AIzaSyCyP0zeiIILBW9EPXfiYD2VU3E6gm5hPnk";

// Google Maps API (Geolocation)
var googleGeolocationURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + googleAPIKey +
"&macAddress";

// // Google Maps API (Directions)
// var destination = "Starbucks";

var googleDirectionsURL = "https://maps.googleapis.com/maps/api/directions/json?" +
"origin=Blue Springs, MO" + 
"&destination=Starbucks Blue Springs, MO" + 
"&avoid=highways" +
"&mode=walking" +
"&key=" + googleAPIKey;

// JSON Call Geolocation
// $.ajax({
//     url: googleGeolocationURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);
// // });

// // JSON call Directions
$.ajax({
    url: googleDirectionsURL,
    method: "GET",
    dataType: 'jsonp'
}).then(function(response) {
    console.log(response);
    var distance = response.routes[0].legs[0].distance.text;
    var duration = response.routes[0].legs[0].duration.text;
    console.log("Distance: " + distance);
    console.log("Duration: " + duration);

}).catch(function(error) {
    error.then(console.log);
});

var url = window.location.href;
//getting the access token from url
var access_token = url.split("#")[1].split("=")[1].split("&")[0];

// get the userid
var userId = url.split("#")[1].split("=")[2].split("&")[0];

console.log(access_token);
console.log(userId);


$.ajax({
    url: 'https://api.fitbit.com/1/user/'+ userId +'/activities/steps/date/today/1d.json',
    method: "GET",
    headers: {
        "Authorization": "Bearer " + access_token
    }
}).then(function (response){
    console.log(response);

}, function(objectError){
    console.log("Error handling: " + objectError.code);
});

});