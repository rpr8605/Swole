

// Getting Location of User
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    fourSquareCallFunction(lat, long);
    console.log(lat);
    console.log(long);

    $("iframe").attr("src", "https://maps.google.com/maps?q=" + lat + "," + long + "&t=&z=13&ie=UTF8&iwloc=&output=embed");

    $("#current-location").text(GetAddress());

    function GetAddress() {
        lat = parseFloat(lat);
        var lng = parseFloat(long);
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $("#current-location").text(results[1].formatted_address);
                }
            }
        });
    }
}



console.log(navigator.geolocation.getCurrentPosition(showPosition));

// Firebase API hookup
var config = {
    apiKey: "AIzaSyCWcDhPrqucSxP3nlI4hMCjcYOxQMgSxqk",
    authDomain: "my-project-1547081516230.firebaseapp.com",
    databaseURL: "https://my-project-1547081516230.firebaseio.com",
    projectId: "my-project-1547081516230",
    storageBucket: "",
    messagingSenderId: "527893067849"
  };

  firebase.initializeApp(config);


// Fitbit API Call
var url = window.location.href;

//getting the access token from url
var access_token = url.split("#")[1].split("=")[1].split("&")[0];

// get the userid
var userId = url.split("#")[1].split("=")[2].split("&")[0];

console.log(access_token);
console.log(userId);


    $.ajax({
        url: 'https://api.fitbit.com/1/user/'+ userId +'/activities/date/today.json',
        method: "GET",
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }).then(function (response){
        console.log(response);
        console.log("Current steps to goal: " + response.summary.distances[0].distance);
        console.log("Goal to steps in distance: " + response.goals.distance);



        var currentDistance = response.summary.distances[0].distance;
        var goalDistance = response.goals.distance;

        var remainingDistance = goalDistance - currentDistance;

        var convertedRemainingDistance = remainingDistance * 1609.344;

        console.log("Remaining Distance: " + convertedRemainingDistance);
        convertedRemainingDistance = convertedRemainingDistance.toFixed(2);
        $("#goal").text(convertedRemainingDistance + " meters");
    
    }, function(objectError){
        console.log("Error handling: " + objectError.code);
    });

    // Ajax call for goals (might not need it).
    // $.ajax({
    //     url: 'https://api.fitbit.com/1/user/'+ userId +'/activities/goals/daily.json',
    //     method: "GET",
    //     headers: {
    //         "Authorization": "Bearer " + access_token
    //     }
    // }).then(function (response){
    //     console.log(response);
    //     console.log("Step goal for today: " + response.goals.steps);
    //     var goalSteps = response.goal.steps;

    // }, function(objectError){
    //     console.log("Error handling: " + objectError.code);
    // });




// Foursquare API Call
function fourSquareCallFunction (x, y) {
    var CLIENT_ID = "T2VGKUJ5HW3UQD20P3I1ZTKCX5UG3BOBRMHJSSD4QD55FWQE";
    var CLIENT_SECRET = "U5KYZSK5GYBCNKGEMOVWAK0JWTEAKQ512F4YWHJVWA1UB5ES";
    var fourURL = "https://api.foursquare.com/v2/venues/search?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&ll=" + x + "," + y + "&radius=3000&limit=10&v=20190116";
    
    $.ajax({
        url: fourURL,
        method: "GET"
    })
    .then(function (response){
        console.log(response.response.venues);
        venues = response.response.venues;



        for(var i = 0; i < venues.length; i++) {
            console.log(venues[i].name + " " + venues[i].location.distance);

            //Set variables for the table.
            var tableRow = $("<tr>");
            var venueName = $("<td>");
            var venueDistance = $("<td>");

            // Adds a new table row.
            $("#results-to-goal").append(tableRow);

            //This creates TDs to the tbody
            tableRow.append(venueName);
            tableRow.append(venueDistance);

            //This displays the data to the page.
            venueDistance.append(venues[i].location.distance + " meters");
            venueName.append(venues[i].name);
        }
    }).catch(function (objectError){
        console.log("Error handling" + objectError.code);
    });
}


