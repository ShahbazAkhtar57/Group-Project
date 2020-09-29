// Initialize and add the map
function initMap() {
    // The location of user input
    var user_input = {lat: 40.7128, lng: -74.0060};
    // The map, centered at user input
    var map = new google.maps.Map(
         document.getElementById('map'), {center: user_input, zoom: 14,  mapId: 'ca4712dfbc46e060'});
    // The marker, positioned at user input
    var marker = new google.maps.Marker({position: user_input, map: map});
  }