

// Getting Location of User
function getLocation() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder = new google.maps.Geocoder;
            var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            //creating these variables to use within the FourSquareAPI
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            
            geocoder.geocode({'latLng': point}, function (locations, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    console.log(locations[0].formatted_address);

                    var currentLocation = locations[0].formatted_address;
                    console.log(currentLocation);
                    $("#current-location").text(currentLocation);

                    $("iframe").attr("src", "https://maps.google.com/maps?q=" + currentLocation + "&t=&z=13&ie=UTF8&iwloc=&output=embed");
                }
            });

            fourSquareCallFunction(lat, lng);
        });
        
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

getLocation();
console.log(getLocation());



// Fitbit API Call
var url = window.location.href;

//getting the access token from url
var access_token = url.split("#")[1].split("=")[1].split("&")[0];

// get the userid
var userId = url.split("#")[1].split("=")[2].split("&")[0];


    $.ajax({
        url: 'https://api.fitbit.com/1/user/'+ userId +'/activities/date/today.json',
        method: "GET",
        headers: {
            "Authorization": "Bearer " + access_token
        }
    }).then(function (response){
        console.log(response);
        console.log("Current steps to goal: " + response.summary.steps);
        console.log("Step Goal: " + response.goals.steps);

        var currentDistance = response.summary.steps;
        console.log(currentDistance);
        var goalDistance = response.goals.steps;
        console.log(goalDistance);
        var remainingDistance = goalDistance - currentDistance;

        console.log("Remaining Distance: " + remainingDistance);
        
        $("#goal").text(remainingDistance + " steps");
    
    }, function(objectError){
        console.log("Error handling: " + objectError.code);
    });


// Foursquare API Call
function fourSquareCallFunction (x, y) {
    
    var CLIENT_ID = "T2VGKUJ5HW3UQD20P3I1ZTKCX5UG3BOBRMHJSSD4QD55FWQE";
    var CLIENT_SECRET = "U5KYZSK5GYBCNKGEMOVWAK0JWTEAKQ512F4YWHJVWA1UB5ES";
    
    var fourURL = "https://api.foursquare.com/v2/venues/explore?&ll=" + x + "," + y + "&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&limit=10&sortByDistance=1&v=20190116";
    
    $.ajax({
        url: fourURL,
        method: "GET"
    })
    .then(function (response){
        explore = response.response.groups[0].items;

        console.log(explore);

        // Looping through the response for location name and address
        for(var i = 0; i < explore.length; i++) {
            
            var name = explore[i].venue.name;
            var distance = explore[i].venue.location.distance; 
            var formattedLocation = explore[i].venue.location;
            var formattedLocationAddress = explore[i].venue.location.address + ", " + explore[i].venue.location.city + ", " + explore[i].venue.location.state + " " + explore[i].venue.location.postalCode;
            console.log(formattedLocation);
            console.log(formattedLocationAddress);  


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
            convertedDistance = distance / 1609.344;
            convertedDistanceFixed = convertedDistance.toFixed(2);

            venueDistance.append(convertedDistanceFixed + " mi");
        
            // This sets venue name on the page and a hyperlink to google maps
            venueName.append('<a class="location-tag" href="https://www.google.com/maps/preview?saddr=' + x + ', ' + y +'&daddr=' + name + '&api=AIzaSyCyP0zeiIILBW9EPXfiYD2VU3E6gm5hPnk&dirflg=w" target="_blank">' + name + "</a>");
        }
    }, function (objectError){
        console.log("Error handling" + objectError.code);
    });
}


