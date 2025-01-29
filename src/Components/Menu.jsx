import { useEffect, useState } from "react"
import {getAllMenu} from "../API/API"
import {Helmet} from "react-helmet"

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getAllMenu();
        setMenu(data.categories);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu()
  },[])
  return(
    <>
      <header id="header">
        <div id="title-bar">
            <img className="btn-icon" src="/images/circle.png" alt="Ignore"/>
            <div className="title-container">
                <img id="logo" src="/images/logo-white.png" alt="Logo"/>
                <span id="title">Kantin Lestari</span>
            </div>
            <img className="btn-ignore" src="/images/circle.png" alt="Ignore"/>
            <img src="/images/hamburger_white.png" alt="Navbar icon" id="navbar-icon" />
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
              {category.menus.map((menu)=>(
                <div className="menu-item" key={menu.id}>
                  <img className="menu-pic" src={menu.pic ?? '/images/photo.png'} alt={menu.name}/>
                  <div className="menu-info">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 break-words">{menu.name}</h2>
                      <h3 className="menu-price">{menu.price/1000}rb</h3>
                    </div>
                    <p className="menu-desc">{menu.desc}</p>
                    <div className="mt-4 w-full flex justify-center">
                      <input className="block w-16 text-center rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6" type="number" value={0} min={0} step={1} name="qty" id="menu-qty" />
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