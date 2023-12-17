import React from 'react';
import './Chatbar.css'; 

const Chatbar = ({ chats }) => {
  return (
    <div className="chat-bar">
      <h2 className="chat-bar-header">Chat Bar</h2>
      <ul className="chat-list">
        {chats.map((chat) => (
          <li key={chat.id} className="chat-item">
            <div className="chat-name">{chat.name}</div>
            <div className="last-message">{chat.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chatbar;