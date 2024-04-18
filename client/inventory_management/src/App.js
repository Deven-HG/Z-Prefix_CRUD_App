import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { loggedInContext } from "./components/Logged-In-Context";
import Home from './components/Home';
import MyInventory from './components/MyInventory';
import Login from './components/Login';
import NewAccount from './components/NewAccount'


export default function App() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUserId } = useContext(loggedInContext);

  const LogOut = () => {
  setLoggedIn(false);
  };

  return (
    <>
      <header className="App-header">
        <h1 className='text-center'>Inventory Management</h1>
        <nav>
          <div className = 'navbar'>
            <ul style={{ listStyleType: "none" }} className="list-group list-group-horizontal">
              <li style={{display: 'flex', marginRight: '10px'}} className="list-group-item"><Link to="/">Home</Link></li>
              {!loggedIn ? (
                <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/login">Log In</Link></li>
              ) : ([]) }
              {loggedIn ? (
                <>
                  <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item" onClick={() => LogOut()}><Link to="/">Log Out</Link></li>
                  <li style={{ display: 'flex', marginRight: '10px' }} className="list-group-item"><Link to="/MyInventory">My Inventory</Link></li>
                </>
              ) : ([]) }
            </ul>
          </div>
          <br/>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/MyInventory" element={<MyInventory/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/new-account" element={<NewAccount/>} />
      </Routes>
    </>
  );
}