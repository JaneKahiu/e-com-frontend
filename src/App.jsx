import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail"; 
import CategoryProducts from "./components/CategoryProducts";  
import { CartProvider } from "./context/CartContext.jsx";


function App() {
    return (
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryProducts />} />
          </Routes>
        </Router>
      </CartProvider>
    );
  }

export default App;
