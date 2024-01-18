import './App.css';
import Homepage from './Pages/HomePage/homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Shared/Navbar';
import Chat from './Pages/ChatPage/Components/Chat';
import Register from './Pages/LoginPage/Components/registerBox';
import Login from './Pages/LoginPage/Components/loginBox';
import CreateChat from './Pages/ChatPage/Components/CreateChat';
import ChatLayout from './Pages/ChatPage/Components/ChatLayout';
import ChatError from './Pages/ChatPage/Components/ChatError';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/chat/:chatId" element={<ChatLayout />} />
        <Route path="/chat/:chatId/error" element={<ChatError />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats/create" element={<CreateChat />} />
      </Routes>
    </Router>
  );
}

export default App;