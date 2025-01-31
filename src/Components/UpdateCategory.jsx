import CategoryLayout from "./CategoryLayout"
import Alert from "./Alert"
import Navbar from "./Navbar"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificCategory, updateCategory, validateToken } from "../API/API"

const UpdateCategory = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState({
    id,
    name:''
  })

  const logout = ({message=""}) => {
    Cookies.remove('token')
    navigate(`/admin${message}`);
  };

  const pages = [
    {
      name: "Dashboard",
      href: "/admin/home",
      current: false,
    },
    {
      name: "Kategori",
      href: "/admin/category",
      current: false,
    },
    {
      name: "Menu",
      href: "/admin/menu",
      current: false,
    },
  ]

  const retrieveCategory = async ()=>{
    try{
      const response = await getSpecificCategory(id)
      setCategory(response.data.category)
    }catch(e){
      if(e.response?.status === 403){
        logout('?message=forbidden')
      }else if(e.response?.status === 404){
        navigate('/admin/category?message=category_not_found')
      }else{
        setMessage("Terjadi kesalahan.")
      }
    }
  }

  const handleInputCategory = (event)=>{
    setCategory({...category, name:event.target.value})
  }

  const handleSubmitCategory = async (event)=>{
    event.preventDefault()
    setLoading(true)
    try{
      if(!category.name){
        setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
        setMessage("Nama kategori tidak boleh kosong!")
      }else{
        const token = Cookies.get('token')
        const response = await updateCategory(token,category)
        const name = response.data.category.name
        setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
        setMessage(`Kategori ${name} berhasil diperbarui.`)
      }
      retrieveCategory()
    }catch(e){
      setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
      if(e.response?.status === 403){
        logout('?message=forbidden')
      }else if(e.response?.status === 404){
        setMessage("Kategori tidak ditemukan!")
      }else{
        setMessage("Terjadi kesalahan.")
      }
    }finally{
      setLoading(false)
    } 
  }

  useEffect(()=>{
    const validateLogin = async () => {
      try{
        const token = Cookies.get('token')
        await validateToken(token)
      }catch(e){
        setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
        if(e.response?.status === 403){
          logout({message:'?message=forbidden'})
        }else if(e.response?.status === 401){
          logout({message:'?message=unauthorized'})
        }else{
          setMessage("Terjadi kesalahan.")
        }
      }
    }
    validateLogin()
    retrieveCategory()
  },[])
  return(
    <>
      <Navbar 
        navigation={pages} 
        logout={logout}
      />
      {message && (
        <Alert
          classes={classes}
          message={message}
          onClose={() => setMessage("")}
        />
      )}
      <div className="mt-24 ml-6 mr-6 mb-6">
        <CategoryLayout
          handleInputCategory={handleInputCategory} 
          handleSubmitCategory={handleSubmitCategory}
          loading={loading}
          category={category}
        />
      </div>
    </>
  )
}

export default UpdateCategory