
// let addBTN = document.querySelector('#add-trip')
// addBTN.addEventListener('click', handleAddTripClick)

//
// let showBTN = document.querySelector('#show-trip')
// showBTN.addEventListener('click', handleShowTripClick )

// let submitForm = document.querySelector('.submit-trip')
// submitForm.addEventListener('submit', handleTripClick)

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
                    <button id="expand" class="btn btn-link" style="font-family:Oswald" data-toggle="collapse" data-target="#collapse${suddentrip.id}" aria-expanded="true" aria-controls="collapseOne">
                      ${suddentrip.attributes.name}
                    </button>
                  </h5>
                </div>
                <div id="collapse${suddentrip.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <h4 style="font-family:Oswald" data-id="name${suddentrip.id}">${suddentrip.attributes.name}</h4>

                      <i><p class="small" style="font-family:Oswald"><b>Date:</b> <p data-id="date${suddentrip.id}">${suddentrip.attributes.date}</p></p></i>
                        <p class="small" style="font-family:Oswald"><b>Location:</b> <p data-id="location${suddentrip.id}">${suddentrip.attributes.location}</p></p>
                        <p class="small" style="font-family:Oswald"><b>Destinations:</b> ${suddentrip.attributes.destinations !== null ? suddentrip.attributes.destinations.map(destination => `<p class="small">${destination.name} | ${destination.address}</p>`).join('') : ""}

                        <p class="small" style="font-family:Oswald"><b>Lat/Long:</b>  ${suddentrip.attributes.latitude} | ${suddentrip.attributes.longitude}</p>
                        <p class="small" style="font-family:Oswald"><b>Rating:</b>  ${suddentrip.attributes.rating}</p>
                        <div data-id="buttons${suddentrip.id}"><button type="submit"  style="font-family:Oswald" class="btn-primary" data-id="${suddentrip.id}" style="float: right;">Edit</button></div>
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

function handleTripClick(e) {
  e.preventDefault();
  if (e.target.className === 'submit-trip') {
    let tripName = document.querySelector("#suddentripname").value
    let tripLocation = document.querySelector("#suddentriplocation").value
    let tripDate = document.querySelector("#suddentripdate").value

    SuddentripAdapter.createSuddentrip(tripName, tripLocation, tripDate)
      .then(json => suddentripTemplate(json.data))
      .then(renderSuddentrip)
  }

}

function handleTripEdit(e) {

  if(e.target.className === 'btn-primary'){
    let trip = e.target.dataset.id
    let buttonsField = document.querySelector(`[data-id="buttons${trip}"]`)
    buttonsField.innerHTML =  `<button type="submit"  style="font-family:Oswald" class="btn-primary" data-id="${trip}" style="float: right;">Edit</button>`

    let tripName = document.querySelector(`[data-id="name${trip}"]`)
    let tripLocation = document.querySelector(`[data-id="location${trip}"]`)
    let tripDate = document.querySelector(`[data-id="date${trip}"]`)

    let name = tripName.innerText
    let location = tripLocation.innerText
    let date = tripDate.innerText

    tripName.innerHTML = `<input type="text" class="newName" value="${name}">`
    tripLocation.innerHTML = `<input type="text" class="newLocation" value="${location}">`
    tripDate.innerHTML = `<input type="text" class="newDate"  value="${date}">`

    // buttonsField = document.querySelector(`[data-id="buttons${trip}"]`)
    buttonsField.innerHTML += `    <button type="submit" style="font-family:Oswald" class="btn-success" data-id="${trip}" style="float: right;">Save</button>`
    buttonsField.innerHTML += `    <button type="submit" style="font-family:Oswald" class="btn-danger" data-id="${trip}" style="float: right;">Cancel</button>`

    document.querySelector(".btn-danger").addEventListener('click', () => {
      let buttonsField = document.querySelector(`[data-id="buttons${trip}"]`)
      tripName.innerHTML = `${name}`
      tripLocation.innerHTML = `${location}`
      tripDate.innerHTML = `${date}`
      buttonsField.removeChild(document.querySelector(".btn-danger"))
      buttonsField.removeChild(document.querySelector(".btn-success"))
    })

    document.querySelector(".btn-success").addEventListener('click', () => {
      let id = e.target.dataset.id
      let newName = document.querySelector(".newName").value
      let newDate = document.querySelector('.newDate').value
      let newLocation = document.querySelector('.newLocation').value
      SuddentripAdapter.updateSuddentrip(newName, newLocation, newDate, id)
      tripName.innerHTML = `${newName}`
      tripLocation.innerHTML = `${newLocation}`
      tripDate.innerHTML = `${newDate}`
      // debugger

    })

  }
}
