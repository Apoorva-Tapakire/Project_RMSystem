import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Menu.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch menu items when component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/menu_items', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMenuItems(response.data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items. Please try again.');
      }
    };
    fetchMenuItems();
  }, []);

  // Place order
  const handlePlaceOrder = async (menuItemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authenticated. Please log in.');
        return;
      }

      const orderData = {
        order_items_attributes: [
          {
            menu_item_id: menuItemId,
            quantity: quantity[menuItemId] || 1, // Default to 1 if no quantity is specified
          },
        ],
      };

      const response = await axios.post('http://localhost:3000/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Order placed successfully!');
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
      setMessage(''); // Clear success message
    }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Menu</h2>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>} {/* Display error messages */}
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id} className="menu-item">
            <div className="menu-item-name">{item.name}</div>
            <div className="menu-item-price">${item.price}</div>
            <p className="menu-item-description">{item.description}</p>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={quantity[item.id] || ''}
              onChange={(e) =>
                setQuantity({ ...quantity, [item.id]: e.target.value })
              }
            />
            <button onClick={() => handlePlaceOrder(item.id)}>Place Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;


