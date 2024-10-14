import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 150 },
  { id: 3, name: 'Product 3', price: 200 },
  { id: 4, name: 'Product 4', price: 250 },
  { id: 5, name: 'Product 5', price: 300 },
];

const ProductPage = ({ addToCart, removeFromCart }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="mt-2">Price: ₹{product.price}</p>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => removeFromCart(product)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-7">
      <Link to="/cart" className="text-center">Go to Cart</Link>

      </div>
    </div>
  );
};

export default ProductPage;
