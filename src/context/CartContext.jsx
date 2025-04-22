import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return false; // not authenticated
    }

    setCartItems((prevItems) => [...prevItems, product]);
    return true; // success
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
