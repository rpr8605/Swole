// Google Maps API (key)
var googleAPIKey = "AIzaSyCyP0zeiIILBW9EPXfiYD2VU3E6gm5hPnk";

// Google Maps API (Geolocation)
var googleGeolocationURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + googleAPIKey +
"&macAddress";

// Google Maps API (Directions)
var destination = "Starbucks";

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
// });

// JSON call Directions
$.ajax({
    url: googleDirectionsURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});

