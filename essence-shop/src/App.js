
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { Footer } from './components/Footer/Footer';
import NavBar from './components/Header/NavBar/NavBar';
import { Home } from './components/Home/Home';
import Products from './components/Products/Products';
import { auth } from './lib/init-firebase';
import { Routes, Route, Link } from 'react-router-dom';
import CreateProduct from './components/Products/CreateProduct/CreateProduct';
import EditProduct from './components/Products/EditProduct/EditProduct';
import DetailsProduct from './components/Products/DetailsProdcut/DetailsProduct';
import { useEffect, } from 'react';
import { ProductContext } from './contexts/ProductContext';
import * as fbFetch from './lib/firebase.fetch';
import User from './components/Users/User';
import { getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { cartCollectionRef, productCollectionRef, userCollectionRef } from './lib/firestore.collections';
import { UserContext } from './contexts/UserContext';
import Cart from './components/Cart/Cart';
import CartProduct from './components/Cart/CartProduct';
import Product from './components/Products/Product/Product';

function App() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [uid, setUid] = useState(null);
  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({});
  const carts = [];
  let product = {};
  let userData = [];


  useEffect(() => {
    getProducts();
  }, [])


  const addToCart = async (prod) => {
    if (user.uid) {
      product = prod
      product['qty'] = 1;
      product['TotalProductPrice'] = product.qty * product.price;
      
    }

    console.log(product)
  }


  // let cartOptions = {
  //   ...product,
  // }
  // await fbFetch.createCart(cartOptions);




  const getProducts = async () => {
    const docs = getDocs(productCollectionRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        setProducts((oldState) => [...oldState, { ...doc.data(), id: doc.id }])
      })
    })
  }


  const handleAddToCart = () => {
    console.log('Add Item');
  }
  const handleRemoveFromCart = () => {
    console.log('Remove Item');
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  onSnapshot(userCollectionRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      userData.pop();
      userData.push({ ...doc.data(), id: doc.id })
    })
  })



  return (

    <ProductContext.Provider value={{ user, userData, addToCart, carts, products, handleAddToCart, handleRemoveFromCart, }}>
      <div className='app'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/create' element={<CreateProduct />} />
          <Route path='/product/list' element={<Products />} />
          <Route path='/product/edit/:productId' element={<EditProduct />} />
          <Route path='/product/:productId' element={<DetailsProduct />} />
          <Route path='/user/info' element={<User userData={userData} />} />
          <Route path='/cart' element={<Cart />} />
          {/* <Route path='/cart/list' element={<CartProduct />} /> */}
        </Routes>
        {user?.email || 'No user'}
        <Footer />
      </div>
    </ProductContext.Provider>

  );
}

export default App;


