
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
import User from './components/Users/User';
import { onSnapshot } from 'firebase/firestore';
import { productCollectionRef } from './lib/firestore.collections';
import { UserContext } from './contexts/UserContext';

function App() {
  // const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});

  const products1 = [];
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  onSnapshot(productCollectionRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      products1.push({ ...doc.data(), id: doc.id })
    })
  })
  useEffect(() => {
    if (user) {
      fbFetch.getUser(user.uid).then((res) => {
        setUserData({
          email: res.data.email,
          name: res.data.name,
          cart: {
            items: [],
            totalSum: 0
          },
          id: res.id,
        })
      })
    }
  }, [user])




  // useEffect(() => {
  //   let data;
  //   const getProductsFromDb = async () => {
  //     data = await fbFetch.getProducts();
  //     setProducts(data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id
  //     })))
  //   }
  //   getProductsFromDb();
  // }, [])
  const fetchCart = async () => {
    const cartData = await userData.cart
    setCart(cartData);
  }


  const addToCart = async (product) => {
    let cartOptions = {
      ...product,
    }  
    console.log(cartOptions);    
  }

  return (
    <UserContext.Provider value={'user'}>
      <ProductContext.Provider value={{ addToCart, products1 }}>
        <div className='app'>
          <NavBar />
          {error}
          {console.log(userData)}
          {console.log(cart)}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product/create' element={<CreateProduct />} />
            <Route path='/product/list' element={<Products />} />
            <Route path='/product/edit/:productId' element={<EditProduct />} />
            <Route path='/product/:productId' element={<DetailsProduct />} />
            <Route path='/user/info' element={<User />} />
          </Routes>
          {user?.email || 'No user'}
          <Footer />
        </div>
      </ProductContext.Provider>
    </UserContext.Provider>
  );
}

export default App;


