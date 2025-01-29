import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

export const getAllMenu = async ()=> {
  const response = await axios.get(
    `${baseUrl}/menu`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  return response.data
}

export const loginAdmin = async (loginForm)=> {
  const response = await axios.post(
    `${baseUrl}/admin/login`,
    loginForm,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
  return response
}

export const validateToken = async (token)=> {
  const response = await axios.get(
    `${baseUrl}/admin/validate`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response
}

export const addCategory = async (token, category)=> {
  const response = await axios.post(
    `${baseUrl}/category/create`,
    category,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response
}

export const getAllCategory = async ()=> {
  const response = await axios.get(
    `${baseUrl}/category`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  return response.data
}

export const addMenu = async (token, menu)=> {
  const payload = new FormData()
  payload.append("name", menu.name)
  payload.append("desc", menu.desc)
  payload.append("price", menu.price)
  payload.append("categoryId", menu.categoryId)
  if(menu.pic){
    payload.append("pic",menu.pic)
  }
  const response = await axios.post(`${baseUrl}/menu/create`, payload, {
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
  return response
}

export const deleteMenu = async (token, id)=> {
  const response = await axios.delete(
    `${baseUrl}/menu/delete/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response
}

export const updateMenu = async (token, menu)=> {
  const payload = new FormData()
  payload.append("name", menu.name)
  payload.append("desc", menu.desc)
  payload.append("price", menu.price)
  payload.append("categoryId", menu.categoryId)
  if(menu.pic){
    payload.append("pic",menu.pic)
  }
  const response = await axios.put(
    `${baseUrl}/menu/update/${menu.id}`,
    payload,
    {
      headers: {
        "accept": "application/json",
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response
}

export const getSpecificMenu = async (id) => {
  const response = await axios.get(
    `${baseUrl}/menu/${id}`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  return response
}

export const getSpecificCategory = async (id) => {
  const response = await axios.get(
    `${baseUrl}/category/${id}`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
  return response
}

export const updateCategory = async (token, category)=> {
  const response = await axios.put(
    `${baseUrl}/category/update/${category.id}`,
    category,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response
}

export const deleteCategory = async (token, id) => {
  const response = await axios.delete(
    `${baseUrl}/category/delete/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
  return response
}