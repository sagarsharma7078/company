import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: 100, image: 'https://img.freepik.com/free-photo/blue-jeans-fabric-details_150588-42.jpg?t=st=1728907037~exp=1728910637~hmac=26cc409e9dbca97dc279f5f6933b8adf4e611a1ec9b8bb661e075790aa100c7a&w=360' },
  { id: 2, name: 'Product 2', price: 150, image: 'https://img.freepik.com/free-photo/headphones-audio-listen_1203-7566.jpg?t=st=1728906972~exp=1728910572~hmac=36e1cce214b01e2c3fb1541d23e15142c12625877600fdb0f41d01e9718ff1a2&w=360' },
  { id: 3, name: 'Product 3', price: 200, image: 'https://img.freepik.com/free-psd/shoes-social-media-post-square-banner-design-template_505751-6413.jpg?uid=R148602287&ga=GA1.1.577908204.1703529813&semt=ais_hybrid-rr-similar' },
  { id: 4, name: 'Product 4', price: 250, image: 'https://img.freepik.com/free-photo/men39s-clothes-hanger-generative-ai_169016-29035.jpg?w=740&t=st=1728906846~exp=1728907446~hmac=fdd5c58d08dec18b392616fdb50e93f8c7e831201fe2706f72ff990b1b07fec5' },
  { id: 5, name: 'Product 5', price: 300, image: 'https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg' },
];150

const ProductPage = ({ addToCart, removeFromCart }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="container mt-7 mb-7 text-center">
        <Link 
          to="/cart" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center"
        >
          Go to Cart
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-lg">
            {/* Product Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded" 
            />
            
            {/* Product Name and Price */}
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="mt-2">Price: ₹{product.price}</p>
            
            {/* Add to Cart and Remove Buttons */}
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

      {/* Go to Cart Button */}
     
    </div>
  );
};

export default ProductPage;
