
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import NavBar from './components/Header/NavBar/NavBar';
import { Home } from './components/Home/Home';
import Products from './components/Products/Products';
import ListComponents from './components/Test/ListComponents';



function App() {
  return (
    <div >
      <NavBar/>
      <Products />
      <main>
        <ListComponents/>
      </main>
    </div>
  );
}

export default App;


