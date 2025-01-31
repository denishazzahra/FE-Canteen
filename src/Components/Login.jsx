import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { loginAdmin } from "../API/API"
import Cookies from "js-cookie"
import Alert from "./Alert"

const LoginComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail:'',
    password:''
  })
  const alertClasses = "flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
  const handleInput = (event)=>{
    setLoginForm({...loginForm,[event.target.name]:event.target.value})
  }
  const handleSubmit = async (event)=>{
    event.preventDefault()
    setLoading(true)
    try{
      const response = await loginAdmin(loginForm)
      Cookies.set('token',response.data.token)
      navigate('/admin/home?message=login_success')
    }catch(e){
      if(e.response?.status === 400){
        setErrorMessage("Username/email atau kata sandi salah!")
      }else{
        setErrorMessage("Terjadi kesalahan.")
      }
    }finally{
      setLoading(false)
    } 
  }
  const closeAlert = ()=>{
    setErrorMessage('')
  }
  useEffect(()=>{
    const getQueryParam = (name) => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get(name);
    }
    const message = getQueryParam('message')
    if(message === 'forbidden'){
      setErrorMessage("Silakan login terlebih dahulu.")
    }else if(message === 'unauthorized'){
      setErrorMessage("Sesi Anda telah habis, silakan login kembali.")
    }
  },[])
  return(
    <>
      {errorMessage && (
      <Alert
        classes={alertClasses}
        message={errorMessage}
        onClose={closeAlert}
      />
      )}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="/images/logo-black.png" alt="Logo"/>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Masuk ke akun Anda</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Username/email</label>
              <div className="mt-2">
                <input type="text" name="usernameOrEmail" id="email" autoComplete="email" onChange={handleInput} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Kata Sandi</label>
              </div>
              <div className="mt-2">
                <input type="password" name="password" id="password" autoComplete="current-password" onChange={handleInput} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"/>
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600">
                {loading ? "Loading..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginComponent