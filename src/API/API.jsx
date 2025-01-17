import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

const getAllMenu = async ()=> {
  const response = await axios.get(`${baseUrl}/menu`)
  return response.data
}

export default getAllMenu