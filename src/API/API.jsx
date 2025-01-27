import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

export const getAllMenu = async ()=> {
  const response = await axios.get(`${baseUrl}/menu`)
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