
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
import * as fbFetch from './lib/firebase.fetch';

function App() {

  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const productList = fbFetch.getProducts();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  useEffect(() => {
    productList.then(res => {
      const products = res.docs.map(doc => ({
        data: doc.data(),
        id: doc.id
      }));
      setError("");
      setProducts(products);
    }).catch(error => setError(error.message));
  }, [products]);




  return (
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/create' element={<CreateProduct />} />
        <Route path='/product/edit/:productId' element={<EditProduct />} />
        <Route path='/product/list' element={<Products products={products} />} />
        <Route path='/product/:productId' element={<DetailsProduct products={products} />} />
      </Routes>
      {user?.email || 'No user'}
      <Footer />
    </div>
  );
}

export default App;


