import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateToken, getAllMenu, deleteMenu } from "../API/API"
import Cookies from "js-cookie"
import Navbar from './Navbar'
import Alert from './Alert'
import DeleteModal from "./DeleteModal"

const MenuPreview = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("");
  const [classes, setClasses] = useState("");
  const [menu, setMenu] = useState([])
  const [del, setDel] = useState(0)
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
      current: true,
    },
  ]
  const fetchMenu = async () => {
    try {
      const data = await getAllMenu();
      setMenu(data.categories);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };
  const delMenu = async () => {
    try{
      setOpen(false)
      const token = Cookies.get('token')
      await deleteMenu(token, del)
      setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
      setMessage("Menu berhasil dihapus.")
      fetchMenu()
    }catch(e){
      setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
      if(e.response?.status === 404){
        setMessage("Menu tidak tersedia!")
      }else{
        setMessage("Terjadi kesalahan.")
      }
    }
  }

  const showModal = (id) => {
    setDel(id)
    setOpen(true)
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
        if(m === 'menu_not_found'){
          setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
          setMessage("Menu tidak tersedia!")
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
    fetchMenu()
  },[])

  return(
    <>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        mode="menu"
        delOption={delMenu}
      />
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
      <div className="menu">
        {menu.map((category)=>(
          <div key={category.id}>
            <h1 className="ml-3 text-3xl font-semibold text-gray-900" id={category.name}>{category.name}</h1>
            <div className="menu-grid">
              {category.menus.map((menu)=>(
                <div className="menu-item" key={menu.id}>
                    <img className="menu-pic" src={menu.pic ?? '/images/photo.png'} alt={menu.name}/>
                    <div className="menu-info">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 break-words">{menu.name}</h2>
                            <h3 className="menu-price">{menu.price/1000}rb</h3>
                        </div>
                        <p className="menu-desc">{menu.desc}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                          href={`/admin/menu/update/${menu.id}`}
                          className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 rounded-md text-sm px-3 py-2 font-semibold shadow-xs"
                        >
                          Ubah
                        </a>
                        <button
                          onClick={()=>showModal(menu.id)}
                          className="w-full text-center text-white rounded-md bg-red-600 px-3 py-2 text-sm font-semibold shadow-xs hover:bg-red-500"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                </div>
              ))}
            </div><br/>
          </div>
        ))}
      </div>
    </>
  )
}

export default MenuPreview