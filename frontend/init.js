
document.addEventListener("DOMContentLoaded", init)
// google.maps.getElementById('search-form').addEventListener('submit', handleTextInput)

function init() {
  Adapter.readUsers().then(renderUsers)
}

function userTemplate(user) {
  return `<p>${user.attributes.username}</p>`
}

function renderUsers(users) {
  // debugger
  const template = users.data.map(userTemplate).join('')
  renderUser(template)
}

function renderUser(template) {
  document.querySelector('#user-list').innerHTML += template
}

// let map;
// function initMap(lat=40.7336, long=-74.0027) {
//   map = new google.maps.Map(document.getElementById('map-container-6'), {
//     center: {lat: lat, lng: long},
//     zoom: 17
//   });
//
// }


function initAutocomplete(lat=40.7336, long=-74.0027) {
  let map = new google.maps.Map(document.getElementById('map-container-6'), {
    center: {lat: lat, lng: long},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.

  //IMPORTANT--ORIGINAL
  // searchBox.addListener('places_changed', function() {
  //   var places = searchBox.getPlaces();
  //
  //   if (places.length == 0) {
  //     return;
  //   }


  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();

    let textInput = document.querySelector('#pac-input').value
    let searchParent = document.querySelector('#test-list')
    let searchResults = document.querySelector('#get-text')

    if (places.length == 0) {
      return;
    } else {

      searchResults.innerHTML += `${places.map(place => `<li>${place.name} | ${place.formatted_address}</li>`).join('')}`
    }
    let markers = [];

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    // markers = [];

    // For each place, get the icon, name and location.
    let bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      let icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      let marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      })

      let contentTemplate = `<h5>${place.name}</h5>
                              <p class="small">${place.formatted_address}</p>
                              <p>Rating: ${place.rating}</p>
                              ${place.types.map(type => `<p>${type}</p>`).join('')}
                            `

      let infowindowSearch;
      infowindowSearch = new google.maps.InfoWindow({content: contentTemplate});
      marker.addListener('click', function(e){
        // e.va.stopPropagation()
        infowindowSearch.open(map, marker)
      })
      // markers.push(marker);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}