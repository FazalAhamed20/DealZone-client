import { API_URL } from "../utils/constant"
import { getToken } from "./token"


export const getApi = async (path) => {

  let token = await getToken()
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

  })
  return response
}

export const postApi = async (path, data) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
     product:{
      ...data
     }
    })

  })
  return response

}

export const searchApi = async (query) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}/search/index?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

  })
  let result = await response.json()
  return result

}

export const myProductSearchApi = async (query) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}/search/my_product_search?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

  })
  let result = await response.json()
  return result

}

export const logoutApi = async (path) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

  })
  let result = await response.json()
  return result

}


export const productSearchCategoriesApi = async (query) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}/products/search_categories?query=${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

  })
  let result = await response.json()
  return result

}


export const deleteApi = async (path,id) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}${path}/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
   

  })
  return response

}

export const editApi = async (path,id,data) => {
  let token = await getToken()
  const response = await fetch(`${API_URL}${path}/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      product:{
       ...data
      }
     })
   

  })
  return response

}
