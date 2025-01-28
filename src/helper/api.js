

const API_URL=process.env.REACT_APP_API_URL


export const getApi = async (path) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  })
  return response
}


export const postApi = async (path, data,body) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
     [body]:{
      ...data
     }
    })

  })
  return response

}

export const searchApi = async (query) => {
  const response = await fetch(`${API_URL}/search/index?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
   
    },
    credentials: 'include',

  })
  let result = await response.json()
  return result

}

export const myProductSearchApi = async (query) => {
  const response = await fetch(`${API_URL}/search/my_product_search?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    
    },
    credentials: 'include',
  })
  let result = await response.json()
  return result

}

export const logoutApi = async (path) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  })
  let result = await response.json()
  return result

}


export const productSearchCategoriesApi = async (query) => {
  const response = await fetch(`${API_URL}/products/search_categories?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  })
  let result = await response.json()
  return result

}


export const productSearchFilterApi = async (query) => {
  const response = await fetch(`${API_URL}/search/filter_search?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',

    },
    credentials: 'include',

  })
  let result = await response.json()
  return result

}


export const deleteApi = async (path,id) => {
  const response = await fetch(`${API_URL}${path}/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  })
  return response

}

export const editApi = async (path,id,data) => {
  const response = await fetch(`${API_URL}${path}/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      product:{
       ...data
      }
     })
  })
  return response

}

export const fetchCategoriesApi = async () => {
  const response = await fetch(`${API_URL}/search/category_search`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

  })
  let result = await response.json()
  return result

}