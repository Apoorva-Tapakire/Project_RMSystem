import React, { useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [menuItemId, setMenuItemId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/orders",
        {
          order_items_attributes: [{ menu_item_id: menuItemId, quantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleOrder}>
        <label>
          Menu Item ID:
          <input
            type="number"
            value={menuItemId}
            onChange={(e) => setMenuItemId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
