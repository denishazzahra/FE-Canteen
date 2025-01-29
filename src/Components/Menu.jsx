import { useEffect, useState } from "react"
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import {getAllMenu} from "../API/API"
import {Helmet} from "react-helmet"
import Cookies from "js-cookie"
import Cart from "./Cart"

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({})
  const [open, setOpen] = useState(false)

  const addToCart = (event, id) => {
    const qty = parseInt(event.target.value, 10) || 0;
    setOrder(prevOrder => {
      const updatedOrder = { ...prevOrder, [id]: qty };
      Cookies.set("cart", JSON.stringify(updatedOrder)); 
      return updatedOrder;
    });
  };

  const cartList = () => {
    let tempList = []
    menu.forEach(category => {
      category.menus.forEach(item => {
        if (order[item.id]) {
          let tempItem = item
          tempItem['qty'] = order[item.id]
          tempList.push(tempItem)
        }
      })
    })
    return tempList
  }

  const formattedTotal = () => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      trailingZeroDisplay: 'stripIfInteger',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return formatter.format(total)
  }

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getAllMenu();
        setMenu(data.categories);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    const loadCart = () => {
      const savedCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {}
      setOrder(savedCart);
    }
    fetchMenu()
    loadCart()
  },[])

  useEffect(() => {
    let temp = 0;
    menu.forEach(category => {
      category.menus.forEach(item => {
        if (order[item.id]) {
          temp += order[item.id] * item.price;
        }
      });
    });
    setTotal(temp);
  }, [order, menu]);

  return(
    <>
      {open && <Cart onClose={()=>setOpen(false)} cartList={cartList()} total={formattedTotal()}/>}
      {total!=0 && !open && <div className="fixed bottom-0 z-50 left-1/2 transform -translate-x-1/2 w-full p-4">
        <div className="bg-black text-white font-semibold py-4 px-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h5 className="text-md font-semibold">Total: </h5>
            <h3 className="text-lg font-semibold">{formattedTotal()}</h3>
          </div>
        </div>
      </div>}
      <header id="header">
        <div id="title-bar">
            <img className="btn-ignore" src="/images/circle.png" alt="Ignore"/>
            <img src="/images/hamburger_white.png" alt="Navbar icon" id="navbar-icon" />
            <div className="title-container">
                <img id="logo" src="/images/logo-white.png" alt="Logo"/>
                <span id="title">Kantin Lestari</span>
            </div>
            <button
              type="button"
              onClick={()=>setOpen(true)}
              className="relative rounded-full bg-gray-800 p-2 mr-4 text-white hover:bg-gray-700 focus:ring-0 focus:outline-none"
            >
              <ShoppingCartIcon aria-hidden="true" className="size-6" />
            </button>
        </div>
        <nav id="navbar">
            <ul className="navbar-group-close" id="navbar-group">
              {menu.map((category)=>(
                <li key={category.id}><a className="btn-navbar" href={`#${category.name}`}>{category.name}</a></li>
              ))}
            </ul>
        </nav>
      </header>
      <p id="check"></p>
      <div className="menu">
        {menu.map((category)=>(
          <div key={category.id}>
            <h1 className="ml-3 text-3xl font-semibold text-gray-900" id={category.name}>{category.name}</h1>
            <div className="menu-grid">
              {category.menus.map((menu,index)=>(
                <div className="menu-item" key={menu.id}>
                  <img className="menu-pic" src={menu.pic ?? '/images/photo.png'} alt={menu.name}/>
                  <div className="menu-info">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 break-words">{menu.name}</h2>
                      <h3 className="menu-price">{menu.price/1000}rb</h3>
                    </div>
                    <p className="menu-desc">{menu.desc}</p>
                    <div className="mt-4 flex justify-center items-center">
                      <button
                        onClick={() => addToCart({ target: { value: Math.max((order[menu.id] || 0) - 1, 0) } }, menu.id)}
                        className="px-3 py-1.5 bg-gray-200 font-semibold text-gray-700 rounded-md hover:bg-gray-300"
                      >-</button>
                      <input className="block w-16 text-center appearance-none rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6 [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none 
                        [-moz-appearance:textfield]" type="number" min={0} max={100} step={1} name="qty[]" value={order[menu.id] || 0} onChange={(e)=>addToCart(e,menu.id)} />
                      <button
                        onClick={() => addToCart({ target: { value: Math.min((order[menu.id] || 0) + 1, 100) } }, menu.id)}
                        className="px-3 py-1.5 bg-gray-200 font-semibold text-gray-700 rounded-md hover:bg-gray-300"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div><br/>
          </div>
        ))}
      </div>
      <footer>&copy; 2025</footer>
      <Helmet>
        <script src='/script.js'></script>
      </Helmet>
    </>
  )
}

export default Menu