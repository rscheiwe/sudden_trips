
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

    return `
                  <li>
                      <i><div class="collapsible-header" style="font-family:Oswald" data-id="${suddentrip.id}">${suddentrip.attributes.name}</div></i>
                      <i><div class="collapsible-body" style="font-family:Oswald; background-color:white"><b>Name:</b> <p data-id="name${suddentrip.id}">${suddentrip.attributes.name}</p></i>
                        <p class="small" style="font-family:Oswald; background-color:white"><b>Date:</b> <p data-id="date${suddentrip.id}">${suddentrip.attributes.date}</p></i>
                        <p class="small" style="font-family:Oswald"><b>Location:</b> <p data-id="location${suddentrip.id}">${suddentrip.attributes.location}</p>
                        <p class="small" style="font-family:Oswald"><b>Destinations:</b> ${suddentrip.attributes.destinations !== null ? suddentrip.attributes.destinations.map(destination => `<p class="small" data-id="Destination${suddentrip.id}">${destination.name} | ${destination.address}</p>`).join('') : ""}

                        <p class="small" style="font-family:Oswald"><b>Lat/Long:</b>  ${suddentrip.attributes.latitude} | ${suddentrip.attributes.longitude}</p>
                        <p class="small" style="font-family:Oswald"><b>Rating:</b>  ${suddentrip.attributes.rating}</p>
                        <div data-id="buttons${suddentrip.id}"><button type="submit"  style="font-family:Oswald" class="btn-primary" data-id="${suddentrip.id}" style="float: right;">Edit</button><button type="submit"  style="font-family:Oswald" class="btn-delete" data-id="${suddentrip.id}" style="float: right;">Delete</button></div>
                        </div>
                </li>
                  `




}

function renderSuddentrips(suddentrips) {

  const template = suddentrips.data.map(suddentripTemplate).join('')
  renderSuddentrip(template)
}

function renderSuddentrip(template) {

  document.querySelector('#collapsible-popout').innerHTML += template
}

function handleTripClick(e) {
  e.preventDefault();
  console.log(e.target.id);
  if (e.target.id === 'submit-trip') {
    let tripName = document.querySelector("#suddentripname").value
    let tripLocation = document.querySelector("#suddentriplocation").value
    let tripDate = document.querySelector("#suddentripdate").value

    SuddentripAdapter.createSuddentrip(tripName, tripLocation, tripDate)
      .then(json => suddentripTemplate(json.data))
      .then(renderSuddentrip)
    document.querySelector('#add-button').reset()
  }

}

function handleTripEdit(e) {
  if(e.target.className === 'btn-primary'){
    // debugger
    e.preventDefault()
    let trip = e.target.dataset.id
    let buttonsField = document.querySelector(`[data-id="buttons${trip}"]`)

    let tripName = document.querySelector(`[data-id="name${trip}"]`)
    let tripLocation = document.querySelector(`[data-id="location${trip}"]`)
    let tripDate = document.querySelector(`[data-id="date${trip}"]`)

    let name = tripName.innerText
    let location = tripLocation.innerText
    let date = tripDate.innerText

    tripName.innerHTML = `<input type="text" class="newName" value="${name}" style="color:red">`
    tripLocation.innerHTML = `<input type="text" class="newLocation" value="${location}" style="color:red">`
    tripDate.innerHTML = `<input type="text" class="newDate"  value="${date}" style="color:red">`

    buttonsField.innerHTML = `    <button type="submit" style="font-family:Oswald" class="btn-success" data-id="${trip}" style="float: right;">Save</button>`
    buttonsField.innerHTML += `    <button type="submit" style="font-family:Oswald" class="btn-danger" data-id="${trip}" style="float: right;">Cancel</button>`

    document.querySelector(".btn-danger").addEventListener('click', () => {
      let buttonsField = document.querySelector(`[data-id="buttons${trip}"]`)
      tripName.innerHTML = `${name}`
      tripLocation.innerHTML = `${location}`
      tripDate.innerHTML = `${date}`
      buttonsField.removeChild(document.querySelector(".btn-danger"))
      buttonsField.removeChild(document.querySelector(".btn-success"))
      buttonsField.innerHTML =  `<button type="submit"  style="font-family:Oswald" class="btn-primary" data-id="${trip}" style="float: right;">Edit</button>                          <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
`

    })

    document.querySelector(".btn-success").addEventListener('click', () => {
      let id = e.target.dataset.id
      let newName = document.querySelector(".newName").value
      let newDate = document.querySelector('.newDate').value
      let newLocation = document.querySelector('.newLocation').value
      // let newDestination = document.querySelector(`[data-id="Destination${id}"]`)
      SuddentripAdapter.updateSuddentrip(newName, newLocation, newDate, id)
      .then(suddentripTemplate)
      .then(renderSuddentrip)
      tripName.innerHTML = `${newName}`
      tripLocation.innerHTML = `${newLocation}`
      tripDate.innerHTML = `${newDate}`
      buttonsField.removeChild(document.querySelector(".btn-danger"))
      buttonsField.removeChild(document.querySelector(".btn-success"))
      buttonsField.innerHTML =  `<button type="submit"  style="font-family:Oswald" class="btn-primary" data-id="${trip}" style="float: right;">Edit</button>`

      // debugger

    })

  }
    if (e.target.className === 'btn-delete') {
      e.preventDefault()
      let id = e.target.dataset.id
      SuddentripAdapter.deleteSuddentrip(id)
      e.target.parentElement.parentElement.parentElement.remove()
    }

}
