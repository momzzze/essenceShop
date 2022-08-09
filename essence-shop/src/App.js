
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { Footer } from './components/Footer/Footer';
import NavBar from './components/Header/NavBar/NavBar';
import { Home } from './components/Home/Home';
import Products from './components/Products/Products';
import AddComponent from './components/Test/AddComponent';
import EditComponent from './components/Test/EditComponent';
import ListComponents from './components/Test/ListComponents';
import Realtime from './components/Test/Realtime';
import { auth } from './lib/init-firebase';
import { Routes, Route } from 'react-router-dom';
import CreateProduct from './components/Products/CreateProduct/CreateProduct';
import EditProduct from './components/Products/EditProduct/EditProduct';
import DetailsProduct from './components/Products/DetailsProdcut/DetailsProduct';
import { useEffect } from 'react';
import { ProductContext } from './contexts/ProductContext';
import * as fbFetch from './lib/firebase.fetch';

function App() {

  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })




  useEffect(() => {
    let data;
    const getProductsFromDb = async () => {
      data = await fbFetch.getProducts();
      setProducts(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))
    }
    getProductsFromDb();

  }, [])

  const addToCart = async (product) => {
    console.log(product);
  }

  return (
    <ProductContext.Provider value={{ addToCart }}>
      <div className='app'>
        <NavBar />
        {error}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/create' element={<CreateProduct />} />
          <Route path='/product/edit/:productId' element={<EditProduct products={products} />} />
          <Route path='/product/list' element={<Products products={products} />} />
          <Route path='/product/:productId' element={<DetailsProduct products={products} />} />
        </Routes>
        {user?.email || 'No user'}
        <Footer />
      </div>
    </ProductContext.Provider>
  );
}

export default App;


