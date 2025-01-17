import { useEffect, useState } from "react"
import getAllMenu from "../API/API"

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getAllMenu();
        setMenu(data.categories);
        console.log("Fetched Menu:", data.categories);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu()
  }, [])
  return(
    <>
      <header id="header">
        <div id="title-bar">
            <img className="btn-icon" src="/circle.png" alt="Ignore"/>
            <div className="title-container">
                <img id="logo" src="/logo-white.png" alt="Logo"/>
                <span id="title">Kantin Lestari</span>
            </div>
            <img className="btn-ignore" src="/circle.png" alt="Ignore"/>
            <img src="/hamburger_white.png" alt="Navbar icon" id="navbar-icon" />
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
            <h1 id={category.name}>{category.name}</h1>
            <div className="menu-grid">
              {category.menus.map((menu)=>(
                <div className="menu-item" key={menu.id}>
                    <img className="menu-pic" src={menu.pic} alt={menu.name}/>
                    <div className="menu-info">
                        <div>
                            <h2 className="menu-name">{menu.name}</h2>
                            <h3 className="menu-price">{menu.price/1000}rb</h3>
                        </div>
                        <p className="menu-desc">{menu.desc}</p>
                    </div>
                </div>
              ))}
            </div><br/>
          </div>
        ))}
      </div>
      <footer>&copy; 2025</footer>
    </>
  )
}

export default Menu