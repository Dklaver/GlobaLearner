import React, { useEffect, useState } from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink } from "react-router-dom";


export default function Chat() {

  const [allowed, SetAllowed] = useState(false);
  const [chats, setChat] = useState([]);
  const [UserChats, setUserChats] = useState([]);
  const [switchActive, SetSwitchActive] = useState(false);

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    console.log('Switch Active?: ' + switchActive);
  }, [switchActive])

  useEffect(() => {
    console.log("IS ALLOWED?: " + allowed);
  }, [allowed])

  const validateUser = async () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      SetAllowed(true)
    };

    try {
      const response = await axios.get('chat');

      const responseData = response.data;
      console.log("responsedata: " + JSON.stringify(responseData));
      const { succes, allChats } = responseData;

      SetAllowed(succes);
      setChat(allChats || []);

      const allUserChats = await axios.get('chat/getUsersChat');

      const res = allUserChats.data;
      console.log("res data: " + JSON.stringify(res))
      setUserChats(res || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors as needed
    }
  }

  const handleCheckboxChange = () => {
    SetSwitchActive(!switchActive);
  };


  return (
    <>
      {!allowed ? (
        <section>
          <p>Please log in first</p>
          <NavLink to='/register'>Don't have an account yet?</NavLink>
        </section>
      ) : (
        <>
        {!switchActive ? (
          <section className='centered-container'>
          <h2 className='centered-header'>Chats</h2>
          
          {chats
            .sort((a, b) => b.id - a.id) // Sort in descending order based on chat.id
            .map((chat) => (
              <section className="chat-section" key={chat.id}>
                <div className="chat-name">{chat.name}</div>
                <div className='chat-language'>Language: {chat.language}</div>
                <NavLink to={`/chat/${chat.id}`} className='button-ViewChat'>Join</NavLink>
              </section>
            ))}
        </section>
        ) : (
          <section className='centered-container'>
            <h2 className='centered-header'>your chats</h2>
            {UserChats
              .sort((a, b) => b.id - a.id) // Sort in descending order based on chat.id
              .map((chat) => (
                <section className="chat-section" key={chat.id}>
                  <div className="chat-name">{chat.name}</div>
                  <div className='chat-language'>Language: {chat.language}</div>
                  <NavLink to={`/chat/${chat.id}`} className='button-ViewChat'>Join</NavLink>
                </section>
              ))}
          </section>
        )}
          <div>
            <NavLink data-testid="cypress-createChatButton" className='button-Create' to="/chats/create">Create chat</NavLink>
          </div>
          <div className='checkbox'>
            <p>show your chats</p>
            <label data-testid="cypress-showUsersChats" className="switch">
              <input  type="checkbox" checked={switchActive} onChange={handleCheckboxChange} />
              <span class="slider round"></span>
            </label>
          </div>
        </>
      )}

    </>
  );
};

