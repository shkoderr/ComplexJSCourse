//Fetch
const requestUrl = 'https://jsonplaceholder.typicode.com/users'

//GET:
function sendRequest(method, url, body = null) {
  return fetch(url).then(response => {
    return response.json()
  })
}


//POST:
const body = {
  name: 'Timur',
  age: 26
}

function sendRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers
  }).then(response => {
    if (response.ok) {
      return response.json()
    } 
    return response.json().then(error => {
      const e = new Error('Что-то пошло не так')
      e.data = error;
      throw e 
    })
  })
}


sendRequest('POST', requestUrl, body)
  .then(data => console.log(data))
  .catch(err => console.log(err))