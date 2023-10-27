
import React, { useEffect, useState  } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Shared/Navbar';
import Chatbar from './Pages/ChatPage/Components/Chatbar';
import Register from './Pages/LoginPage/Components/registerBox';
function App(){

{
  return (
    <Router>
      
      <Navbar/>
      
        <Routes>
          <Route path="/"/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/chats" element={<Chatbar />}/>
          <Route path="/login"/>
        </Routes>
      
      
    </Router>
      
  )
}
};


  



export default App