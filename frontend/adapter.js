const UserAdapter = {

  readUsers: function() {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "GET"
    }).then(res => res.json())
  },

  createUser: function(name) {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then(res => res.json())
  },

  updateUser: function( XXX, id ) {
    return fetch("http://localhost:3000/api/v1/users" + '/' + id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        XXX
      })
    })
  },

  deleteUser: function(id) {
    return fetch("http://localhost:3000/api/v1/users" +'/' + id, {
      method: "DELETE"
    })
  }
}

const SuddentripAdapter = {
  readSuddentrips: function() {
    return fetch("http://localhost:3000/api/v1/suddentrips", {
      method: "GET"
    }).then(res => res.json())
  }
}
