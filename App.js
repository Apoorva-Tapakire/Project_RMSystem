import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import AdminMenu from './Components/AdminMenu';

import OrderHistory from './Components/OrderHistory';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/adminmenu" element={<AdminMenu />} />

       
        <Route path="/order-history" element={<OrderHistory />} />

        
        
      </Routes>
    </Router>
  );
}




export default App;
