import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
