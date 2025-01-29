import MenuLayout from "./MenuLayout"
import Alert from "./Alert"
import Navbar from "./Navbar"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory, getSpecificMenu, updateMenu, validateToken } from "../API/API"

const UpdateMenu = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [menu, setMenu] = useState({
    id,
    name:'',
    desc:'',
    price:0,
    categoryId:'',
    pic:null
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

  const handleInputMenu = (event) => {
    setMenu({...menu, [event.target.name]:event.target.value})
  }

  const handleInputFile = (file) => {
    setMenu({...menu, ['pic']:file})
    if(file.name){
      setFileName(file.name)
    }
  }

  const handleSubmitMenu = async (event) => {
    event.preventDefault()
    setLoading(true)
    try{
      if(!menu.name || !menu.desc || !menu.price || !menu.categoryId){
        setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
        setMessage("Nama, deskripsi, harga, dan kategori tidak boleh kosong!")
      }else{
        const token = Cookies.get('token')
        const response = await updateMenu(token,menu)
        const name = response.data.menu.name
        setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
        setMessage(`Menu ${name} berhasil diperbarui.`)
      }
    }catch(e){
      setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
      if(e.response?.status === 400){
        setMessage("Tipe file harus JPG, JPEG, atau PNG!")
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
    const retrieveCategory = async () => {
      try{
        const data = await getAllCategory()
        setCategoryList(data.categories)
      }catch(e){
        console.error("Error fetching categories:", e);
      }
    }
    const retrieveMenu = async () => {
      try{
        const response = await getSpecificMenu(id)
        setMenu(response.data.menu)
        if(response.data.menu.pic){
          setFileName(response.data.menu.pic)
        }
      }catch(e){
        setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
        if(e.response?.status === 404){
          navigate('/admin/menu?message=menu_not_found')
        }else{
          setMessage("Terjadi kesalahan!")
        }
      }
    }
    validateLogin()
    retrieveCategory()
    retrieveMenu()
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
        <MenuLayout
          categoryList={categoryList}
          handleInputMenu={handleInputMenu}
          handleInputFile={handleInputFile}
          handleSubmitMenu={handleSubmitMenu}
          fileName={fileName}
          setFileName={setFileName}
          loading={loading}
          menu={menu}
        />
      </div>
    </>
  )
}

export default UpdateMenu