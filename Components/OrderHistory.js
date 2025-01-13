import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch order history when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching order history', err);
        setMessage('Failed to load order history.');
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {message && <p>{message}</p>}
      {orders.length > 0 ? (
        <ul className="order-history-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h3>Order ID: {order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.total_price}</p>
              <ul className="order-items">
                {order.order_items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.menu_item.name}</strong>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.menu_item.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
