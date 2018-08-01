
let addBTN = document.querySelector('#add-trip')
addBTN.addEventListener('click', handleAddTripClick)

let showBTN = document.querySelector('#show-trip')
showBTN.addEventListener('click', handleShowTripClick )

function userTemplate(user) {
  return `<p>${user.attributes.username}</p>`
}

function renderUsers(users) {
  const template = users.data.map(userTemplate).join('')
  renderUser(template)
}

function renderUser(template) {
  document.querySelector('#user-list').innerHTML += template
}

function handleAddTripClick(event) {
  event.preventDefault()
}

function handleShowTripClick(event) {
  event.preventDefault()
}

function suddentripTemplate(suddentrip) {
    return `<center><div id="accordion">
              <div class="card" style="width:75%" data-id="${suddentrip.id}">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" style="font-family:Oswald" data-toggle="collapse" data-target="#collapse${suddentrip.id}" aria-expanded="true" aria-controls="collapseOne">
                      ${suddentrip.attributes.name}
                    </button>
                  </h5>
                </div>
                <div id="collapse${suddentrip.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <h4 style="font-family:Oswald">${suddentrip.attributes.name}</h4>

                      <i><p class="small" style="font-family:Oswald"><b>Date:</b> ${suddentrip.attributes.date}</p></i>
                        <p class="small" style="font-family:Oswald"><b>Location:</b> ${suddentrip.attributes.location}</p>
                        <p class="small" style="font-family:Oswald"><b>Destinations:</b> ${suddentrip.attributes.destinations.map(destination => `<p class="small">${destination.name} | ${destination.address}</p>`).join('')}

                        <p class="small" style="font-family:Oswald"><b>Lat/Long:</b>  ${suddentrip.attributes.latitude} | ${suddentrip.attributes.longitude}</p>
                        <p class="small" style="font-family:Oswald"><b>Rating:</b>  ${suddentrip.attributes.rating}</p>
                        <button type="submit"  style="font-family:Oswald"class="btn-success" id="add-button" style="float: right;">Add to Watchlist</button>
                    </div>
                  </div>
                </div>
              </div></center>`
}
function renderSuddentrips(suddentrips) {
  const template = suddentrips.data.map(suddentripTemplate).join('')
  renderSuddentrip(template)
}

function renderSuddentrip(template) {
  document.querySelector('#suddentrip-list').innerHTML += template
}
