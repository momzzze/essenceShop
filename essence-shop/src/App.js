
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import NavBar from './components/Header/NavBar/NavBar';
import { Home } from './components/Home/Home';
import Products from './components/Products/Products';
import AddComponent from './components/Test/AddComponent';
import EditComponent from './components/Test/EditComponent';
import ListComponents from './components/Test/ListComponents';
import Realtime from './components/Test/Realtime';
import { auth } from './lib/init-firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })


  return (
    <BrowserRouter>

      <NavBar />
      <Products />
      <main>
        {/* <ListComponents /> */}
        {/* <AddComponent />
        <EditComponent />
        <Realtime /> */}
        <Login />
        <Register />
        {user?.email || 'No user'}
      </main>

    </BrowserRouter>

  );
}

export default App;


