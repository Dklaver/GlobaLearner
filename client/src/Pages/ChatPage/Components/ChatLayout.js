import { useEffect, useState, useRef } from "react"
import io from 'socket.io-client'
import { useParams } from "react-router-dom";
import axios from '../../../axios';
import './Chatbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function ChatLayout() {

  const  { chatId }  = useParams();
  const navigate = useNavigate();
  const messageContainerRef = useRef();

  const [messagesLeft, setMessagesLeft] = useState([]);
  const [messagesRight, setMessagesRight] = useState([]);
  const [lastMessage, SetLastMessage] = useState("");
  const [userOne, SetUserOne] = useState();
  const [userTwo, SetUserTwo] = useState();
  const [totalJoined, SetTotalJoined] = useState(0);
  const [socket, SetSocketio] = useState();
  const [lobbyFull, SetLobbyFull] = useState(false);
  
 useEffect(()=>{
if(lobbyFull){
  navigate("./error")
}
 },[lobbyFull])

  useEffect(() => {
    //this useEffect is for getting all previous messages
    const getAllMessagesFromChat = async () => {
      
      try {
        
        const allMessages = await axios.get("message/getFromChat", {
          params: {
            chatId: chatId,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const responseData = allMessages.data.response;
  
        const parsedResponse = JSON.parse(responseData);
  
        
  
        const jwt = localStorage.getItem('jwt');
        const decodedToken = jwt ? jwtDecode(jwt) : null;
        console.log("User ID == " + JSON.stringify(decodedToken.id))
        if (!decodedToken || !decodedToken.id) {
          
          console.error("User ID not found in the JWT");
          return;
        }
  
        const userMessages = parsedResponse.map(message => {
          const { timestamp, userId } = message;
  
          
          const isCurrentUser = userId === decodedToken.id;
  
          return {
            text: message.message,
            timestamp: timestamp,
            isCurrentUser: isCurrentUser
          };
        });
  
        const sortedMessages = userMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
        const messagesLeft = sortedMessages.filter(message => message.isCurrentUser);
       
        const messagesRight = sortedMessages.filter(message => !message.isCurrentUser);
        
  
        setMessagesLeft(messagesLeft);
        setMessagesRight(messagesRight);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMessagesFromChat()
    
  },[chatId])
  

  useEffect(() => {
    if (messageContainerRef.current){
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
    
  }, [messagesLeft, messagesRight]);

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
  const { message, senderId, timestamp } = data;

  // Check if the message is sent by the current user
  const isCurrentUser = senderId === socket.id;

  const messageWithTimeStamp = { text: message, timestamp: timestamp, isCurrentUser}
  // Use the prevState parameter to ensure the correct order of execution
  setMessagesLeft((prevState) => {
      return isCurrentUser ? [...prevState, messageWithTimeStamp] : prevState;
  });

  setMessagesRight((prevState) => {
      return isCurrentUser ? prevState : [...prevState, messageWithTimeStamp];
  });
};


  const handleInputValue = (e) => {
    e.preventDefault();
    SetLastMessage(e.target.value)
  }
  //Need to save user1 and user2 in database pivot table

  useEffect(() => {
    
  
    const insertJoinedUserInChat = async() =>{

      const response = await axios.post("chat/insertUser", JSON.stringify({chatId: chatId}), {
        headers: {"Content-Type": 'application/json'},
        withCredentials: true,
      })
     

      const responseData = response.data;

    if(responseData.errMsg){
      console.log("insert user error: "+ JSON.stringify(responseData.errMsg))
    }
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

      if (userData && userData.users && userData.users.lobbyFull) {
        console.log("userData.users.lobbyFull: " + JSON.stringify(userData.users.lobbyFull));
        SetLobbyFull(true);
      }
      
      
      if (userData.users.length)
      SetUserOne(userData.users[0].name);
      if (userData.users.length > 1){
        SetUserTwo(userData.users[1].name);
      }
    
    }
    insertJoinedUserInChat();
    getUserByChatId();  
    // getUserById();
  }, [chatId])

  useEffect(() => {
    let totalUsersJoined = 0;
    if (userOne){
      totalUsersJoined++;
    }
    if (userTwo){
      totalUsersJoined++;
    }
    
    // SetToken(jwt)
    // console.log("token: " + token)
    SetTotalJoined(totalUsersJoined)
  },[userOne, userTwo])

  

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
      timestamp: new Date().toISOString(),
      message: lastMessage
    }
    socket.emit("send_message", messageData);

    console.log("sending message data: " + JSON.stringify(messageData))

    handleMessage(messageData);
    SetLastMessage("");
    
  }

  const handleMessage = async(messageData) => {
    try{
      
      const response = await axios.post('message/insertMessage', JSON.stringify({messageData}),
      {
        headers: {"Content-Type": 'application/json'},
        withCredentials: true,
      });

      console.log("sending message response: " + JSON.stringify(response))
    }catch (err){
      console.log(err)
    }
    
  }


  return (
    <div className="container-fluid">

      <div>
        <NavLink data-testid="cypress-messageToChat" onClick={leaveChat} className='button-back' to="/chats">&lt;</NavLink>
      </div>
      <body>

        <div className="row">
          {/* Left Half */}
          <div className="col-md-12 col-lg-6 p-3 left-div">
            <head>
              <title>Chat</title>
            </head>
            <h1 className="title">Chat {chatId}</h1>

            <h1 className="joined-users">
              joined: {userOne}, {userTwo}
            </h1>
            <h3 className="clients-total" id="clients-total">total joined: {totalJoined}</h3>
          </div>

          {/* Right Half */}
          <div className="col-md-12 col-lg-6 p-3 right-div">
            <div className="name">
              <span><i className="far fa-user"></i></span>
            </div>

            <ul className="message-container" id="message-container" ref={messageContainerRef}>
              {messagesLeft.concat(messagesRight).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((message, index) => (
                <li key={index} className={message.isCurrentUser ? "message-left" : "message-right"}>
                  <p className="message">{message.text}</p>
                  {/* Add your user and timestamp details here */}
                </li>
              ))}
            </ul>

            <form className="message-form" id="message-form">
              <div className="col-md-12 col-lg-6 p-3 textbox-right">
                <input data-testid="cypress-messageInput" type="text" id="message-input" className="message-input" placeholder="type here..." value={lastMessage} onChange={handleInputValue} autoComplete="off" />
                <div className="v-divider"></div>
                <button type="submit" className="send-button" onClick={sendMessage}>send <span>→</span></button>
              </div>
            </form>
          </div>
        </div>

      </body>
    </div>
  );
}