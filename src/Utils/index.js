const Utils = {
  get: (url) => {
    return fetch(url)
      .then(resp => resp.json())
  },

  post: (url, body, headers) => {
    body = JSON.stringify(body)

    return fetch(url, {
      method: "POST",
      headers: { 
        'content-type': 'application/json; charset=utf-8',
        ...headers
      },
      body
    }).then(resp => resp.json())
  }
}

export {
  Utils
}