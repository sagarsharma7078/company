import React from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const CartPage = ({ cartItems = [] }) => {
  // Check if cartItems is an array
  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return <div>Error: cartItems is not an array.</div>;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
  const gst = totalPrice * 0.15; // 15% GST
  const grandTotal = totalPrice + gst;

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Cart Items Bill", 20, 20);
    
    let y = 30; // Start printing items below the title
    cartItems.forEach(item => {
      doc.text(`${item.name} - Quantity: ${item.quantity} - Price: ₹${(item.price * item.quantity).toFixed(2)}`, 20, y);
      y += 10; // Move down for the next item
    });
    
    doc.text(`Total Price: ₹${totalPrice.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`GST (15%): ₹${gst.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 20, y);
    
    doc.save("cart_bill.pdf"); // Download the PDF
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Product</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.quantity}</td>
                  <td className="py-2 px-4 border">₹{item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border">₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
            <p>GST (15%): ₹{gst.toFixed(2)}</p>
            <p className="font-bold">Grand Total: ₹{grandTotal.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={generatePDF}
              className="bg-green-500 text-white px-4 py-2 rounded mr-4"
            >
              Download Bill as PDF
            </button>
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
