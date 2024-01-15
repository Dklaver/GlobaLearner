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
        <section className="container mt-5">
          <p>Please log in first</p>
          <NavLink to='/register' className="link-register">Don't have an account yet?</NavLink>
        </section>
      ) : (
        <>
          <div className='checkbox'>
            <p>show your chats</p>
            <label data-testid="cypress-showUsersChats" className="switch">
              <input  type="checkbox" checked={switchActive} onChange={handleCheckboxChange} />
              <span class="slider round"></span>
            </label>
          </div>
          
          {!switchActive ? (
            <section className='container mt-5'>
              
              <NavLink data-testid="cypress-createChatButton" className="btn btn-success button-Create mr-3" to="/chats/create">
              Create chat
            </NavLink>
              
              <h2 className='chats-header mb-4'>Chats</h2>
              
              {chats
                .sort((a, b) => b.id - a.id)
                .map((chat) => (
                  <div className="chat-section card mb-3" key={chat.id}>
                    <div className="card-body">
                      <h5 className="chat-name card-title">{chat.name}</h5>
                      <p className="chat-language card-text">Language: {chat.language}</p>
                      <NavLink to={`/chat/${chat.id}`} className="btn btn-primary btn-join">Join</NavLink>
                    </div>
                  </div>
                ))}
            </section>
          ) : (
            <section className='container mt-5'>
               <NavLink data-testid="cypress-createChatButton" className="btn btn-success button-Create mr-3" to="/chats/create">
              Create chat
            </NavLink>
              <h2 className='chats-header mb-4'>Your Chats</h2>
              {UserChats
                .sort((a, b) => b.id - a.id)
                .map((chat) => (
                  <div className="chat-section card mb-3" key={chat.id}>
                    <div className="card-body">
                      <h5 className="chat-name card-title">{chat.name}</h5>
                      <p className="chat-language card-text">Language: {chat.language}</p>
                      <NavLink to={`/chat/${chat.id}`} className="btn btn-primary btn-join">Join</NavLink>
                    </div>
                  </div>
                ))}
            </section>
          )}
        </>
      )}
    </>
  );
};

