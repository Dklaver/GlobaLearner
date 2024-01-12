import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Shared/Navbar';
import Chat from './Pages/ChatPage/Components/Chat';
import Register from './Pages/LoginPage/Components/registerBox';
import Login from './Pages/LoginPage/Components/loginBox';
import CreateChat from './Pages/ChatPage/Components/CreateChat';
import ChatLayout from './Pages/ChatPage/Components/ChatLayout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/chat/:chatId" element={<ChatLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats/create" element={<CreateChat />} />
      </Routes>
    </Router>
  );
}

export default App;