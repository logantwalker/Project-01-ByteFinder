// Declaring variables 
var minLat;
var maxLat;
var minLon;
var maxLon;

const apiKey = "pk.eyJ1IjoiYXNtYTE3IiwiYSI6ImNrZDNteHVoMjEyOWoyd252azVmMWxpODEifQ.erDAisasRWCXLTYIC4ojyg";

// Reporting if API call throws error
const onReject = (errThrown) => {
  console.log(errThrown);
  console.log(errThrown.responseText);
};

// Returns the latitude and longitude of the user's position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((showPosition) => {
    var longitude = showPosition.coords.longitude;
    console.log(longitude);
    var latitude = showPosition.coords.latitude;
    console.log(latitude);

    minLat = latitude - .1;
    maxLat = latitude + .1;
    minLon = longitude - .1;
    maxLon = longitude + .1;

    console.log(showPosition);
                                                
    $.ajax({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/supermarket%20groceries%20grocery%20market%20super.json?bbox=${minLon},${minLat},${maxLon},${maxLat}&limit=5&access_token=${apiKey}`,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      // Loop through the response and create some elements
      for (var i = 0; i < response.features.length; i++) {
          var currentLocation = response.features[i];
          var link = "https://www.google.com/maps/dir//" + response.features[i].place_name.split(' ').join('+');
          console.log(currentLocation);
          console.log(link);

          // Appending store names and store addresses 
          $('#stores').append(`<p>${response.features[i].place_name}</p>`);
      }
    });
    return showPosition;
  });
}