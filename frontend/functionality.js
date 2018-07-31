
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
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${suddentrip.id}" aria-expanded="true" aria-controls="collapseOne">
                      ${suddentrip.name}
                    </button>
                  </h5>
                </div>
                <div id="collapse${suddentrip.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <h4>${suddentrip.name}</h4>
                      <hr>
                      <i><p class="small"><b>Updated:</b>  ${new Date()}</p></i>
                        <p class="small"><b>Circulating:</b> ${crypto.circulating_supply} out of ${crypto.max_supply}</p>
                        <p class="small"><b>USD Price:</b>  $${crypto.quotes.USD.price}</p>
                        <p class="small"><b>24hr Volume:</b>  $${crypto.quotes.USD.volume_24h}</p>
                        <button type="submit" class="btn-success" id="add-button" style="float: right;">Add to Watchlist</button>
                    </div>
                  </div>
                </div>
              </div></center>`
}

function renderSuddentrips(suddentrips) {
  const template = Object.values(cryptos["data"]).map(cryptoTemplate).join('')
  renderSuddentrip(template)
}

function renderSuddentrip(template) {
  const suddentripList = document.querySelector('#suddentrip-list')
  suddentripList.innerHTML += template
}
