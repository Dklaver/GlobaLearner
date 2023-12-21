import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { useParams } from "react-router-dom";
import axios from '../../../axios';
import './Chatbar.css';
import { NavLink } from 'react-router-dom';

export default function ChatLayout() {

    const { id } = useParams();
    const socket = io.connect("http://localhost:5000")

    const [messageLeft, SetMessagesLeft] = useState([]);
    const [messageRight, SetMessagesRight] = useState([]);
    const [lastMessage, SetLastMessage] = useState("");
    
    useEffect(() => {
       socket.on("recieve_message", (data) => {
        alert(data)
       })
      }, [socket])

      // const getAllChatData = async() => {

      //   const chatData = await axios.get('chat/chatid', id)

      //   const responseData = chatData.data
      // }

      const handleInputValue = (e) => {
        e.preventDefault();
        SetLastMessage(e.target.value)
      }

      const sendMessage = (data) =>{
        socket.emit("send_message", lastMessage)
        
      }

  return (
    <div className="full-container">
      <head>
        <title>Chat</title>
      </head>
      <body>
        <h1 className="title">Chat {id}</h1>
        <div>
                <NavLink className='button-back' to="/chats">&lt;</NavLink>
            </div>
        <section className="left-section">
          <h1 className="joined-users">
            joined: Daniel, Juda
          </h1>
          <h3 className="clients-total" id="clients-total">total joined: 2</h3>
        </section>
        <div className="main">
          <div className="name">
            <span><i className="far fa-user"></i></span>
          </div>

          <ul className="message-container" id="message-container">
            <li className="message-left">
              <p className="message">Let him..</p>
              <span className="message-left-span">daniel • 12/20/2023 11:48</span>
            </li>

            <li className="message-right">
              <p className="message">COOK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
              <span className="message-right-span">Juda • 12/20/2023 11:49</span>
            </li>

            <li className="message-feedback">
              <p className="feedback" id='feedback'> daniel is typing a message...</p>
            </li>
          </ul>

          <form className="message-form" id="message-form">
            <input type="text" name="message" id="message-input" className="message-input" placeholder="type here..." value={lastMessage} onChange={handleInputValue}/>
              <div className="v-divider"></div>
              <button type="submit" className="send-button" onClick={sendMessage}>send <span>➡️</span></button>
          </form>
          
        </div>
        
      </body>
    </div>
  )
}