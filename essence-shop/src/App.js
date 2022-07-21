
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import NavBar from './components/Header/NavBar/NavBar';
import { Home } from './components/Home/Home';
import Products from './components/Products/Products';
import AddComponent from './components/Test/AddComponent';
import EditComponent from './components/Test/EditComponent';
import ListComponents from './components/Test/ListComponents';
import Realtime from './components/Test/Realtime';



function App() {
  return (
    <div >
      <NavBar />
      <Products />
      <main>
        {/* <ListComponents /> */}
        <AddComponent />
        <EditComponent />
        <Realtime />
      </main>
    </div>
  );
}

export default App;


