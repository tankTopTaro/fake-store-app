import './App.css';
import Products from './pages/Products';
import Login from './pages/Login';
import Home from './pages/Home'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null)
  // {token ? <Products /> : <Login toke={token} setToken={setToken} />}
  return (
    <div className="App">
        <Navbar token={token} setToken={setToken} />
        <div className='container'>
          <Routes>
            <Route path='/' index element={<Home />} /> 
            <Route path='/login' element={<Login token={token} setToken={setToken} />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:pid' element={<ProductDetail />} />
          </Routes>
        </div>
        <Footer />
    </div>
  );
}

export default App;
