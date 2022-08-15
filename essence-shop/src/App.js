
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { Footer } from './components/Footer/Footer';
import NavBar from './components/Header/NavBar/NavBar';
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
import { getDocs, onSnapshot, orderBy, collection, query, where } from 'firebase/firestore';
import { cartCollectionRef, productCollectionRef, userCollectionRef } from './lib/firestore.collections';
import { UserContext } from './contexts/UserContext';
import Cart from './components/Cart/Cart';
import CartProduct from './components/Cart/CartProduct';
import Product from './components/Products/Product/Product';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [badger, setBadger] = useState(0);

  let userData = [];

  useEffect(() => {
    badgerCalculator();
  }, [])

  const badgerCalculator = async () => {
    const cartRef = collection(db, `cart ${auth.currentUser?.uid}`);
    const querySnapshot = await getDocs(cartRef);
    setBadger(0);
    querySnapshot?.forEach((doc) => {
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
    setUser(currentUser)
  })

  onSnapshot(userCollectionRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      userData.pop();
      userData.push({ ...doc.data(), id: doc.id })
    })
  })

  return (

    <ProductContext.Provider value={{ user, userData, addToCart, badger, badgerCalculator }}>
      <div className='app'>
        <NavBar />
        {console.log(badger)}
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
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        {user?.email || 'No user'}
        <Footer />
      </div>
    </ProductContext.Provider>

  );
}

export default App;


