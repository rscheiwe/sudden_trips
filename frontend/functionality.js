
//
// function init() {
//   Adapter.readUsers().then(renderUsers)
// }

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

let addBTN = document.querySelector('#add-trip')
addBTN.addEventListener('click', handleAddTripClick)
function handleAddTripClick(event) {
  event.preventDefault()

}

let showBTN = document.querySelector('#show-trip')
showBTN.addEventListener('click', handleShowTripClick )
function handleShowTripClick(event) {
  event.preventDefault()
}


function cryptoTemplate(crypto) {
    return `<center><div id="accordion">
              <div class="card" style="width:75%" data-id="${crypto.id}">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${crypto.id}" aria-expanded="true" aria-controls="collapseOne">
                      ${crypto.symbol}
                    </button>
                  </h5>
                </div>
                <div id="collapse${crypto.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <h4>${crypto.name}</h4>
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

function renderCryptos(cryptos) {
  const template = Object.values(cryptos["data"]).map(cryptoTemplate).join('')
  renderCrypto(template)
}

function renderCrypto(template) {
  const cryptoList = document.querySelector('#crypto-list')
  cryptoList.innerHTML += template
}
