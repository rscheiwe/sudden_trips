
document.addEventListener("DOMContentLoaded", init)
document.querySelector("#add-trip-button").addEventListener('click', () => {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
  document.addEventListener("click", handleTripClick)
})
// document.querySelector("#accordion").addEventListener("click", () => {
//   document.querySelector("#expand").addEventListener("click", () => {
//   })
// })


function init() {
  UserAdapter.readUsers().then()
  SuddentripAdapter.readSuddentrips().then(renderSuddentrips)
  .then(document.addEventListener("click", handleTripEdit))
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

  let searchPlaces = []

  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();

    let textInput = document.querySelector('#pac-input').value
    let searchParent = document.querySelector('#test-list')
    let searchResults = document.querySelector('#search-list')
    if (places.length == 0) {
      return;
    } else {
      SuddentripAdapter.readSuddentrips().then(json => {


        searchResults.innerHTML += `${places.map(place => {
          // debugger
        return `
            <p style="font-family: Oswald;" class="search${place.id}">${place.name} | ${place.formatted_address}</p> 
            <div class="input-field col s12">
              <select multiple id="my-select">
                ${json.data.map(trip => {
                  return `<option class="${trip.attributes.name}" data-id="${trip.id}">${trip.id}. ${trip.attributes.name}</option>`
                }).join('')}
              </select>
              <br>
              <label>Add to Trip</label>
          </div>`
        }).join('')}`
      }).then(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }).then(() => {
        document.addEventListener('click', (e) => {
          // debugger
          if (e.target.className === 'select-dropdown dropdown-trigger') {
            e.preventDefault()
            let destination = e.target.parentElement.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.textContent
            var mutationObserver = new MutationObserver(function(mutations) {

              mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {

                  let id = mutation.target.textContent.split('. ')[0]
                  SuddentripAdapter.updateSuddentripDestinations(destination, id).then(suddentripTemplate).then(renderSuddentrip)
                };
              });
            });
            mutationObserver.observe(document.documentElement, {
              attributes: true,
              characterData: true,
              childList: true,
              subtree: true,
              attributeOldValue: true,
              characterDataOldValue: true
            });

              // let destination = e.target.parentElement.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.textContent
              let someVar = document.getElementById("my-select").M_FormSelect.input.value;
              let arrOfTrips = someVar.split(",")

              // let chosenOptions = document.getElementById("my-select").M_FormSelect.input.parentElement.lastElementChild.selectedOptions;
              let chosenOptions = document.getElementById("my-select").M_FormSelect.input.parentElement.lastElementChild.selectedOptions;
              console.log(destination)
            }
          })
            // console.log(chosenOptions[0].value)
            // let testarr = [].slice.call(chosenOptions);
            // let choices = document.getElementById("my-select").M_FormSelect.input.value
            // console.log(chosenOptions)
            // testarr.map(option => {
            //   SuddentripAdapter.updateSuddentripDestinations(destination, option.value)
            // })

        //     document.addEventListener('click', (e) => {
        //       if (e.target.className === 'submit-new-destinations') {
        //         debugger
        //   }
        // })

    })


  }
  // ${json.data.map(el => `<option value=${el.id}>${el.attributes.name}</option>`)}

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

      let contentTemplate = `
                          <div data-id="Place${place.id}">
                              <h5>${place.name}</h5>
                              <p class="small">${place.formatted_address}</p>
                              <p>Rating: ${place.rating}</p>
                              <p><button class="btn-info">Add to Destination</button></p>
                            </div>
                            `

                            // ${place.types.map(type => `<p>${type}</p>`).join('')}

      let infowindowSearch;
      infowindowSearch = new google.maps.InfoWindow({content: contentTemplate});
      marker.addListener('click', function(e){
        // e.va.stopPropagation()
        infowindowSearch.open(map, marker)
        document.querySelector('.btn-info').addEventListener('click', e => {
          e.preventDefault()
          let id  = e.target.parentElement.parentElement.dataset.id

          debugger
        })
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
