import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { json, useParams } from "react-router-dom";
import axios from '../../../axios';
import './Chatbar.css';
import { NavLink } from 'react-router-dom';

export default function ChatLayout() {

  const { chatId } = useParams();
  const socket = io.connect("http://localhost:5000")

  const [messageLeft, SetMessagesLeft] = useState([]);
  const [messageRight, SetMessagesRight] = useState([]);
  const [lastMessage, SetLastMessage] = useState("");
  const [userOne, SetUserOne] = useState();
  const [userTwo, SetUserTwo] = useState();

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      alert(data)
    })
  }, [socket])

  const handleInputValue = (e) => {
    e.preventDefault();
    SetLastMessage(e.target.value)
  }
  //Need to save user1 and user2 in database pivot table

  useEffect(() => {
    getUserByChatId();
    // getUserById();
    // console.log('userOne: '+ userOne, 'userTwo: ' + userTwo);
  }, [])

  const getUserByChatId = async () => {
    const response = await axios.get("users/getByChatId", {
      params: {
        chatId: chatId,
      }
    },
      {
        headers: { "Content-Type": 'application/json' },
        withCredentials: true,
      });
    const userData = response.data;

    console.log(userData);
  }

  // const getUserById = async() => {
  //   const userData = await axios.get("users/getById");

  //   const responseData = userData.data;
  //   const userName = responseData.user.name;
  //   console.log("userName: " + userName);

  //   const user = responseData;
  //   console.log('user ' + JSON.stringify(user))
  //   if (!userOne){
  //     SetUserOne(userName)
  //     console.log(" user is set to user 1")
  //   }
  //   else if (!userTwo && userOne === user.name){
  //     SetUserTwo(userName)
  //     console.log(userTwo + " user is set to user 2")
  //   }else {
  //     console.log("both users are in capacity");
  //   }
  // }

  const sendMessage = (data) => {
    socket.emit("send_message", lastMessage)

    const messageData = {
      chatId: chatId,
      //userId gets send via cookie
      message: lastMessage
    }

  }

  return (
    <div className="full-container">
      <head>
        <title>Chat</title>
      </head>
      <body>
        <h1 className="title">Chat {chatId}</h1>
        <div>
          <NavLink className='button-back' to="/chats">&lt;</NavLink>
        </div>
        <section className="left-section">
          <h1 className="joined-users">
            joined: {userOne}, {userTwo}
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
            <input type="text" id="message-input" className="message-input" placeholder="type here..." value={lastMessage} onChange={handleInputValue} />
            <div className="v-divider"></div>
            <button type="submit" className="send-button" onClick={sendMessage}>send <span>➡️</span></button>
          </form>

        </div>

      </body>
    </div>
  )
}