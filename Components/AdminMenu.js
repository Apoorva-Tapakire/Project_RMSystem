import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/AdminMenu.css'; // Import the CSS file

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [editId, setEditId] = useState(null); // ID of the item being edited
  const [error, setError] = useState("");

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token
      const response = await axios.get("http://localhost:3000/menu_items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch menu items.");
    }
  };

  // Handle form submission for Add/Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editId) {
        // Update menu item
        await axios.put(
          `http://localhost:3000/menu_items/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null); // Reset edit mode
      } else {
        // Create menu item
        await axios.post("http://localhost:3000/menu_items", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", price: "", description: "" });
      fetchMenuItems(); // Refresh menu items
    } catch (err) {
      console.error(err);
      setError("Failed to save menu item.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/menu_items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenuItems(); // Refresh menu items
    } catch (err) {
      console.error(err);
      setError("Failed to delete menu item.");
    }
  };

  // Handle Edit
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  return (
    <div>
      <h2>Admin Menu Management</h2>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Menu Item</button>
      </form>

      {/* Menu Items List */}
      <h3>Menu Items</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong> - ${item.price}
              <p>{item.description}</p>
            </div>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminMenu;
