import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Views/Home/Home.jsx';
import Products from './Components/Views/ProductList_Views/ProductList_Views.jsx';
import ProductList from './Components/ProductList/ProductList.jsx'
import Partners from './Components/Views/Partners.jsx';
import About from './Components/Views/About.jsx';


import Product1 from './Components/Views/Products/Product1_Views.jsx';
import Product2 from './Components/Views/Products/Product2_Views.jsx';
import Product3 from './Components/Views/Products/Product3_Views.jsx';

import Login from './Components/Views/Login/Login_Views.jsx';
import Register from './Components/Views/Register/Register_Views.jsx';
import ForgotPassword from './Components/Views/ForgotPassword_Views/ForgotPassword_Views.jsx';
import Cart from './Components/Views/Cart/Cart.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products category="list" />} />
          <Route path='/product1' element={<Product1 />} /> 
          <Route path='/product2' element={<Product2 />} />
          <Route path='/product3' element={<Product3 />} /> 
          <Route path='/search' element={<Products category="search" />} />
          <Route path='/partners/resellers' element={<Partners category="resellers" />} />
          <Route path='/partners/sponsors' element={<Partners category="sponsors" />} />
          <Route path='/about/contact' element={<About category="contact" />} />
          <Route path='/about/faq' element={<About category="faq" />} />
          <Route path='/about/terms' element={<About category="terms" />} />
          <Route path='/about/refund' element={<About category="refund" />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/productlist' element={<ProductList />} />

          <Route path='/login' element={<Login />} /> {/* Route for Login page */}
          <Route path='/register' element={<Register />} /> {/* Route for Register page */}
          <Route path='/forgot-password' element={<ForgotPassword />} /> {/* Route for Forgot Password page */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
