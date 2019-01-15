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
    method: "GET",
    headers: {
        'Accept': "*/*",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "GET",
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': "authorization"
    },
}).then(function(response) {
    console.log(response);
    var distance = response.routes[0].legs[0].distance.text;
    var duration = response.routes[0].legs[0].duration.text;
    console.log("Distance: " + distance);
    console.log("Duration: " + duration);

}, function(errorObject) {
    console.log("Error handling: " + errorObject.code);
});


// get the url
var url = window.location.href;

//getting the access token from url
var access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkQ5RFMiLCJzdWIiOiI3OEo0QloiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTQ4MTE5NTE3LCJpYXQiOjE1NDc1MTQ3MTd9._BdFGIQgIHqbd0YtlpNAZL40_fTfLLPrTEVTnE4oMAg";

// get the userid
var userId = "78J4BZ";

console.log(access_token);
console.log(userId);


$.ajax({
    url: 'httpss://api.fitbit.com/1/user/'+ userId +'/activities/heart/date/today/1w.json',
    method: "GET",
    headers: {
        "Authorization": "Bearer " + access_token
    }
}).then(function (response){
    console.log(response);

}, function(objectError){
    console.log("Error handling: " + objectError.code);
});

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'httpss://api.fitbit.com/1/user/'+ userId +'/activities/heart/date/today/1w.json');
// xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
// xhr.onload = function() {
//    if (xhr.status === 200) {
//       console.log(xhr.responseText);
//       document.write(xhr.responseText);
//    }
// };
// xhr.send();
