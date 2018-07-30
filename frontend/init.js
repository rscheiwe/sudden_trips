

document.addEventListener("DOMContentLoaded", init)

function init() {

}

let map;
function initMap(lat=40.7336, long=-74.0027) {
  map = new google.maps.Map(document.getElementById('map-container-6'), {
    center: {lat: lat, lng: long},
    zoom: 17
  });

}
