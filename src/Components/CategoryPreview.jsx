import Navbar from "./Navbar"
import Alert from "./Alert"
import DeleteModal from "./DeleteModal"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCategory, deleteCategory, validateToken } from "../API/API"

const CategoryPreview = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState("");
  const [message, setMessage] = useState("");
  const [categoryList, setCategoryList] = useState([])
  const [del, setDel] = useState(0)
  const [open, setOpen] = useState(false)

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
      current: true,
    },
    {
      name: "Menu",
      href: "/admin/menu",
      current: false,
    },
  ]

  const retrieveCategory = async () => {
    try{
      const data = await getAllCategory()
      setCategoryList(data.categories)
    }catch(e){
      console.error("Error fetching categories:", e);
    }
  }

  const delCategory = async () => {
    try{
      setOpen(false)
      const token = Cookies.get('token')
      await deleteCategory(token, del)
      setClasses("flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50")
      setMessage("Kategori berhasil dihapus.")
      retrieveCategory()
    }catch(e){
      setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
      if(e.response?.status === 404){
        setMessage("Kategori tidak tersedia!")
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
        if(m === "category_not_found"){
          setClasses("flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50")
          setMessage("Kategori tidak tersedia!")
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

  return(
    <>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        mode="kategori"
        delOption={delCategory}
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
      <div className="m-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((item, index)=>(
                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {index+1}
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      onClick={()=>navigate(`/admin/category/update/${item.id}`)}
                      className="w-24 text-center text-white bg-blue-700 hover:bg-blue-800 rounded-md text-sm px-3 py-2 font-semibold shadow-xs"
                    >
                      Ubah
                    </button>
                    <p className="mt-2"></p>
                    <button
                      onClick={()=>showModal(item.id)}
                      className="w-24 text-center text-white rounded-md bg-red-600 px-3 py-2 text-sm font-semibold shadow-xs hover:bg-red-500"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default CategoryPreview