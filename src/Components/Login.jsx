import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginAdmin } from "../API/API"
import Cookies from "js-cookie"

const LoginComponent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail:'',
    password:''
  })
  const handleInput = (event)=>{
    setLoginForm({...loginForm,[event.target.name]:event.target.value})
  }
  const handleSubmit = async (event)=>{
    event.preventDefault()
    setLoading(true)
    try{
      const response = await loginAdmin(loginForm)
      console.log(response)
      Cookies.set('token',response.data.token)
      navigate('/admin/home')
    }catch(e){
      if(e.response.status === 400){
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
  return(
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {errorMessage && (
      <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
        <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div className="ms-3 text-sm font-medium">
          {errorMessage}
        </div>
        <button type="button" onClick={closeAlert} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-2" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="/logo-black.png" alt="Logo"/>
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
            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600">
              {loading ? "Loading..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent