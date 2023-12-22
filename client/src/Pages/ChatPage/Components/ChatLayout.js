import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { useParams } from "react-router-dom";
import axios from '../../../axios';
import './Chatbar.css';
import { NavLink } from 'react-router-dom';

export default function ChatLayout() {

  const  { chatId }  = useParams();
  const socket = io.connect("http://localhost:5000")

  const [messagesLeft, setMessagesLeft] = useState([]);
  const [messagesRight, setMessagesRight] = useState([]);
  const [lastMessage, SetLastMessage] = useState("");
  const [userOne, SetUserOne] = useState();
  const [userTwo, SetUserTwo] = useState();
  const [totalJoined, SetTotalJoined] = useState(0);
  const [socketio, SetSocketio] = useState();

  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000");

    newSocket.on("recieve_message", (data) => {
        handleReceivedMessage(data, newSocket);
    });

    newSocket.emit("join_chat", { chatId: chatId });

    SetSocketio(newSocket);

    return () => {
        newSocket.disconnect();
    };
}, [chatId, messagesRight]);

const handleReceivedMessage = (data, socket) => {
  const { message, senderId } = data;
  console.log("senderId: "+ senderId)
  console.log("socketId: "+ socket.id)
  // Check if the message is sent by the current user
  const isCurrentUser = senderId === socket.id;

  // Use the prevState parameter to ensure the correct order of execution
  setMessagesLeft((prevState) => {
      return isCurrentUser ? [...prevState, message] : prevState;
  });

  setMessagesRight((prevState) => {
      return isCurrentUser ? prevState : [...prevState, message];
  });
};


  const handleInputValue = (e) => {
    e.preventDefault();
    SetLastMessage(e.target.value)
  }
  //Need to save user1 and user2 in database pivot table

  useEffect(() => {
    
    console.log('CHATID: ' + chatId)
    insertJoinedUserInChat();
    getUserByChatId();
    // getUserById();
  }, [])

  useEffect(() => {
    let totalUsersJoined = 0;
    if (userOne){
      totalUsersJoined++;
    }
    if (userTwo){
      totalUsersJoined++;
    }

    SetTotalJoined(totalUsersJoined)
  },[userOne, userTwo])

  const insertJoinedUserInChat = async() =>{

    const response = await axios.post("chat/insertUser", JSON.stringify({chatId: chatId}), {
      headers: {"Content-Type": 'application/json'},
      withCredentials: true,
    })
    console.log("insertJoinedUserInChatRESPONSE: " + JSON.stringify(response))
  } 

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
    
    console.log("Userdata: " + JSON.stringify(userData));
    if (userData.users.length)
    SetUserOne(userData.users[0].name);
    if (userData.users.length > 1){
      SetUserTwo(userData.users[1].name);
    }
  
  }

  const leaveChat = () => {
    socket.emit("leave_chat", { chatId: chatId });
};

  const sendMessage = (e) => {
    e.preventDefault();

    if (lastMessage.trim() === "") {
      // Don't send empty messages
      return;
    }

    const messageData = {
      chatId: chatId,
      //userId gets send via cookie
      message: lastMessage
    }
    socket.emit("send_message", messageData);
    
    SetLastMessage("");

  }


  return (
    <div className="full-container">
      <head>
        <title>Chat</title>
      </head>
      <body>
        <h1 className="title">Chat {chatId}</h1>
        <div>
          <NavLink onClick={leaveChat} className='button-back' to="/chats" >&lt;</NavLink>
        </div>
        <section className="left-section">
          <h1 className="joined-users">
            joined: {userOne}, {userTwo}
          </h1>
          <h3 className="clients-total" id="clients-total">total joined: {totalJoined}</h3>
        </section>
        <div className="main">
          <div className="name">
            <span><i className="far fa-user"></i></span>
          </div>

          <ul className="message-container" id="message-container">
          {messagesLeft.map((message, index) => (
          <li key={index} className="message-left">
            <p className="message">{message}</p>
            {/* Add your user and timestamp details here */}
          </li>
        ))}
        {messagesRight.map((message, index) => (
          <li key={index} className="message-right">
            <p className="message">{message}</p>
            {/* Add your user and timestamp details here */}
          </li>
        ))}

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