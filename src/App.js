import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Home, NotFound} from './Pages/Home';
import {Login, AdminPage, MenuPreviewPage, UpdateMenuPage, CategoryPreviewPage, UpdateCategoryPage} from './Pages/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Login/>}/>
        <Route path='/admin/home' element={<AdminPage/>}/>
        <Route path='/admin/menu' element={<MenuPreviewPage/>}/>
        <Route path='/admin/category' element={<CategoryPreviewPage/>}/>
        <Route path='/admin/menu/update/:id' element={<UpdateMenuPage/>}/>
        <Route path='/admin/category/update/:id' element={<UpdateCategoryPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
