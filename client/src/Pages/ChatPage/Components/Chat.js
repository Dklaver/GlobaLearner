import React, { useEffect, useState} from 'react'
import '../style.css';
import axios from '../../../axios';
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatLayout from './ChatLayout';

export default function Chat() {

    const [allowed, SetAllowed] = useState(false);
    const [chats, setChat] = useState([]);
    
  

  useEffect(() => {
        validateUser();
    }, []);

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
            
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
          }
        }
      
     
      return ( 
        <>
          {!allowed ? (
            <section>
              <p>Please log in first</p>
              <NavLink to='/register'>Don't have an account yet?</NavLink>
            </section>
          ) : (
            
            <section className='centered-container'>
              <h2 className='centered-header'>Chats</h2>
              {chats.map((chat) => (
                <section className="chat-section" key={chat.id}>
                   <div className="chat-name">{chat.name}</div>
                   <div className='chat-language'>Language: {chat.language}</div>
                   <NavLink to={`/chat/${chat.id}`} className='button-ViewChat'>Join</NavLink>
                  {}
                </section>
              ))}
            </section>
          )}
          <div>
            <NavLink className='button-Create' to="/chats/create">Create chat</NavLink>
          </div>
        </>
      );
    };

