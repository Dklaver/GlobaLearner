
import React, { useEffect, useState  } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Shared/Navbar';
import Chatbar from './Pages/ChatPage/Components/Chatbar';

function App(){

{
  return (
    <Router>
      
      <Navbar/>
      
        <Routes>
          <Route path="/"/>
          <Route path="/users"/>
          <Route path="/chats" element={<Chatbar />}/>
        </Routes>
      
      
    </Router>
      
  )
}
};


  



export default App