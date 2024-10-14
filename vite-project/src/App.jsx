import { useState } from 'react';
import './App.css';
import RegistrationForm from './Component/RegistrationForm';
import LoginPage from './Component/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Component/HomePage';
import ProductPage from './Component/ProductPage';
import CartPage from './Component/CartPage';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding items to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to handle removing items from the cart
  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/ProductPage" element={<ProductPage addToCart={addToCart} removeFromCart={removeFromCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
