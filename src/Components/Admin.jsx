import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"
import { addCategory, addMenu, getAllCategory, validateToken } from "../API/API"
import Alert from "./Alert";
import Navbar from "./Navbar";
import CategoryLayout from "./CategoryLayout"
import MenuLayout from "./MenuLayout"

const AdminPageComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState({name:''})
  const [categoryList, setCategoryList] = useState([])
  const [fileName, setFileName] = useState('')
  const [menu, setMenu] = useState(
    {
      name:'',
      desc:'',
      price:0,
      categoryId:'',
      pic:null
    }
  )

  const logout = ({message=""}) => {
    Cookies.remove('token')
    navigate(`/admin${message}`);
  };

  const pages = [
    {
      name: "Dashboard",
      href: "/admin/home",
      current: true,
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

  const handleInputCategory = (event)=>{
    setCategory({name:event.target.value})
  }

  const retrieveCategory = async () => {
    try{
      const data = await getAllCategory()
      setCategoryList(data.categories)
    }catch(e){
      console.error("Error fetching categories:", e);
    }
  }

  const handleInputMenu = (event) => {
    setMenu({...menu, [event.target.name]:event.target.value})
  }

  const handleInputFile = (file) => {
    setMenu({...menu, ['pic']:file})
    if(file.name){
      setFileName(file.name)
    }else{
      setFileName('')
    }
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
        const response = await addCategory(token,category)
        const name = response.data.category.name
        setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
        setMessage(`Kategori ${name} berhasil ditambahkan.`)
      }
      retrieveCategory()
    }catch(e){
      setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
      if(e.response.status === 403){
        setMessage("Anda tidak memiliki akses!")
      }else if(e.response.status === 409){
        setMessage("Kategori sudah ada!")
      }else{
        setMessage("Terjadi kesalahan.")
      }
    }finally{
      setLoading(false)
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
        const response = await addMenu(token,menu)
        const name = response.data.menu.name
        setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
        setMessage(`Menu ${name} berhasil ditambahkan.`)
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

  const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  }

  useEffect(()=>{
    const validateLogin = async () => {
      try{
        const token = Cookies.get('token')
        await validateToken(token)
        const m = getQueryParam('message')
        if(m === 'login_success'){
          setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
          setMessage("Selamat datang!")
        }
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

  return (
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
        />
        <MenuLayout
          categoryList={categoryList}
          handleInputMenu={handleInputMenu}
          handleInputFile={handleInputFile}
          handleSubmitMenu={handleSubmitMenu}
          fileName={fileName}
          setFileName={setFileName}
          loading={loading}
        />
    </div>
    </>
  );
};

export default AdminPageComponent;
