
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { Footer } from './components/Footer/Footer';
import NavBar from './components/Header/NavBar';
import { Home } from './components/Home/Home';
import Products from './components/Products/Products';
import { auth, db } from './lib/init-firebase';
import { Routes, Route, Link } from 'react-router-dom';
import CreateProduct from './components/Products/CreateProduct/CreateProduct';
import EditProduct from './components/Products/EditProduct/EditProduct';
import DetailsProduct from './components/Products/DetailsProdcut/DetailsProduct';
import { useEffect, } from 'react';
import { ProductContext } from './contexts/ProductContext';
import * as fbFetch from './lib/firebase.fetch';
import User from './components/Users/User';
import { getDocs, onSnapshot, collection, query, where, getDoc } from 'firebase/firestore';
import { userCollectionRef } from './lib/firestore.collections';

import Cart from './components/Cart/Cart';
import { async } from '@firebase/util';
import InfoBlock from './components/InfoBlock/InfoBlock';
import { About } from './components/InfoBlock/About/About';
import Contact from './components/InfoBlock/Contact/Contact';

function App() {  
  const [user, setUser] = useState({});
  const [badger, setBadger] = useState(0);
  const [userData, setUserData] = useState({});


  useEffect(() => {
    badgerCalculator();
  }, [badger,userData])

  useEffect(() => {
    getUserData();
    badgerCalculator();
  }, [user])

  const getUserData = async () => {    
    const userRef = collection(db, `users`);
    const q = query(userRef, where("email", "==", `${auth.currentUser?.email}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(el => {
      setUserData(el.data())
    })
    if (!user) {
      setUserData({})
    }
  }
  const updateUserData=(data)=>{    
    let currentUserData=userData
    currentUserData['completedOrders'].push(data['completedOrders'])
    getUserData()
    fbFetch.editUser(auth.currentUser.uid,currentUserData)
  }

  const badgerCalculator = async () => {
    const cartRef = collection(db, `cart ${auth.currentUser?.uid}`);
    const querySnapshot = await getDocs(cartRef);
    setBadger(0);
    querySnapshot.forEach((doc) => {
      setBadger(old => old += (doc.data().qty))
    })
  }


  const addToCart = async (prod) => {
    let product = {};
    const cartRef = collection(db, `cart ${auth.currentUser.uid}`);
    const q = query(cartRef, where("id", "==", `${prod.id}`));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("Empty");
      if (user.uid) {
        product = prod
        product['qty'] = 1;
        product['TotalProductPrice'] = product.qty * product.price;
        setBadger(old => (old + 1));
        fbFetch.createCart(user.uid, product)
      }
    } else {
      querySnapshot.forEach((doc) => {
        product = [];
        product = doc.data();
        product['qty'] += 1;
        product['TotalProductPrice'] = product.qty * product.price;
        setBadger(old => (old + 1));
        fbFetch.editCart(user.uid, doc.id, product);
      });
    }
  }



  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  return (

    <ProductContext.Provider value={{ user, userData, addToCart, badger, badgerCalculator }}>
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
          <Route path='/cart' element={<Cart updateUserData={updateUserData} />} />
          <Route path='/info' element={<InfoBlock />} />
          <Route path='/info/about' element={<About />} />
          <Route path='/info/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </ProductContext.Provider>

  );
}

export default App;


