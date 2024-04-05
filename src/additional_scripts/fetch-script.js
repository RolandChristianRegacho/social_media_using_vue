import GoToErrorPage from "./error-pages"

const token = "$2y$10$bqBmVWnLueHlcyuDbeFmWuZXZs.D6Hy8IdTDQCFHAbqmvCkk9gLJu"

export async function getAxiosData(link) {
  const response = await fetch(link, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
      },
  })

  if(response.status != 200) {
      GoToErrorPage(response.status)
  }
  else {
      return response.json()
  }
}

export async function postAxiosData(link, data = {}) {
  if(link != "") {
    //const result = await axios.post(link, data, {headers: {Authorization: `Bearer ${token}`}})
    const response = await fetch(link, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if(response.status != 200) {
      GoToErrorPage(response.status)
    }
    else {
        return response.json()
    }
  }
}

export async function postImageData(link, data = {}) {
  if(link != "") {
    //const result = await axios.post(link, data, {headers: {Authorization: `Bearer ${token}`}})
    const response = await fetch(link, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            //"Content-type": "application/image",
            "Authorization": `Bearer ${token}`
        },
        body: data
    })

    if(response.status != 200) {
      //GoToErrorPage(response.status)
    }
    else {
        return response.json()
    }
  }
}

export async function updateAxiosData(link, data = {}) {
  const response = await fetch(link, {
      method: "put", // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
  })

  if(response.status != 200) {
    GoToErrorPage(response.status)
  }
  else {
      return response.json()
  }
}

export async function deleteAxiosData(link, data = {}) {
  const response = await fetch(link, {
      method: "delete", // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
  })

  if(response.status != 200) {
    GoToErrorPage(response.status)
  }
  else {
      return response.json()
  }
}