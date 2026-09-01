import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
